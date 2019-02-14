import { Injectable }       from '@angular/core';

import { DropdownQuestion } from './question-dropdown';
import { QuestionBase }     from './question-base';
import { TextboxQuestion }  from './question-textbox';
import { DatepickerQuestion } from './question-datepicker';

@Injectable()
export class QuestionService {

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
        value: '',
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
        order: 4
      }),

    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}
