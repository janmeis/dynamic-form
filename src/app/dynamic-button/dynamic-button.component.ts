import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Button } from '@progress/kendo-angular-buttons';

@Component({
  selector: 'app-dynamic-button',
  template: `
  <button *ngIf="!hidden" (click)="click()" [disabled]="disabled" #dynamicButton type="button">{{text}}</button>
  `,
  styles: []
})
export class DynamicButtonComponent implements OnInit {
  @ViewChild('dynamicButton') dynamicButton: Button;
  text: string;
  click: () => void;
  hidden = false;
  disabled = false;

  constructor() {

  }

  ngOnInit() {
  }

}
