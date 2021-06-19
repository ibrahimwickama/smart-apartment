import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/reducers';
import * as fromActions from './store/actions';
import * as fromSelectors from './store/selectors';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>, private snackBar: MatSnackBar) {
    this.store
      .select(fromSelectors.getNotification)
      .subscribe((notification) => {
        // Trigger SnackaBar pop-up view
        if (notification.message) {
          const snackColor =
            notification.statusCode === 200
              ? 'success-snackbar'
              : 'danger-snackbar';
          this.snackBar.open(notification.message, '', {
            duration: 4000,
            panelClass: [snackColor],
          });
        }
      });
  }

  ngOnInit() {
    this.detectCurrentDevice();
    // Loading apartment listings data
    this.store.dispatch(fromActions.loadApartmentListings());
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
