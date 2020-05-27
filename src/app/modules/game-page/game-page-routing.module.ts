import { GamePageComponent } from './game-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableSelectionComponent } from './table-selection/table-selection.component';
import { LobbyComponent } from './lobby/lobby.component';
import { GameComponent } from './game/game.component';


const routes: Routes = [
  {
    path: '', component: GamePageComponent, children: [
      {
        path: '', redirectTo: 'table-selection', pathMatch: 'full'
      },
      {
        path: 'table-selection', component: TableSelectionComponent
      },
      {
        path: 'lobby', component: LobbyComponent
      },
      {
        path: 'game', component: GameComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamePageRoutingModule { }
