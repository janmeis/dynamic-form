import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Button } from '@progress/kendo-angular-buttons';

@Component({
  selector: 'app-dynamic-button',
  template: `
  <button kendoButton #dynamicButton (click)="click()" type="button">{{text}}</button>
  `,
  styles: []
})
export class DynamicButtonComponent implements OnInit {
  @Input() text: string;
  @Input() click: Function;
  @ViewChild('dynamicButton') dynamicButton: Button;
  
  constructor() { }

  ngOnInit() {
  }

}
