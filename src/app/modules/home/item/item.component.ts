import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { Content } from 'src/app/shared/models/content.model';
import { ContentService } from 'src/app/core/services/content.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  public content: Content;
  private contentId: string;
  public isLoading = false;
  private type;

  constructor(
    private contentService: ContentService,
    public route: ActivatedRoute,
    private location: Location) {
      this.type = route.snapshot.data['type'];
      console.log(this.type);
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')) {
        this.contentId = paramMap.get('id');
        this.isLoading = true;
        this.contentService.getById(this.contentId, this.type)
        .subscribe( (contentData:any) => {
          console.log(contentData);
          this.isLoading = false;
          this.content = {
            id: contentData.id,
            title: contentData.title || contentData.name,
            overview: contentData.overview,
            posterUrl: "http://image.tmdb.org/t/p/w342" + contentData.poster_path,
            videoUrl: contentData.video,
          };
        });
      }
    });
  }

  goBack(){
    this.location.back();
  }
}
