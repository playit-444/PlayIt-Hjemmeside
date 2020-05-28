import { GamesPageComponent } from './modules/main pages/games-page/games-page.component';
import { TermsComponent } from './modules/terms/terms.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from './modules/main pages/home-page/home-page.component';
import {AuthGuard} from './core/auth/auth.guard';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'games', component: GamesPageComponent},
  {
    path: 'game',
    loadChildren: () => import('./modules/game-page/game-page.module').then(m => m.GamePageModule),
    canActivate: [AuthGuard]
  },
  {path: 'terms', component: TermsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
