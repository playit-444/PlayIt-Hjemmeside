import { HomePageComponent } from './home-page/home-page.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TableSelectionComponent} from './table-selection/table-selection.component';
import {AuthGuard} from './auth/auth.guard';


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'tableSelection', component: TableSelectionComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
