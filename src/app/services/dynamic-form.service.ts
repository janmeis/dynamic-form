import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { parseDate } from '@telerik/kendo-intl';
import { IBaseControl } from '../controls/ibase-control';
import { TextboxControl } from '../controls/textbox-control';
import { DatepickerControl } from '../controls/datepicker-control';
import { DropdownControl } from '../controls/dropdown-control';
import { GroupControl } from '../controls/group-control';
import { DynamicFormBaseService } from './dynamic-form-base.service';

import party from '../../assets/Party.json';


@Injectable()
export class DynamicFormService extends DynamicFormBaseService {
  maxLevel = Number.MAX_VALUE;

  constructor() {
    super();
  }
  getParty(): any {
    return party.Party;
  }
  getModel(party: any, maxLevel?: number): any[] {
    if (maxLevel)
      this.maxLevel = maxLevel;

    const group = []
    this.traverse(party, group, 0)
    return group.sort((a, b) => a.order - b.order);
  }
  generateGroup(key: string, prop: any, group: IBaseControl[] | AbstractControl): IBaseControl[] {
    const g = new GroupControl({
      key: key,
      label: prop['label']
    });
    (group as IBaseControl[]).push(g);

    return g.controls;
  }
  generateControl(key: string, prop: any, group: IBaseControl[] | AbstractControl): void {
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
