import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
const BACKEND_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private content: Content[] = [];
  private contentUpdated =  new Subject<Content[]>();
  private queryParam;
  //environment.apiKey
  constructor(private http: HttpClient) { }
  getContentUpdateLstener() {
    return this.contentUpdated.asObservable();
  }
  getTop10(type: string){
    this.queryParam = '/' + type + '/top_rated' + environment.apiKey;
    this.http.get<{movies: any}>(BACKEND_URL + this.queryParam)
    .pipe(map((movieData:any) => {
      return movieData.results.map(movie => {
        return {
          id: movie.id,
          title: movie.title || movie.name,
          overview: movie.overview,
          posterUrl: movie.poster_path,
          videoUrl: movie.video,
        };
      });
    }))
    .subscribe((transformedContent) => {
      this.content = transformedContent;
      this.contentUpdated.next([...this.content]);
    });
  }
  private searchQry;

  searchContent(type:string, qry: string){
    this.searchQry = qry;

    this.queryParam = '/search/' + type+ '/' + environment.apiKey + '&query=' + qry;
    console.log(BACKEND_URL + this.queryParam);

    this.http.get<{response: any}>(BACKEND_URL + this.queryParam)
    .pipe(map((contentData:any) => {
      return contentData.results.slice(0, 10).map(movie => {
        return {
          id: movie.id,
          title: movie.title || movie.name,
          overview: movie.overview,
          posterUrl: "http://image.tmdb.org/t/p/w342" + movie.poster_path,
          videoUrl: movie.video,
        };
      });
    }))
    .subscribe((transformedContent) => {
      this.content = transformedContent;
      this.contentUpdated.next([...this.content]);
    });
  }
}