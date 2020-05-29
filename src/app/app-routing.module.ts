import { GamesPageComponent } from './modules/main pages/games-page/games-page.component';
import { TermsComponent } from './modules/terms/terms.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from './modules/main pages/home-page/home-page.component';
import {AuthGuard} from './core/auth/auth.guard';
import { GamePageComponent } from './modules/game-page/game-page.component';
import { TableSelectionComponent } from './modules/game-page/table-selection/table-selection.component';
import { LobbyComponent } from './modules/game-page/lobby/lobby.component';
import { GameComponent } from './modules/game-page/game/game.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'games', component: GamesPageComponent},
  {
    path: 'game', component: GamePageComponent, canActivate: [AuthGuard], children: [
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
        path: 'ingame', component: GameComponent
      }
    ]
  },
  {path: 'terms', component: TermsComponent}
];

  /*
  {
    path: 'game',
    loadChildren: () => import('./modules/game-page/game-page.module').then(m => m.GamePageModule),
    //canActivate: [AuthGuard]
  },*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
