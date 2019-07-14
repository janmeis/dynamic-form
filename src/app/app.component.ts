import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../environments/environment';
import { DynamicButtonContainerComponent } from './dynamic-button-container/dynamic-button-container.component';
import { ButtonService } from './services/button.service';

declare var kendo: any;

@Component({
  selector: 'app-root',
  styles: [`
    div>h5 {
      position: absolute;
      left: 50px;
      top: 55px;
      color: white;
      font-size: .9em;
      font-weight: lighter;
    }
  `],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @ViewChild(DynamicButtonContainerComponent) dynamicButtonContainer: DynamicButtonContainerComponent;

  production = environment.production;

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
