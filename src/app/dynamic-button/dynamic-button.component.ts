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
  @Input() text: string;
  @Input() click: Function;
  @Input() hidden = false;
  @Input() disabled = false;
  @ViewChild('dynamicButton') dynamicButton: Button;
  
  constructor() { }

  ngOnInit() {
  }

}
