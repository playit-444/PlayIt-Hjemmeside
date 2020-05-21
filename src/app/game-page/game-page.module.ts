import { LobbyComponent } from './lobby/lobby.component';
import { TableSelectionComponent } from './table-selection/table-selection.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table-selection/table/table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GamePageRoutingModule } from './game-page-routing.module';
import { PlayerComponent } from './lobby/player/player.component';
import { CountdownModule } from 'ngx-countdown';


@NgModule({
  declarations: [
    TableSelectionComponent,
    LobbyComponent,
    TableComponent,
    PlayerComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    GamePageRoutingModule,
    CountdownModule,
  ]
})
export class GamePageModule { }
