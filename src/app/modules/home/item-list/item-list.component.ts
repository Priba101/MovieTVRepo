import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from 'src/app/core/services/content.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  public isLoading = false;
  public content: Content[] = [];
  private contentSub: Subscription;
  private type;
  public constructor(
    private contentService: ContentService,
    private route:ActivatedRoute,
    private router:Router) {
      this.type = route.snapshot.data['type'];
      console.log(this.type);
  }
  ngOnInit(): void {
    this.contentService.getTop10(this.type);
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