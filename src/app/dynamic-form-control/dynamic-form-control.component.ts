import { FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { BaseInputControl } from '../controls/base-input-control';

@Component({
  selector: 'app-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html'
})
export class DynamicFormControlComponent<T> {
  @Input() control: BaseInputControl<T>;
  @Input() form: FormGroup;

  constructor(){
  }
}
