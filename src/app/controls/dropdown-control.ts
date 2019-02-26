import { BaseInputControl } from './base-input-control';

export class DropdownControl extends BaseInputControl<string> {
  controlType = 'dropdown';
  codebook: string;

  constructor(options: {} = {}) {
    super(options);
    this.codebook = options['codebook'] || '';
  }
}
