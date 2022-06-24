import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Sport } from './sport';

@Injectable({
  providedIn: 'root'
})
export class SportService {
  baseUrl = 'http://localhost/api';
                
constructor(private http: HttpClient) { }
                
getAll() {
  return this.http.get(`${this.baseUrl}/list.php`).pipe(
    map((res: any) => {
      return res['data'];
    })
  );
}
  

store(sport: Sport) {
  return this.http.post(`${this.baseUrl}/store.php`, { data: sport }).pipe(
    map((res: any) => {
      return res['data'];
    })
  );
  }
}