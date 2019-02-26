import { Injectable }       from '@angular/core';

import { DropdownQuestion } from '../components/question-dropdown';
import { QuestionBase }     from '../components/question-base';
import { TextboxQuestion }  from '../components/question-textbox';
import { DatepickerQuestion } from '../components/question-datepicker';

import party from '../../assets/Party.json';
import { isControl, isArray, isObject } from '../common/functions';

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
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
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

    return [{}];
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
          // const c = prop['required'] && prop['required']['value']
          //   ? new FormControl(prop['value'] || '', Validators.required)
          //   : new FormControl(prop['value'] || '');
          // (group as FormGroup).addControl(key, c);
        } else if (level < this.maxLevel)
          if (typeof prop != 'string' && Object.entries(prop).length > 0) {
            // const g = new FormGroup({});
            // (group as FormGroup).addControl(key, g);
            const g = [];
            this.traverse(prop, g, level + 1);
          } else
            this.traverse(prop, group, level + 1);
      }
    }
  }

}
