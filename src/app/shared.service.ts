import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }
  // https://localhost:5001/
  // http://27.72.28.11:2445
  // 183.80.50.40:3443
  // 192.168.8.135
  readonly APIYoutubeTrending = 'https://www.googleapis.com/youtube/v3/videos';
  readonly APILocal = 'http://192.168.8.135:2445/api/CheckNetwork';
  readonly APILocal_Debug = 'http://192.168.8.135:2445/api/Upload';
  readonly from0to50 = 'CDIQAQ';
  readonly from50to100 = 'CDIQAA';
  readonly from100to150 = 'CGQQAA';
  readonly from150to200 = 'CJYBEAA';

  getTopTrendingYoutube0To50(regionCode:string): Observable<any> {
    let params = new HttpParams()
    .set('part','snippet')
    .set('chart','mostPopular')
    .set('videoCategoryId','10')
    .set('regionCode', regionCode)
    .set('key','AIzaSyDGQo9ygVxqfbsgKQ6ZDbutcCMFzlkI-cY')
    .set('maxResults',50)
    .set('pageToken',this.from0to50)

    return this.http.get<any>(this.APIYoutubeTrending, {params: params})
  }

  getTopTrendingYoutube50To100(regionCode:string): Observable<any> {
    let params = new HttpParams()
    .set('part','snippet')
    .set('chart','mostPopular')
    .set('videoCategoryId','10')
    .set('regionCode', regionCode)
    .set('key','AIzaSyDGQo9ygVxqfbsgKQ6ZDbutcCMFzlkI-cY')
    .set('maxResults',50)
    .set('pageToken',this.from50to100)

    return this.http.get<any>(this.APIYoutubeTrending, {params: params})
  }

  getTopTrendingYoutube100To150(regionCode:string): Observable<any> {
    let params = new HttpParams()
    .set('part','snippet')
    .set('chart','mostPopular')
    .set('videoCategoryId','10')
    .set('regionCode', regionCode)
    .set('key','AIzaSyDGQo9ygVxqfbsgKQ6ZDbutcCMFzlkI-cY')
    .set('maxResults',50)
    .set('pageToken',this.from100to150)

    return this.http.get<any>(this.APIYoutubeTrending, {params: params})
  }

  getTopTrendingYoutube150To200(regionCode:string): Observable<any> {
    let params = new HttpParams()
    .set('part','snippet')
    .set('chart','mostPopular')
    .set('videoCategoryId','10')
    .set('regionCode', regionCode)
    .set('key','AIzaSyDGQo9ygVxqfbsgKQ6ZDbutcCMFzlkI-cY')
    .set('maxResults',50)
    .set('pageToken',this.from150to200)

    return this.http.get<any>(this.APIYoutubeTrending, {params: params})
  }

  getNetWork(id:string, cookie:string): Observable<any> {
    let params = new HttpParams()
    .set('id',id)
    .set('cookie',cookie)

    const requestOptions: Object = {
      params: params,
      responseType: 'text'
    }

    return this.http.get<any>(this.APILocal, requestOptions)
  }

  uploadFile(fileToUpload: File): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name)
    return this.http.post(this.APILocal_Debug, formData)
  }

  getAllLinkFromFile(): Observable<any> {
    return this.http.get(this.APILocal_Debug+"/getLink")
  }
  

}
