import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './components/loader/loader.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

@NgModule({
  declarations: [LoaderComponent, SearchbarComponent, NotfoundComponent],
  imports: [
    CommonModule
  ],
  exports: [LoaderComponent,SearchbarComponent, SearchbarComponent]
})
export class SharedModule { }
