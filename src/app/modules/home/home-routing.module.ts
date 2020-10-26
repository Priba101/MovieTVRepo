import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemListComponent } from './item-list/item-list.component';
import { ItemComponent } from './item/item.component';

const routes: Routes = [
  { path: '', component: ItemListComponent, data : {type : 'tv'}},
  { path: 'movies', component: ItemListComponent, data : {type : 'movie'}},
  { path: 'content/:id', component: ItemComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }