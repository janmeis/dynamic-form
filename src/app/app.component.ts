import { Component, ViewChild } from '@angular/core';
import { DynamicButtonContainerComponent } from './dynamic-button-container/dynamic-button-container.component';

declare var kendo: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('dynamicButtonContainer') dynamicButtonContainer: DynamicButtonContainerComponent;
  party: any;

  constructor() {
    if (window !== undefined) {
      (<any>window).$ = kendo.jQuery;
    }
  }
}
