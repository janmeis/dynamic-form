import { Component, Input, OnInit, ViewChildren, QueryList }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';

import { QuestionBase }              from './question-base';
import { QuestionControlService }    from './question-control.service';
import { DynamicFormQuestionComponent } from './dynamic-form-question.component';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {
  @ViewChildren(DynamicFormQuestionComponent) dynamicFormsQuestions: QueryList<DynamicFormQuestionComponent>;
  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(private qcs: QuestionControlService) {  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.dynamicFormsQuestions.forEach(q => q.validate());
    this.payLoad = JSON.stringify(this.form.value);
  }
  onReset() {
    this.dynamicFormsQuestions.forEach(q => q.reset());
    this.payLoad = '';
  }
}
