import { Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DynamicButtonComponent } from '../dynamic-button/dynamic-button.component';


@Component({
  selector: 'app-dynamic-button-container',
  template: `
  <div class="form-row">
  <template #buttonContainer></template>
  </div>
  `,
  styles: []
})
export class DynamicButtonContainerComponent {
  @ViewChild('buttonContainer', { read: ViewContainerRef }) entry: ViewContainerRef;
  componentRef: ComponentRef<DynamicButtonComponent>;

  constructor(private resolver: ComponentFactoryResolver) { }

  createComponent(text: string, click: Function): void {
    const factory = this.resolver.resolveComponentFactory(DynamicButtonComponent);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.text = text;
    this.componentRef.instance.click = click;
  }
  destroyComponent = (): void => this.componentRef.destroy();
}
