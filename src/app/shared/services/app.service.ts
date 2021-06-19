import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiLink } from '../../../assets/configurations/apiLink';
import { Observable, from } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private httpClient: HttpClient) {}

  fetchListings(): Observable<any> {
    const url = `${apiLink}List/json/listItems.aspx?listID=5363950&token=5AE7DFB40500DDC03BC84BD3F0A8AC0F18784B1E&receipt=undefined`;
    return this.httpClient.get(url);
  }

  fetchPropertyInformation(propertyid: string): Observable<any> {
    const url = `${apiLink}List/json/propertyItem.aspx?listID=5363950&token=5AE7DFB40500DDC03BC84BD3F0A8AC0F18784B1E&propertyID=${propertyid}`;
    return this.httpClient.get(url);
  }
}
