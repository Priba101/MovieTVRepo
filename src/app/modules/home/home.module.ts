import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemListComponent } from './item-list/item-list.component';
import { ItemComponent } from './item/item-details.component';
import { ItemPreviewComponent } from './item-list/item-preview/item-preview.component';
import { HomeRoutingModule} from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ItemListComponent, ItemComponent, ItemPreviewComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
