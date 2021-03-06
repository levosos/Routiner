import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html'
})
export class TimerComponent implements OnChanges, OnDestroy {

  private subscription: Subscription;
  public passed: number;

  @Input() public seconds: number;

  public ngOnChanges(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }

    this.passed = 0;

    if (this.seconds === 0) {
      return;
    }

    this.subscription = Observable.interval(1000).subscribe(x => {
      this.passed++;

      if (this.passed === this.seconds) {
        this.subscription.unsubscribe();
      }
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
