import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { SimpleText } from '../models/db-data.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessService } from './process.service';

const baseUrl = 'http://localhost:3000/api/';
//const baseUrl = 'http://adamczyk.stronawcal.pl/elephantc-b/api/tutorials';

@Injectable({
  providedIn: 'root'
})
export class DbDataService {
  private _taskId = 1;
  private _headers = new HttpHeaders({'Content-Type': 'application/json'});

  private _http = inject(HttpClient);
  private _process = inject(ProcessService);

  private _simpleTextApi = 'http://localhost:3000/api/simple-texts'; 


  public getSimpleTexts(sectionIds?: number[], versionIds?: number[]): Observable<SimpleText[]|undefined> {
    const _taskId = this._taskId++;
    this._process.taskStart(_taskId);
    const body: {sectionId?: number[], versionId?: number[]} = {}
    if(sectionIds) body.sectionId = sectionIds;
    if(versionIds) body.versionId = versionIds;       

    return this._http.post<SimpleText[]>(this._simpleTextApi, body, { headers: this._headers }).pipe(
      tap(() => {        
        this._process.taskEnd(_taskId, 'Udało się pobrać dane z bazy danych.');
      }),
      catchError((error) => {               
        this._process.taskEnd(_taskId, `Podczas pobierania danych za bazy danych wystąpił błąd: "${error.message}".`, true);
        return throwError(() => error)
      })
    );
  }
}