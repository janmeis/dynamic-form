import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { DynamicFormControlService } from '../services/dynamic-form-control.service';
import { DynamicFormService } from '../services/dynamic-form.service';
import { ButtonService } from './../services/button.service';
import { timer } from 'rxjs';


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
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit, AfterViewInit {
  party: any;
  form: FormGroup;
  model: any[];
  private readonly maxLevel = 2;

  constructor(
    private buttonService: ButtonService,
    private dynamicFormControlService: DynamicFormControlService,
    private dynamicFormService: DynamicFormService,
  ) { }
  ngOnInit(): void {
    this.party = this.dynamicFormService.getParty();
    this.model = this.dynamicFormService.getModel(this.party.Identification, this.maxLevel);
    this.form = this.dynamicFormControlService.toFormGroup(this.party.Identification, this.maxLevel);
    }
    ngAfterViewInit(): void {
      this.buttonService.createComponent('Save', () => this.onSubmit());
      this.buttonService.createComponent('Reset', () => this.onReset());
      const noButton = this.buttonService.createComponent('noButton', () => { });
      noButton.instance.disabled = true;
      timer(5000).subscribe(() => this.buttonService.deleteComponent(noButton));
  }
  onSubmit() {
    markControlsTouched(this.form);
  }
  onReset() {
    this.form.reset();
  }
}

