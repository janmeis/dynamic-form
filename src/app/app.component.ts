import { Component, ViewChild } from '@angular/core';
import { DynamicButtonContainerComponent } from './dynamic-button-container/dynamic-button-container.component';
import { QuestionService } from './services/question.service';

declare var kendo: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('dynamicButtonContainer') dynamicButtonContainer: DynamicButtonContainerComponent;
  questions: any[];
  party: any;

  constructor(service: QuestionService) {
    this.questions = service.getQuestions();
    this.party = service.getParty();
    if (window !== undefined) {
      (<any>window).$ = kendo.jQuery;
    }
  }
}
