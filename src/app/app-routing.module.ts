import { HomePageComponent } from './home-page/home-page.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TableSelectionComponent} from './game-page/table-selection/table-selection.component';
import {AuthGuard} from './auth/auth.guard';
import { GamePageComponent } from './game-page/game-page.component';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'game', loadChildren: () => import('./game-page/game-page.module').then(m => m.GamePageModule) , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
