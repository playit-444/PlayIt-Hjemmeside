import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  counter: boolean;
  seconds = 120;

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // console.log(this.counter);
  }

  Ready() {
    this.counter = true;
    this.cdr.detectChanges();
  }
}
