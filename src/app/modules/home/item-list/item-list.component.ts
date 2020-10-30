import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ContentService } from 'src/app/core/services/content.service';
import { Subscription } from 'rxjs';
import { MovieTV } from 'src/app/shared/models/movietv.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {

  public isLoading = true;
  public contentType;
  public content: MovieTV[] = [];
  private contentSub: Subscription;

  public constructor(
    private contentService: ContentService,
    private route:ActivatedRoute,
    private router:Router) {
      this.contentType = route.snapshot.data['type'];
  }

  ngOnInit(): void {
    setTimeout(() => {
      if(this.content != null){
        this.isLoading = false;
      }
    }, 400);
    this.contentService.getTop10(this.contentType);
    this.contentSub = this.contentService.getContentUpdateLstener()
    .subscribe( (content: MovieTV[]) => {
      this.content = content;
    });
  }

  ngOnDestroy(): void {
    this.contentSub.unsubscribe();
  }
}
