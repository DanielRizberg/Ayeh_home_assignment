import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DTO } from '../models/DTO';
import { queryDto } from '../models/querydto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getData(query: queryDto): Observable<DTO> {
    return this.http.post('db/getData', query).pipe(map((x) => x as DTO));
  }
}
