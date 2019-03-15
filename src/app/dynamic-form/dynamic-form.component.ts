import { Component, Host, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { AppComponent } from '../app.component';
import { DynamicFormControlService } from '../services/dynamic-form-control.service';
import { DynamicFormService } from '../services/dynamic-form.service';


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
export class DynamicFormComponent implements OnInit {
  party: any;
  form: FormGroup;
  model: any[];
  private readonly maxLevel = 2;

  constructor(
    @Host() private parent: AppComponent,
    private dynamicFormControlService: DynamicFormControlService,
    private dynamicFormService: DynamicFormService,
  ) { }
  ngOnInit(): void {
    this.party = this.dynamicFormService.getParty();
    this.model = this.dynamicFormService.getModel(this.party.Identification, this.maxLevel);
    this.form = this.dynamicFormControlService.toFormGroup(this.party.Identification, this.maxLevel);

    const container = this.parent.dynamicButtonContainer;
    // setTimeout(() => {
    //   container.createComponent('Save', () => this.onSubmit());
    //   setTimeout(() => {
    //     container.createComponent('Reset', () => {
    //       this.form.reset();
    //       this.onReset();
    //     });
    //     setTimeout(() => {
    //       const noButton = container.createComponent('Nic nedela', () => { });
    //       setTimeout(() => {
    //         noButton.text += ' a este se skrejva';
    //         noButton.disabled = true;
    //         container.createComponent('1. formular', () => this.topVisible = !this.topVisible);
    //         setTimeout(() => {
    //           noButton.hidden = true;
    //           container.createComponent('2. formular', () => this.bottomVisible = !this.bottomVisible);
    //         }, 1000);
    //       }, 2000);
    //     }, 1000);
    //   }, 1000);
    // }, 1000);
  }
  onSubmit() {
    markControlsTouched(this.form);
  }
  onReset() {
    this.form.reset();
  }
}

