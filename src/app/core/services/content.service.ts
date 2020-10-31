import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieTV } from 'src/app/shared/models/movietv.model';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private content: MovieTV[] = [];
  private contentUpdated =  new Subject<MovieTV[]>();

  private base_url = "http://image.tmdb.org/t/p/";
  private image_size = "w500";

  constructor(private http: HttpClient) { }

  getContentUpdateLstener() {
    return this.contentUpdated.asObservable();
  }

  getTop10(type: string){
    this.queryParam = '/' + type + '/top_rated' + environment.apiKey;
    this.http.get<{response: any}>(BACKEND_URL + this.queryParam)
    .pipe(map((responseData:any) => {
      return responseData.results.slice(0, 10).map(data => {
        let imgPath = this.base_url + this.image_size + data.backdrop_path;
        if(data.backdrop_path == null){
          imgPath = "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg";
        } 
        return {
          id: data.id,
          title: data.title || data.name,
          overview: data.overview,
          imageUrl:  imgPath,
          hasVideo: data.video || false,
        };
      });
    }))
    .subscribe((transformedContent) => {
      this.content = transformedContent;
      this.contentUpdated.next([...this.content]);
    });
  }

  getById(id: string, type: string) {
    this.queryParam = '/' + type + '/' + id + environment.apiKey;
    return this.http.get<{response: any}>(
      BACKEND_URL + this.queryParam
    );
  }

  getTrailerById(id: string, type:string){
    this.queryParam = '/' + type + '/' + id + '/videos' + environment.apiKey;
    return this.http.get<{response: any}>(
      BACKEND_URL + this.queryParam
    );
  }

  private queryParam;
  private searchEntry = new BehaviorSubject<string>("");
  srcTerm = this.searchEntry.asObservable();
  
  updatedSearchEntry(entry: string){
    this.searchEntry.next(entry);
  }

  searchContent(type:string, term: string){

    this.updatedSearchEntry(term);
    this.queryParam = '/search/' + type+ '/' + environment.apiKey + '&query=' + term;

    this.http.get<{response: any}>(BACKEND_URL + this.queryParam)
    .pipe(map((responseData:any) => {
      return responseData.results.slice(0, 10).map(data => {
        let imgPath = this.base_url + this.image_size + data.backdrop_path;
        if(data.backdrop_path == null){
          imgPath = "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg";
        } 
        return {
          id: data.id,
          title: data.title || data.name,
          overview: data.overview,
          imageUrl: imgPath,
          videoUrl: null,
          hasVideo: data.video,
        };
      });
    }))
    .subscribe((transformedContent) => {
      this.content = transformedContent;
      this.contentUpdated.next([...this.content]);
    });
  }
}
