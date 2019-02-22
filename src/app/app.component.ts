import { Component } from '@angular/core';
import { QuestionService } from './services/question.service';

declare var kendo: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [QuestionService]
})
export class AppComponent {
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
