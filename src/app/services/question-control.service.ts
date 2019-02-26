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
  private generateGroup(key: string, prop: any, group: any) {
    const g = new FormGroup({});
    (group as FormGroup).addControl(key, g);
    return g;
  }
  private generateControl(key: string, prop: any, group: any) {
    const c = prop['required'] && prop['required']['value']
      ? new FormControl(prop['value'] || '', Validators.required)
      : new FormControl(prop['value'] || '');
    (group as FormGroup).addControl(key, c);
  }
}


