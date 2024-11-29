import { inject, Injectable } from '@angular/core';
import { catchError, combineLatest, Observable, tap, throwError, map, timeout } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../settings';
import type DeltaType from 'quill-delta';
import { Message, MessagesService } from './messages.service';

export enum ContentType {
    SimpleText = 'simple-text',
    Color = 'color',
    Image = 'image',
    RichText = 'rich-text',
    File = 'file',
    EmbedHtml = 'embed-html',
    Collection = 'collection'
}

export interface Content {
    id: number,    
    sectionId: number,
    statusId: number,
    variantId: number,
    locationId: number,   
    value?: ContentValue,
    createdAt: string,
    updatedAt: string,
    type?: ContentType
}

export interface ImageValue {
    width: number,
    height: number,
    fileName: string,
    alt: string,
}

export interface FileValue {    
    fileName: string,
    linkText: string,
}

export type RichTextValue = DeltaType;

export type ContentValue = (string|RichTextValue|ImageValue|FileValue);

@Injectable({
  providedIn: 'root'
})
export class DbDataService {
  private _headers = new HttpHeaders({'Content-Type': 'application/json'});
  private _messages = inject(MessagesService);
  private _http = inject(HttpClient);

  getAllData(types: ContentType[], sectionIds?: number[], statusIds?: number[], variantIds?: number[]): Observable<Content[]> {
    const observables: Observable<Content[]|undefined>[] = types?.map(type =>  this._getDataByType(type, sectionIds, statusIds, variantIds));
    return combineLatest(observables).pipe(
      map(contents => (contents.filter(x => x !== undefined).flatMap(x => x) as Content[] ?? [])
    ))
  }

  private _getDataByType(type: ContentType, sectionIds?: number[], statusIds?: number[], variantIds?: number[]): Observable<Content[]|undefined> {
    const body: {sectionId?: number[], statusId?: number[], variantId?: number[]} = {}
    if(sectionIds) body.sectionId = sectionIds;
    if(statusIds) body.statusId = statusIds; 
    if(variantIds) body.variantId = variantIds;       

    return this._http.post<Content[]>(`${API_URL}/${type.toString()}`, body, { headers: this._headers }).pipe(
      map(contents =>
        contents.map(content => ({
          ...content,
          type: type
        }))
      ),  
      timeout(5000),  
      tap(() => {  
        this._messages.newMessage = {text: `Udało się pobrać ${type.toString()} z bazy danych.`};        
      }),
      catchError((error) => {         
        this._messages.newMessage = {
          text: `Podczas pobierania "${type.toString()}" z bazy danych wystąpił błąd: "${error.message}".`,
          isError: true 
        };          
        return throwError(() => error)
      })
    );
  }
}
