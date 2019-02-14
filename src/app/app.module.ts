import { BrowserModule }                from '@angular/platform-browser';
import { BrowserAnimationsModule }      from '@angular/platform-browser/animations';
import { NgModule }                     from '@angular/core';
import { ReactiveFormsModule }          from '@angular/forms';

import { AppComponent }                 from './app.component';
import { DynamicFormComponent }         from './dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question.component';
import { ButtonBarComponent }           from './button-bar/button-bar.component';



@NgModule({
  imports: [ BrowserModule, ReactiveFormsModule, BrowserAnimationsModule ],
  declarations: [ AppComponent, DynamicFormComponent, DynamicFormQuestionComponent, ButtonBarComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {
  }
}
