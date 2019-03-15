import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { parseDate } from '@telerik/kendo-intl';
import { IBaseControl } from '../controls/ibase-control';
import { DynamicFormBaseService } from './dynamic-form-base.service';


@Injectable()
export class DynamicFormControlService extends DynamicFormBaseService {
  maxLevel: number;
  constructor() {
    super();
   }
  toFormGroup(party: any, maxLevel: number): FormGroup {
    this.maxLevel = maxLevel;
    let form = new FormGroup({});
    this.traverse(party, form, 0);

    return form;
  }
  generateGroup(key: string, prop: any, group: IBaseControl[] | AbstractControl) {
    const g = new FormGroup({});
    (group as FormGroup).addControl(key, g);
    return g;
  }
  generateControl(key: string, prop: any, group: IBaseControl[] | AbstractControl) {
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


