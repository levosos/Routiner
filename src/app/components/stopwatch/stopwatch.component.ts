import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html'
})
export class StopwatchComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private seconds = 0;

  public ngOnInit(): void {
    this.subscription = Observable.interval(1000).subscribe(x => {
      this.seconds++;
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public reset(): void {
    this.seconds = 0;
  }
}
