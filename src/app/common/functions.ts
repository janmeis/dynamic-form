export const isControl = (obj: any): boolean =>
  Object.entries(obj).filter(([k, v]) => k == 'value').length > 0;

export const isArray = (o: any): boolean =>
  Object.prototype.toString.call(o) === '[object Array]';

export const isObject = (x: any): boolean =>
  typeof x === 'object' && x !== null;