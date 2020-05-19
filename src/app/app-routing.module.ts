import { HomePageComponent } from './home-page/home-page.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TableSelectionComponent} from './table-selection/table-selection.component';
import {AuthGuard} from './auth/auth.guard';
import { GamePageComponent } from './game-page/game-page.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'game', component: GamePageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
