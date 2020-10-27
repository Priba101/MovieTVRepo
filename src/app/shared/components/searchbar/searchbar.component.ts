import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  }

  onSearchUpdate(event: any) {
    setTimeout(() => {
      this.searchTerm = event.target.value;
      if(this.searchTerm.length >= 3) {
        this.contentService.searchContent(this.contentType, this.searchTerm);
      } else {
        this.contentService.getTop10(this.contentType);
      }
    }, 1000);
  }
}
