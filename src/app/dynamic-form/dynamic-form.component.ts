import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { QuestionControlService } from '../services/question-control.service';
import { QuestionBase } from '../components/question-base';

/// <see cref="https://stackoverflow.com/a/50992362"></see>
function markControlsTouched(group: FormGroup | FormArray): void {
  Object.keys(group.controls).forEach((key: string) => {
    const abstractControl = group.controls[key];

    if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray)
      markControlsTouched(abstractControl);
    else
      abstractControl.markAsTouched();
  });
}

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = false;

  constructor(private qcs: QuestionControlService) { }
  ngOnInit(): void {
    this.form = this.qcs.toFormGroup(this.questions);
  }
  onSubmit() {
    markControlsTouched(this.form);
    this.payLoad = true;
    console.log(this.form.value);
  }
  onReset() {
    this.payLoad = false;
  }
}