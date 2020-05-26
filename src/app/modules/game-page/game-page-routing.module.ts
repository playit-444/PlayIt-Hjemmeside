import { GamePageComponent } from './game-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableSelectionComponent } from './table-selection/table-selection.component';
import { LobbyComponent } from './lobby/lobby.component';


const routes: Routes = [
  {
    path: '', component: GamePageComponent, children: [
      {
        path: 'table-selection', component: TableSelectionComponent
      },
      {
        path: 'lobby', component: LobbyComponent
      },
      {
        path: '', redirectTo: 'table-selection', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamePageRoutingModule { }
