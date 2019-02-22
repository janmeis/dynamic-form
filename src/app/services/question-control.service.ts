import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { QuestionBase } from '../components/question-base';
import { DebugRenderer2 } from '@angular/core/src/view/services';

@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<any>[]) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required && question.required.value
        ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }

  toPartyFormGroup(party: any): FormGroup {
    let group: any = {};
    this.traverse(party, group);

    return new FormGroup({});
  }

  // <see cref="https://www.quora.com/How-do-you-loop-through-a-complex-JSON-tree-of-objects-and-arrays-in-JavaScript"/>
  private traverse(x, group: any) {
    if (this.isArray(x)) {
      this.traverseArray(x, group);
    } else if ((typeof x === 'object') && (x !== null)) {
      this.traverseObject(x, group);
    } else {
      console.log(x);
    }
  }

  private isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
  }

  private traverseArray(arr, group: any) {
    console.log('<array>');
    arr.forEach(x => this.traverse(x, group));
  }

  private traverseObject(obj, group: any) {
    console.log('<object>');
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        const elem = obj[key];
        if (this.isFormControl(elem)) {
          console.log(key + ': ' + elem['label'] + ', ' + elem['value']);
          group[key] = new FormControl(elem['value'] || '');
        } else {
          console.log(key + ':');
          if (Object.entries(elem).length > 0) {
            group[key] = {};
            this.traverse(elem, group[key]);
          } else
            this.traverse(elem, group);
        }
      }
    }
  }

  private isFormControl = (obj: any): boolean =>
    Object.entries(obj).filter(([k, v]) => k == 'value').length > 0;
}


