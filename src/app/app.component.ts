import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicButtonContainerComponent } from './dynamic-button-container/dynamic-button-container.component';
import { ButtonService } from './services/button.service';

declare var kendo: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild(DynamicButtonContainerComponent) dynamicButtonContainer: DynamicButtonContainerComponent;

  constructor(
    private buttonService: ButtonService
  ) {
    if (window !== undefined) {
      (<any>window).$ = kendo.jQuery;
    }
  }
  ngOnInit(): void {
    if (this.dynamicButtonContainer)
      this.buttonService.dynamicButtonContainer = this.dynamicButtonContainer;
  }
}
