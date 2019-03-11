import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { parseDate } from '@telerik/kendo-intl';
import { isArray, isControl, isObject } from '../common/functions';
import { IBaseControl } from '../controls/ibase-control';
import { TextboxControl } from '../controls/textbox-control';
import { DatepickerControl } from './../controls/datepicker-control';
import { DropdownControl } from './../controls/dropdown-control';
import { GroupControl } from './../controls/group-control';

import party from '../../assets/Party.json';


@Injectable()
export class QuestionService {
  private maxLevel = Number.MAX_VALUE;

  getParty(): any {
    return party.Party;
  }

  getPartyModel(party: any, maxLevel?: number): any[] {
    if (maxLevel)
      this.maxLevel = maxLevel;

    const group = []
    this.traverse(party, group, 0)
    return group.sort((a, b) => a.order - b.order);
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
  private generateGroup(key: string, prop: any, group: IBaseControl[] | AbstractControl): IBaseControl[] {
    const g = new GroupControl({
      key: key,
      label: prop['label']
    });
    (group as IBaseControl[]).push(g);

    return g.controls;
  }
  private generateControl(key: string, prop: any, group: IBaseControl[] | AbstractControl): void {
    let c: IBaseControl;
    let options = {
      key: key,
      label: prop['label'],
      value: prop['value'] || ''
    };
    if (prop['required'] && prop['required']['value'])
      options['required'] = {
        value: prop['required']['value'] || false,
        text: prop['required']['text'] || ''
      };

    switch (prop['type']) {
      case 'text':
        c = new TextboxControl({
          ...options,
          type: 'text'
        });
        break;
      case 'dropdown':
        c = new DropdownControl({
          ...options,
          codebook: prop['codebook']
        });
        break;
      case 'date':
        options.value = parseDate(prop['value'], 'yyyy-MM-dd');
        c = new DatepickerControl(options);
        break;
      default:
        break;
    }

    (group as IBaseControl[]).push(c);
  }
}
