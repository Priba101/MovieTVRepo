import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { ContentService } from 'src/app/core/services/content.service';
import { MovieTV } from 'src/app/shared/models/movietv.model';

@Component({
  selector: 'app-item',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})

export class ItemComponent implements OnInit {

  public content: MovieTV;
  private contentId: string;
  public isLoading = false;
  private type;

  private base_url = "http://image.tmdb.org/t/p/";
  private image_size = "w500";

  constructor(
    private _sanitizer: DomSanitizer,
    private contentService: ContentService,
    public route: ActivatedRoute,
    private location: Location) {
      this.type = route.snapshot.data['type'];
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')) {
        this.contentId = paramMap.get('id');
        this.isLoading = true;
        this.contentService.getById(this.contentId, this.type)
          .subscribe( (contentData:any) => {
            let imgPath = this.base_url + this.image_size + contentData.backdrop_path;
            if(contentData.backdrop_path == null){
              imgPath = "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg";
            } 
            this.isLoading = false;
            this.content = {
              id: contentData.id,
              title: contentData.title || contentData.name,
              overview: contentData.overview,
              imageUrl: imgPath,
              videoUrl: null,
              hasVideo: false,
            };
          });

        this.contentService.getTrailerById(this.contentId, this.type).subscribe((res: any) => {
          if(res.results.length > 0 ||  res.results === undefined) {
            if(res.results[0].key != null && res.results[0].site == "YouTube"){
              this.content.hasVideo = true;
              let ytUrl = "https://www.youtube.com/embed/" + res.results[0].key ;
              this.content.videoUrl = this._sanitizer.bypassSecurityTrustResourceUrl(ytUrl)
            }
          }
        })
      }
    });
  }

  goBack(){
    this.location.back();
  }
}
