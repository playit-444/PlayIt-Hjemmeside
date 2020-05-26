import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from './modules/home-page/home-page.component';
import {AuthGuard} from './core/auth/auth.guard';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {
    path: 'game',
    loadChildren: () => import('./modules/game-page/game-page.module').then(m => m.GamePageModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
