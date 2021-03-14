import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DTO } from '../models/DTO';
import { queryDto } from '../models/querydto';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { post } from '../models/post';
import {  commentDto } from '../models/commentsDTO';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
 public dir: string = '';
 public query: Subject<queryDto> = new Subject<queryDto>();
  getData(query: queryDto): Observable<DTO> {
    return this.http.post('db/getData', query).pipe(map((x) => x as DTO));
  }

  deletePost(post:post){
   return this.http.post('db/deletePost',post).pipe(map(x=>x as boolean))
  }

  reset(){
    return this.http.post('db/reset',{}).pipe(map((x) => x as DTO))
  }
  mark(post:post){
   return this.http.post('db/mark',post).pipe(map(x=>x as boolean))

  }
  getPostById(postId:number){
    return this.http.post('db/postById', {id:postId}).pipe(map((x) => x as post));
  }
  deleteCooment(commentDto:commentDto){
    return this.http.post('db/deleteComment', commentDto).pipe(map((x) => x as boolean));
  }
  addComment(commentDto:commentDto){
    return this.http.post('db/addComment', commentDto).pipe(map((x) => x as boolean));
  }
}
