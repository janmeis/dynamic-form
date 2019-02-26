import { Injectable } from '@angular/core';

import { isArray, isControl, isObject } from '../common/functions';
import { QuestionBase } from '../components/question-base';
import { DatepickerQuestion } from '../components/question-datepicker';
import { DropdownQuestion } from '../components/question-dropdown';
import { TextboxQuestion } from '../components/question-textbox';
import { BaseControl } from '../controls/base-control';
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

  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  getQuestions() {

    let questions: QuestionBase<any>[] = [

      new DropdownQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' }
        ],
        order: 3
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Jan',
        required: {
          value: true,
          text: '!!! You must enter you first name !!!'
        },
        order: 1
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        value: 'jan.novak@email.cz',
        required: {
          value: true,
          text: '*** Also enter your email address! ***'
        },
        order: 2
      }),

      new DatepickerQuestion({
        key: 'birthdate',
        label: 'Birth date',
        type: 'date',
        value: '1.12.2018',
        order: 4
      }),

    ];

    return questions.sort((a, b) => a.order - b.order);
  }

  getPartyModel(party: any, maxLevel?: number): any[] {
    if (maxLevel)
      this.maxLevel = maxLevel;

    const group = []
    this.traverse(party, group, 0)
    return group.sort((a, b) => a.order - b.order);
  }

  // <see cref="https://www.quora.com/How-do-you-loop-through-a-complex-JSON-tree-of-objects-and-arrays-in-JavaScript"/>
  private traverse(x: any, group: any, level: number) {
    if (isArray(x))
      this.traverseArray(x, group, level);
    else if (isObject(x))
      this.traverseObject(x, group, level);
  }
  private traverseArray(arr: any[], group: any, level: number) {
    arr.forEach(x => this.traverse(x, group, level + 1));
  }
  private traverseObject(obj: object, group: any, level: number) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        const prop = obj[key];
        if (isControl(prop)) {
          this.generateControl(key, prop, group);
        } else if (level < this.maxLevel)
          if (typeof prop != 'string' && Object.entries(prop).length > 0) {
            const g = this.generateGroup(key, prop, group);
            this.traverse(prop, g, level + 1);
          } else
            this.traverse(prop, group, level + 1);
      }
    }
  }
  private generateGroup(key: string, prop: any, group: any): BaseControl[] {
    const label = prop['label'];
    const g = new GroupControl({ label: label });
    group.push(g);
    
    return g.controls;
  }
  private generateControl(key: string, prop: any, group: any): void {
    let c: BaseControl;
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
        c = new DatepickerControl(options);
        break;
      default:
        break;
    }

    group.push(c);
  }
}
