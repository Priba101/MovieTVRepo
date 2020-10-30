import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotfoundComponent } from 'src/app/shared/components/notfound/notfound.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemComponent } from './item/item.component';

const routes: Routes = [
  { path: '', component: ItemListComponent, data : {type : 'tv'}},
  { path: 'movies', component: ItemListComponent, data : {type : 'movie'}},
  { path: 'movie/:id', component: ItemComponent, data: {type : 'movie'}},
  { path: 'tv/:id', component:ItemComponent, data: {type : 'tv'}},
  { path: '**', component:NotfoundComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }