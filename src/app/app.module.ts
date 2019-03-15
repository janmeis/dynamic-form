import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { AppComponent } from './app.component';
import { DatepickerInputComponent } from './controls/datepicker-input.component';
import { DynamicButtonContainerComponent } from './dynamic-button-container/dynamic-button-container.component';
import { DynamicButtonComponent } from './dynamic-button/dynamic-button.component';
import { DynamicFormControlComponent } from './dynamic-form-control/dynamic-form-control.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFormControlService } from './services/dynamic-form-control.service';
import { DynamicFormService } from './services/dynamic-form.service';

import '@progress/kendo-ui';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule,
    DateInputsModule,
    DropDownsModule,
    GridModule,
    InputsModule,
  ],
  declarations: [
    AppComponent,
    DynamicFormComponent,
    DynamicButtonComponent,
    DynamicButtonContainerComponent,
    DynamicFormControlComponent,
    DatepickerInputComponent,
  ],
  providers: [
    DynamicFormService,
    DynamicFormControlService
  ],
  entryComponents: [DynamicButtonComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
