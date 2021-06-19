import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducers';
import * as fromActions from '../../../../store/actions';
import * as fromSelectors from '../../../../store/selectors';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  routerParams$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.routerParams$ = this.store.select(fromSelectors.getRouterParamsState);
  }

  ngOnInit() {}
}
