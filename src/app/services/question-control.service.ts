import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { parseDate } from '@telerik/kendo-intl';
import { isArray, isControl, isObject } from '../common/functions';
import { IBaseControl } from '../controls/ibase-control';


@Injectable()
export class QuestionControlService {
  private maxLevel: number;
  constructor() { }

  toPartyFormGroup(party: any, maxLevel: number): FormGroup {
    this.maxLevel = maxLevel;
    let form = new FormGroup({});
    this.traverse(party, form, 0);

    return form;
  }

  // <see cref="https://www.quora.com/How-do-you-loop-through-a-complex-JSON-tree-of-objects-and-arrays-in-JavaScript"/>
  private traverse(x: any, group: IBaseControl[] | AbstractControl, level: number) {
    if (isArray(x))
      this.traverseArray(x, group, level);
    else if (isObject(x))
      this.traverseObject(x, group, level);
  }
  private traverseArray(arr: any[], group: IBaseControl[] | AbstractControl, level: number) {
    arr.forEach(x => this.traverse(x, group, level + 1));
  }
  private traverseObject(obj: object, group: IBaseControl[] | AbstractControl, level: number) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && level < this.maxLevel) {
        const prop = obj[key];
        if (isControl(prop)) {
          this.generateControl(key, prop, group);
        } else if (typeof prop != 'string' && Object.entries(prop).length > 0) {
          const g = this.generateGroup(key, prop, group);
          this.traverse(prop, g, level + 1);
        } else
          this.traverse(prop, group, level + 1);
      }
    }
  }
  private generateGroup(key: string, prop: any, group: IBaseControl[] | AbstractControl) {
    const g = new FormGroup({});
    (group as FormGroup).addControl(key, g);
    return g;
  }
  private generateControl(key: string, prop: any, group: IBaseControl[] | AbstractControl) {
    let c: FormControl;
    switch (prop['type']) {
      case 'text':
        c = new FormControl(prop['value'] || '')
        break;
      case 'dropdown':
        c = new FormControl(prop['value']);
        break;
      case 'date':
        const value = parseDate(prop['value'], 'yyyy-MM-dd');
        c = new FormControl(value);
        break;
      default:
        break;
    }

    if (prop['required'] && prop['required']['value'])
      c.setValidators(Validators.required);

    (group as FormGroup).addControl(key, c);
  }
}


