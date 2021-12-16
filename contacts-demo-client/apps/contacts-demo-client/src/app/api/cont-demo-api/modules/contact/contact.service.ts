import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Contact } from './contact';
import { setUUID, decodeUUID } from '../../entity';
import { map, Observable } from 'rxjs';
import { Response } from '../../response';
import { environment } from '../../../../../environments/environment';
import { ResourceQuery } from '../../resource-query';


@Injectable({ providedIn: 'root' })
export class ContactService {

  private readonly resourceUrl = `${environment.api.base}/contacts`;

  constructor(
    private http: HttpClient
  ) {
  }

  getBy(query: Partial<ResourceQuery> = {}): Observable<Response<Contact[]>> {
    const params = new HttpParams({ fromObject: query as ResourceQuery });
    return this.http.get<Response<Contact[]>>(this.resourceUrl, { params }).pipe(
      map(response => {
        response._embedded.contacts.forEach(c => setUUID(c));
        return response;
      })
    );
  }

  getById(uuid: string) {
    const url = decodeUUID(uuid);
    return this.http.get<Response<Contact>>(url).pipe(
      map(c => setUUID(c._embedded.contact))
    );
  }

  save(payload: Contact) {
    const url = this.getPayloadUrl(payload);
    const request = this.createSaveRequest(url, payload);
    return request.pipe(
      map(c => {
        setUUID(c);
        return c;
      })
    );
  }

  deleteOne(payload: Contact) {
    const url = this.getPayloadUrl(payload);
    return this.http.delete(url);
  }

  private getPayloadUrl(payload: Contact) {
    if (payload.uuid) {
      return decodeUUID(payload.uuid);
    } else if (payload._links?.self.href) {
      return payload._links.self.href;
    }
    return this.resourceUrl;
  }

  private createSaveRequest(url: string, payload: Contact) {
    if (payload.uuid) {
      return this.http.patch<Contact>(url, payload);
    }
    return this.http.post<Contact>(url, payload);
  }
}
