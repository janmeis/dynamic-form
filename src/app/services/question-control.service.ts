import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { QuestionBase } from '../components/question-base';
import { isControl, isArray, isObject } from '../common/functions';


@Injectable()
export class QuestionControlService {
  private maxLevel: number;
  constructor() { }

  toFormGroup(questions: QuestionBase<any>[]) {
    let group = {};

    questions.forEach(question => {
      group[question.key] = question.required && question.required.value
        ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }

  toPartyFormGroup(party: any, maxLevel: number): FormGroup {
    this.maxLevel = maxLevel;
    let form = new FormGroup({});
    this.traverse(party, form, 0);

    return form;
  }

  // <see cref="https://www.quora.com/How-do-you-loop-through-a-complex-JSON-tree-of-objects-and-arrays-in-JavaScript"/>
  private traverse(x: any, control: AbstractControl, level: number) {
    if (isArray(x))
      this.traverseArray(x, control, level);
    else if (isObject(x))
      this.traverseObject(x, control, level);
  }
  private traverseArray(arr: any[], control: AbstractControl, level: number) {
    arr.forEach(x => this.traverse(x, control, level + 1));
  }
  private traverseObject(obj: object, control: AbstractControl, level: number) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        const prop = obj[key];
        if (isControl(prop)) {
          const c = prop['required'] && prop['required']['value']
            ? new FormControl(prop['value'] || '', Validators.required)
            : new FormControl(prop['value'] || '');
          (control as FormGroup).addControl(key, c);
        } else if (level < this.maxLevel)
          if (typeof prop != 'string' && Object.entries(prop).length > 0) {
            const g = new FormGroup({});
            (control as FormGroup).addControl(key, g);
            this.traverse(prop, g, level + 1);
          } else
            this.traverse(prop, control, level + 1);
      }
    }
  }
}


