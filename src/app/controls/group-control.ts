import { BaseControl } from './base-control';

export class GroupControl extends BaseControl {
  controls: BaseControl[];

  constructor(options: {
    label?: string
    order?: number,
    controls?: BaseControl[]
  } = {}) {
    super(options);
    this.controlType = 'group';
    this.controls = options.controls || [];
  }
}
