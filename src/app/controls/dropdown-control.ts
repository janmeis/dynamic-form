import { BaseInputControl } from './base-input-control';

export class DropdownControl extends BaseInputControl<string> {
  codebook: string;
  
  constructor(options: {} = {}) {
    super(options);
    this.controlType = 'dropdown';
    this.codebook = options['codebook'] || '';
  }
}
