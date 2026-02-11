import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  GetPeopleResponse,
  GetDutiesResponse,
  CreatePersonResponse,
  CreateDutyRequest,
  CreateDutyResponse
} from '../models/models';

@Injectable({ providedIn: 'root' })
export class StargateService {
  constructor(private http: HttpClient) {}

  getPeople(): Observable<GetPeopleResponse> {
    return this.http.get<GetPeopleResponse>('/Person');
  }

  getDutiesByName(name: string): Observable<GetDutiesResponse> {
    return this.http.get<GetDutiesResponse>(`/AstronautDuty/${encodeURIComponent(name)}`);
  }

  createPerson(name: string): Observable<CreatePersonResponse> {
    return this.http.post<CreatePersonResponse>('/Person', JSON.stringify(name), {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  createDuty(request: CreateDutyRequest): Observable<CreateDutyResponse> {
    return this.http.post<CreateDutyResponse>('/AstronautDuty', request);
  }
}
