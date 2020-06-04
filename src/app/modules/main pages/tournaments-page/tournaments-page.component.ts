import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-tournaments-page',
  templateUrl: './tournaments-page.component.html',
  styleUrls: ['./tournaments-page.component.css']
})
export class TournamentsPageComponent implements OnInit {
  endDate = new Date('August 20, 2020 00:00:00');
  now: number;
  timeRemaining: number;
  daysRemaining: number;
  hoursRemaining: number;
  minutesRemaining: number;
  secondsRemaining: number;
  interval: any;

  constructor() { }

  ngOnInit(): void {

    this.time();
  }

  time(): void {
    setInterval(() => {
      this.now = new Date().getTime();
      this.timeRemaining = this.endDate.getTime() - this.now;

      this.daysRemaining = Math.floor(this.timeRemaining / (1000 * 60 * 60 * 24));
      this.hoursRemaining = Math.floor((this.timeRemaining % (1000 * 60 * 60 * 24))/(1000 * 60 * 60));
      this.minutesRemaining = Math.floor((this.timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      this.secondsRemaining = Math.floor((this.timeRemaining % (1000 * 60)) / (1000));

      if (this.timeRemaining < 0) {
          clearInterval(this.interval);
      }
    },1000);
  }

  @HostListener('window:beforeunload', ['$event'])
  public onPageUnload($event: BeforeUnloadEvent) {
      $event.returnValue = true;
  }
}
