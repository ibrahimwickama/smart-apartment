import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/reducers';
import * as fromActions from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'system-info';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.detectCurrentDevice();
  }
  detectCurrentDevice() {
    const userAgent = navigator.userAgent;

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
        userAgent
      )
    ) {
      // indicates using of mobile device
      this.store.dispatch(fromActions.loadCurrentDevice({ payload: 'mobile' }));
    } else if (/Chrome/i.test(userAgent)) {
      // indicates using of desktop chrome
      this.store.dispatch(
        fromActions.loadCurrentDevice({ payload: 'desktop' })
      );
    } else {
      // indicates using of desktop
      this.store.dispatch(
        fromActions.loadCurrentDevice({ payload: 'desktop' })
      );
    }
  }
}
