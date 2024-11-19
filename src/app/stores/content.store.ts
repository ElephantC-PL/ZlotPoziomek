import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { ArrayOfArrays } from '../models/app.model';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { DbDataService } from '../services/db-data.service';
import { Content, ContentType, FileValue, ImageValue, RichTextValue } from '../models/db-data.model';
import { tapResponse } from '@ngrx/operators';

interface ContentState {
    variantId: number,
    dbContents: Content[],
    isLoading: boolean,
    preview: boolean
}

const initialState: ContentState = {
    variantId: 9,
    dbContents: [],
    isLoading: false,
    preview: false
}

type ContentValuesToDisplayMap = Map<number, SectionValuesToDisplay> // number to sectionId

export interface SectionValuesToDisplay {
    string: string[],
    richText: RichTextValue[],
    image: ImageValue[],
    file: FileValue[]
}



const types = [ContentType.SimpleText, ContentType.Color, ContentType.RichText, ContentType.Image, ContentType.File];
//const versions = this.isPreview ? [2,3] : [3];
const statuses = [3];
const sections = [1,2,3,4,5,6,7,8,9,10];

export const ContentStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ dbContents }) => ({
        contentValuesToDisplayMap: computed(() => {
            const result: ContentValuesToDisplayMap = new Map();
            dbContents().forEach(content =>{
                let section: SectionValuesToDisplay|undefined = result.get(content.sectionId);
                if(!section){
                    section = {
                        string: [],
                        richText: [],
                        image: [],
                        file: []
                    }
                }
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
        })
    })),
    withMethods((store, dbDataService = inject(DbDataService)) => ({       
        loadContents: rxMethod<number>(
            pipe(
                debounceTime(300),
                distinctUntilChanged(),
                tap(() => patchState(store, { isLoading: true })),
                switchMap((variantId) => {                                        
                    return dbDataService.getAllDataAsObservable(types, sections, store.preview() ? [2,3] : [3], [variantId]).pipe(
                        tapResponse({
                            next: (dbContents) => patchState(store, { dbContents, isLoading: false }),
                            error: (err) => {
                                patchState(store, { isLoading: false });
                                console.error(err);
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
        }
    })),
    // withHooks({
    //     onInit(store) {
    //         store.loadContents(store.variantId);
    //     }
    // })
)

