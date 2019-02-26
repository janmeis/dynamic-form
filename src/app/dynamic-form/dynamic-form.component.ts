import { QuestionService } from './../services/question.service';
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
  styles: [`
    .fieldlist {
      margin: 0;
      padding: .2em 0 .5em 0;
      background-color: #eae8e8;
  }
  .fieldlist li {
      list-style: none;
      padding: 0 1em 1em 1em;
  }
  .fieldlist label {
      display: block;
      font-weight: bold;
      font-size: .8em;
      padding-bottom: .3em;
      color: #444;
  }    
  .k-textbox {
    width: 100%;
  }
  .k-block {
    margin-bottom: 2em;
  }
  `],
  providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<any>[] = [];
  @Input() party: any;
  list: any;
  form: FormGroup;
  partyForm: FormGroup;
  partyModel: any[];
  payLoad = false;
  private readonly maxLevel = 1;

  constructor(
    private qcs: QuestionControlService,
    private qs: QuestionService
    ) { }
  ngOnInit(): void {
    this.form = this.qcs.toFormGroup(this.questions);
    this.partyForm = this.qcs.toPartyFormGroup(this.party.Identification, this.maxLevel);
    this.partyModel = this.qs.getPartyModel(this.party.Identification, this.maxLevel);
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
