import { inject, Injectable } from '@angular/core';
import { catchError, combineLatest, Observable, tap, throwError, map } from 'rxjs';
import { ContentType, Content } from '../models/db-data.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessService } from './process.service';
import { ApiUrl } from '../settings';

@Injectable({
  providedIn: 'root'
})
export class DbDataService {
  private _taskId = 1;
  private _headers = new HttpHeaders({'Content-Type': 'application/json'});  

  private _http = inject(HttpClient);
  private _process = inject(ProcessService);

  private _apiUrl = ApiUrl;

  public async getAllData(types: ContentType[], sectionIds?: number[], statusIds?: number[], variantIds?: number[]): Promise<Content[] | undefined> {
    return new Promise<Content[] | undefined>((resolve) => {
      const observables = types?.map(x =>  this._getDataByType(x, sectionIds, statusIds, variantIds))
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


  private _getDataByType(type: ContentType, sectionIds?: number[], statusIds?: number[], variantIds?: number[]): Observable<Content[]|undefined> {
    const _taskId = this._taskId++;
    this._process.taskStart(_taskId);
    const body: {sectionId?: number[], statusId?: number[], variantId?: number[]} = {}
    if(sectionIds) body.sectionId = sectionIds;
    if(statusIds) body.statusId = statusIds; 
    if(variantIds) body.variantId = variantIds;       

    return this._http.post<Content[]>(`${this._apiUrl}/${type.toString()}`, body, { headers: this._headers }).pipe(    
      tap(() => {        
        this._process.taskEnd(_taskId, `Udało się pobrać "${type.toString()}" z bazy danych.`);
      }),
      catchError((error) => {               
        this._process.taskEnd(_taskId, `Podczas pobierania "${type.toString()}" z bazy danych wystąpił błąd: "${error.message}".`, true);
        return throwError(() => error)
      })
    );
  }
}
