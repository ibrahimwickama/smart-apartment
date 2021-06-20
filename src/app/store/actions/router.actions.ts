import { NavigationExtras } from '@angular/router';
import { Action } from '@ngrx/store';

export const GO = '[Router] Go';

export class Go implements Action {
  readonly type = GO;
  constructor(
    public payload: {
      path: string[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export const BACK = '[Router] Back';
export class Back implements Action {
  readonly type = BACK;
}

export const FORWARD = '[Router] Foward';
export class Forward implements Action {
  readonly type = FORWARD;
}

export type RouterActions = Go | Back | Forward;
