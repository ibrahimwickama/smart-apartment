import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/reducers';
import { MatSnackBar } from '@angular/material/snack-bar';
import { loadApartmentListings, loadCurrentDevice } from './store/actions/page-state.actions';
import { getNotification } from './store/selectors/page-state.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>, private snackBar: MatSnackBar) {
    this.store
      .select(getNotification)
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
    this.store.dispatch(loadApartmentListings());
  }
  detectCurrentDevice() {
    const userAgent = navigator.userAgent;

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
        userAgent
      )
    ) {
      // indicates using of mobile device
      this.store.dispatch(loadCurrentDevice({ payload: 'mobile' }));
    } else if (/Chrome/i.test(userAgent)) {
      // indicates using of desktop chrome
      this.store.dispatch(
        loadCurrentDevice({ payload: 'desktop' })
      );
    } else {
      // indicates using of desktop
      this.store.dispatch(
        loadCurrentDevice({ payload: 'desktop' })
      );
    }
  }
}
