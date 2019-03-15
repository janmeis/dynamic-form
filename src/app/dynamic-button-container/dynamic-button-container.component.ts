import { Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicButtonComponent } from '../dynamic-button/dynamic-button.component';
import { timer } from 'rxjs';


@Component({
  selector: 'app-dynamic-button-container',
  template: `
  <div style="background-color: #369;padding: 1em 1em;min-height: 2em;">
  <template #buttonContainer></template>
  </div>
  `,
  styles: []
})
export class DynamicButtonContainerComponent {
  @ViewChild('buttonContainer', { read: ViewContainerRef }) entry: ViewContainerRef;
  componentRef: ComponentRef<DynamicButtonComponent>;

  constructor(private resolver: ComponentFactoryResolver) { }

  createComponent(text: string, click: () => void): ComponentRef<DynamicButtonComponent> {
    const factory = this.resolver.resolveComponentFactory(DynamicButtonComponent);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.text = text;
    this.componentRef.instance.click = click;

    return this.componentRef;
  }
  deleteComponent(componentRef: ComponentRef<DynamicButtonComponent>): void {
    const view = componentRef.hostView;
    const index = this.entry.indexOf(view);
    this.entry.remove(index);
  }
  destroyComponent = (): void => this.componentRef.destroy();
}
