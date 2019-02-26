import { BaseInputControl } from './base-input-control';

export class TextboxControl extends BaseInputControl<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
