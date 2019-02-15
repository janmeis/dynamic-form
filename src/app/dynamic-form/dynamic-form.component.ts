import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { QuestionControlService } from '../services/question-control.service';
import { QuestionBase } from '../components/question-base';

declare var kendo: any;

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
export class DynamicFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';
  
  @ViewChild('datePicker') datePickerEl: ElementRef;  
  selectedDate: Date = new Date();
  
  constructor(
    private qcs: QuestionControlService,
    private hostEl: ElementRef
    ) { }

  ngOnInit(): void {
    this.form = this.qcs.toFormGroup(this.questions);
  }
  ngAfterViewInit(): void {
    kendo.jQuery(this.datePickerEl.nativeElement).kendoDatePicker({
      format: 'd.M.yyyy',
      change: e => {
          this.selectedDate = e.sender.value();
      }
  });
  }
  ngOnDestroy(): void {
    kendo.destroy(this.hostEl.nativeElement);
  }
  onSubmit() {
    markControlsTouched(this.form);
    this.payLoad = JSON.stringify(this.form.value);
  }
}
