import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TableSelectionComponent} from './table-selection/table-selection.component';


const routes: Routes = [
  {path: 'tableSelection', component: TableSelectionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
