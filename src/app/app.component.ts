import { Component } from '@angular/core';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'edm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Timer application';

  numbers: Subscription;
  timer: number = 0;
  pausedValue: number = 0;
  toggleTimerText: string = 'Start';  // Start or Pause
  timerStatus: boolean = false;  // TRUE - playing timer; FALSE - paused/stopped timer;
  isSingleClick: boolean = false;

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

  public doubleClick(): void {
    if (this.isSingleClick) {
      if (this.timerStatus) {
        this.pauseTimer();
      }
    }
    this.isSingleClick = true;
    setTimeout(() => {
      this.isSingleClick = false;
    }, 300);
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
