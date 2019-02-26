export type cntrlType = 'group' | 'textbox' | 'datepicker' | 'dropdown';

export interface IBaseControl {
  key: string;
  label: string;
  order: number;
  controlType: cntrlType;
}
