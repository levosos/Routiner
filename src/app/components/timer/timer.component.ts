import { Component, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html'
})
export class TimerComponent implements OnChanges {

  private subscription: Subscription;

  @Input() public seconds: number;

  async ngOnChanges(): Promise<void> {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }

    if (this.seconds === 0) {
      return;
    }

    this.subscription = Observable.interval(1000).subscribe(x => {
      this.seconds--;

      if (this.seconds === 0) {
        this.subscription.unsubscribe();
      }
    });
  }
}
