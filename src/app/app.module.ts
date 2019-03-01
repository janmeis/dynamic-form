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
import { DatepickerInputComponent } from './components/datepicker-input.component';
import { DynamicButtonContainerComponent } from './dynamic-button-container/dynamic-button-container.component';
import { DynamicButtonComponent } from './dynamic-button/dynamic-button.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { QuestionControlService } from './services/question-control.service';
import { QuestionService } from './services/question.service';

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
    DynamicFormQuestionComponent,
    DatepickerInputComponent,
    DynamicButtonComponent,
    DynamicButtonContainerComponent,
  ],
  providers: [
    QuestionService,
    QuestionControlService
  ],
  entryComponents: [DynamicButtonComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
