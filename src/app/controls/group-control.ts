import { IBaseControl, cntrlType } from './ibase-control';

export class GroupControl implements IBaseControl {
  key: string;
  label: string;
  order: number;
  controlType: cntrlType;
  controls: IBaseControl[];

  constructor(options: {
    key?: string,
    label?: string
    order?: number,
    controls?: IBaseControl[]
  }) {
    this.key = options.key || '';
    this.label = options.label || '';
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = 'group';
    this.controls = options.controls || [];
  }
}
