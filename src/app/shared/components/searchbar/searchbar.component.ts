import { Component, Input, OnInit } from '@angular/core';

import { ContentService } from 'src/app/core/services/content.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  @Input() public contentType;
  public searchTerm;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.srcTerm.subscribe(term => {
      this.searchTerm = term;
    })
    this.onSearch();
  }

  onSearchUpdate(event: any) {
    this.contentService.updatedSearchEntry(event.target.value);
    setTimeout(() => {
    this.onSearch();
  }, 1000);
  }

  private onSearch(){
      if(this.searchTerm.length >= 3) {
        this.contentService.searchContent(this.contentType, this.searchTerm);
      } else {
        this.contentService.getTop10(this.contentType);
      }
  }
}
