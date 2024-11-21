import { Pipe, PipeTransform } from '@angular/core';
import type DeltaType from 'quill-delta';
import { API_URL } from '../../../settings';

@Pipe({
  name: 'quillLinksRedirect',
  standalone: true
})
export class QuillLinksRedirectPipe implements PipeTransform {

  transform(value: DeltaType): unknown {     
    return {ops: value.ops.map(tag=>{      
      if(tag.attributes && tag.attributes['link'] && (tag.attributes['link'] as string).startsWith('file/')){
        tag.attributes['link'] = `${API_URL}/` + tag.attributes['link'];
      }
      return tag;
    })} ;
  }
}
