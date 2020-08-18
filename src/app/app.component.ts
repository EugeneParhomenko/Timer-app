import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { fromEvent, asyncScheduler } from 'rxjs';
import { throttleTime, debounceTime, buffer, map, filter } from 'rxjs/operators';

@Component({
  selector: 'edm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'Timer application';

  numbers: Subscription;
  timer: number = 0;
  pausedValue: number = 0;
  toggleTimerText: string = 'Start';  // Start or Pause
  timerStatus: boolean = false;  // TRUE - playing timer; FALSE - paused/stopped timer;
  isSingleClick: boolean = false;
  @ViewChild('wait') wait: ElementRef;

  ngAfterViewInit(): void {
    const click = fromEvent(this.wait.nativeElement, 'click');
    const buffered = click.pipe(
      debounceTime(300),
    );
    const click$ = click.pipe(
      buffer(buffered),
      map(list => {
        return list.length;
      }),
      filter(x => x === 2),
    );

    click$.subscribe(() => {
      if (this.numbers) {
        this.pauseTimer();
      }
    });
  }

  public resetTimer(): void {
    this.stopTimer();
    this.startTimer();
  }

  public toggleTimer(): void {
    if (!this.timerStatus) {
      this.startTimer();
    } else {
      this.pauseTimer();
    }
  }

  public startTimer(): void {
    this.numbers = timer(0, 1000)
      .subscribe(x => {
        this.timer = this.pausedValue + x;
      });

    this.timerStatus = true;
    this.toggleTimerText = 'Pause';
  }

  public stopTimer(): void {
    if (this.numbers) {
      this.numbers.unsubscribe();
      this.numbers = null;
    }
    this.timerStatus = false;
    this.toggleTimerText = 'Start';
    this.pausedValue = 0;
    this.timer = 0;
  }

  public pauseTimer(): void {
    this.pausedValue = this.timer;
    this.numbers.unsubscribe();
    this.numbers = null;
    this.timerStatus = false;
    this.toggleTimerText = 'Start';
  }
  
}
