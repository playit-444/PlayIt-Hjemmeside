import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-awards-page',
  templateUrl: './awards-page.component.html',
  styleUrls: ['./awards-page.component.css']
})
export class AwardsPageComponent implements OnInit {
  endDate = new Date('October 20, 2020 00:00:00');
  now: number;
  timeRemaining: number;
  daysRemaining: number;
  hoursRemaining: number;
  minutesRemaining: number;
  secondsRemaining: number;
  interval: any;

  constructor() {
  }

  ngOnInit(): void {

    this.time();
  }

  // Timer showing when awards page is released
  time(): void {
    setInterval(() => {
      this.now = new Date().getTime();
      this.timeRemaining = this.endDate.getTime() - this.now;

      this.daysRemaining = Math.floor(this.timeRemaining / (1000 * 60 * 60 * 24));
      this.hoursRemaining = Math.floor((this.timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutesRemaining = Math.floor((this.timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      this.secondsRemaining = Math.floor((this.timeRemaining % (1000 * 60)) / (1000));

      if (this.timeRemaining < 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }
}
