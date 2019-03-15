import { Injectable, ComponentRef } from '@angular/core';
import { DynamicButtonContainerComponent } from '../dynamic-button-container/dynamic-button-container.component';
import { DynamicButtonComponent } from '../dynamic-button/dynamic-button.component';

@Injectable({
  providedIn: 'root'
})
export class ButtonService {
  dynamicButtonContainer: DynamicButtonContainerComponent;

  constructor() { }

  createComponent(text: string, click: () => void): ComponentRef<DynamicButtonComponent> {
    if (!this.dynamicButtonContainer)
      throw new Error('dynamicButtonContainer not set!')

    return this.dynamicButtonContainer.createComponent(text, click);
  }
  deleteComponent(componentRef: ComponentRef<DynamicButtonComponent>): void {
    if (!this.dynamicButtonContainer)
      throw new Error('dynamicButtonContainer not set!')

    this.dynamicButtonContainer.deleteComponent(componentRef);
  }
}
