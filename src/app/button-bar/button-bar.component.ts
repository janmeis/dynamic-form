import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'button-bar',
  templateUrl: './button-bar.component.html',
  styles: []
})
export class ButtonBarComponent implements AfterViewInit {
  buttons: HTMLButtonElement[];
  constructor(private elRef: ElementRef) { }

  ngAfterViewInit() {
    this.buttons = this.elRef.nativeElement.getElementsByTagName('button');
  }

}
