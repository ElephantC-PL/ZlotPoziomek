import { inject, Injectable } from '@angular/core';
import { catchError, combineLatest, Observable, tap, throwError } from 'rxjs';
import { ContentType, Content } from '../models/db-data.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessService } from './process.service';

//const baseUrl = 'http://adamczyk.stronawcal.pl/elephantc-b/api/tutorials';

@Injectable({
  providedIn: 'root'
})
export class DbDataService {
  private _taskId = 1;
  private _headers = new HttpHeaders({'Content-Type': 'application/json'});

  private _http = inject(HttpClient);
  private _process = inject(ProcessService);

  private _apiUrl = 'http://localhost:3000'; 
  //private _simpleTextApi = 'http://api.zlotpoziomek.pl'; 

  public async getAllData(types: ContentType[], sectionIds?: number[], versionIds?: number[]): Promise<Content[] | undefined> {
    return new Promise<Content[] | undefined>((resolve) => {
      const observables = types?.map(x =>  this._getDataByType(x, sectionIds, versionIds))
      if(observables){
        combineLatest(observables).subscribe({
          next: (content) => {
            const result = content.filter(x => x !== undefined).flatMap(x => x) as Content[];
            resolve(result); 
          }        
        });
      }
    });
  }


  private _getDataByType(type: ContentType, sectionIds?: number[], versionIds?: number[]): Observable<Content[]|undefined> {
    const _taskId = this._taskId++;
    this._process.taskStart(_taskId);
    const body: {sectionId?: number[], versionId?: number[]} = {}
    if(sectionIds) body.sectionId = sectionIds;
    if(versionIds) body.versionId = versionIds;       

    return this._http.post<Content[]>(`${this._apiUrl}/${type.toString()}`, body, { headers: this._headers }).pipe(
      tap(() => {        
        this._process.taskEnd(_taskId, `Udało się pobrać "${type.toString()}" z bazy danych.`);
      }),
      catchError((error) => {               
        this._process.taskEnd(_taskId, `Podczas pobierania "${type.toString()}" za bazy danych wystąpił błąd: "${error.message}".`, true);
        return throwError(() => error)
      })
    );
  }
}
