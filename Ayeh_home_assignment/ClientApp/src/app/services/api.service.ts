import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DTO } from '../models/DTO';
import { queryDto } from '../models/querydto';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { post } from '../models/post';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
 public query: Subject<queryDto> = new Subject<queryDto>();
  getData(query: queryDto): Observable<DTO> {
    return this.http.post('db/getData', query).pipe(map((x) => x as DTO));
  }

  deletePost(post:post){
   return this.http.post('db/deletePost',post).pipe(map(x=>x as boolean))
  }
}
