import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { Content, ContentType, DbDataService, FileValue, ImageValue, RichTextValue } from '../services/db-data.service';
import { tapResponse } from '@ngrx/operators';
import { SectionValuesToDisplay } from '../components/organisms/section/section.component';
import { Message } from '../components/organisms/info-popup/info-popup.component';
import { SECTIONS, TYPES } from '../components/pages/specific-edition-page';
import { HttpErrorResponse } from '@angular/common/http';

interface ContentState {
    variantId: number,
    dbContents: Content[],
    isLoading: boolean,
    preview: boolean,
    dbMessages: Message[]
}

const initialState: ContentState = {
    variantId: 1,
    dbContents: [],
    isLoading: false,
    preview: false,
    dbMessages: []
}

type ContentValuesToDisplayMap = Map<number, SectionValuesToDisplay> // key - sectionId

export const ContentStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ dbContents }) => ({
        contentValuesToDisplayMap: computed(() => createContentValuesToDisplayMapFromDbContents(dbContents()))
    })),
    withMethods((store, dbDataService = inject(DbDataService)) => ({       
        loadContents: rxMethod<number>(
            pipe(
                debounceTime(300),
                distinctUntilChanged(),
                tap(() => patchState(store, { isLoading: true })),
                switchMap((variantId) => {                                        
                    return dbDataService.getAllData(TYPES, SECTIONS, store.preview() ? [2,3] : [3], [variantId]).pipe(
                        tapResponse({
                            next: (DbDataResult) => patchState(store, {
                                                        dbContents: DbDataResult.contents,
                                                        dbMessages: DbDataResult.messages,
                                                        isLoading: false
                                                    }),
                            error: (error) => {
                                const errorMessage = (error as HttpErrorResponse).message
                                patchState(store, { 
                                    isLoading: false, 
                                    dbMessages: [...store.dbMessages(), {text: `Nie udało się pobrać danych, bład: ${errorMessage} `, isError: true }]
                                });                                
                            },
                        })
                    );
                })
            )
        ),
        changeVariant(newVariantId: number): void {
            patchState(store, () => ({ variantId: newVariantId }));
        },
        setPreview(newPreview: boolean): void {
            patchState(store, () => ({ preview: newPreview }));
        },
        addDbMessage(message: Message): void {
            patchState(store, ({dbMessages}) => ({ dbMessages: [...dbMessages, message] }));
        },        
    }))    
)

const createContentValuesToDisplayMapFromDbContents = function (dbContents: Content[]): ContentValuesToDisplayMap {
    const result: ContentValuesToDisplayMap = new Map(); 
    dbContents.forEach(content =>{   
        let section: SectionValuesToDisplay|undefined = result.get(content.sectionId) ?? 
        {
            image: [],
            richText: [],
            file: [],
            string: []
        };                          
        switch(content.type){
            case ContentType.Image:
                section.image[content.locationId] = content.value as ImageValue;
                break;
            case ContentType.RichText:
                section.richText[content.locationId] = content.value as RichTextValue;
                break;            
            case ContentType.File:
                section.file[content.locationId] = content.value as FileValue;
                break;
            default: 
                section.string[content.locationId] = content.value as string;             
        }        
        result.set(content.sectionId, section)
    })   
    return result;
}
