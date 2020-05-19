import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-selection',
  templateUrl: './table-selection.component.html',
  styleUrls: ['./table-selection.component.css']
})
export class TableSelectionComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {
    // this.gameService.GetGameType()
    //   .subscribe(data => {
    //     this.games = data.items;
    //   },
    //   err => {
    //     this.toastr.error(err.error, 'Der skete en fejl!');
    //     console.log(err);
    //   });
  }

}
