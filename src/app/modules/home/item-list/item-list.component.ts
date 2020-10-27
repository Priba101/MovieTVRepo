import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from 'src/app/core/services/content.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, OnDestroy {

  public isLoading = false;
  public contentType;
  public content: Content[] = [];
  private contentSub: Subscription;

  public constructor(
    private contentService: ContentService,
    private route:ActivatedRoute,
    private router:Router) {
      this.contentType = route.snapshot.data['type'];
      console.log(this.contentType);
  }

  ngOnInit(): void {
    this.contentService.getTop10(this.contentType);
    this.isLoading = true;
    this.contentSub = this.contentService.getContentUpdateLstener()
    .subscribe( (contet: Content[]) => {
      this.content = contet;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.contentSub.unsubscribe();
  }
}
