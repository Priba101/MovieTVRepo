import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';



@NgModule({
  declarations: [LoaderComponent, SearchbarComponent],
  imports: [
    CommonModule
  ],
  exports: [LoaderComponent,SearchbarComponent]
})
export class SharedModule { }
