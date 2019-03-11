import { Injectable } from '@angular/core';
import { IBaseControl } from '../controls/ibase-control';
import { AbstractControl } from '@angular/forms';
import { isArray, isObject } from 'util';
import { isControl } from '../common/functions';

@Injectable({
  providedIn: 'root'
})
export abstract class DynamicFormBaseService {
  abstract maxLevel: number;

  // <see cref="https://www.quora.com/How-do-you-loop-through-a-complex-JSON-tree-of-objects-and-arrays-in-JavaScript"/>
  traverse(x: any, group: IBaseControl[] | AbstractControl, level: number) {
    if (isArray(x))
      this.traverseArray(x, group, level);
    else if (isObject(x))
      this.traverseObject(x, group, level);
  }
  traverseArray(arr: any[], group: IBaseControl[] | AbstractControl, level: number) {
    arr.forEach(x => this.traverse(x, group, level + 1));
  }
  traverseObject(obj: object, group: IBaseControl[] | AbstractControl, level: number) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key) && level < this.maxLevel) {
        const prop = obj[key];
        if (isControl(prop)) {
          this.generateControl(key, prop, group);
        } else if (typeof prop != 'string' && Object.entries(prop).length > 0) {
          const g = this.generateGroup(key, prop, group);
          this.traverse(prop, g, level + 1);
        } else
          this.traverse(prop, group, level + 1);
      }
    }
  }
  abstract generateControl(key: string, prop: any, group: IBaseControl[] | AbstractControl): any;
  abstract generateGroup(key: string, prop: any, group: IBaseControl[] | AbstractControl): any;

}
