import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { InfoPopupComponent } from '../components/organisms/info-popup/info-popup.component';
import { LoaderComponent } from '../components/atoms/loader/loader.component';
import { Message } from '../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  readonly overlay = inject(Overlay);
  private _snackBar = inject(MatSnackBar);

  private _pendingTasks: number[] = [];
  private _tasksToShow: Message[] = [];  
  private _queueFinishedSubject = new Subject<void>();
  private _nextProcess = false;
  private _timer?: ReturnType<typeof setTimeout>

  private overlayRef?: OverlayRef; 

  private _startLoader(): void{
    const overlayConfig = this.overlay.position().global().centerHorizontally().centerVertically();
    this.overlayRef = this.overlay.create({ hasBackdrop: true, positionStrategy: overlayConfig });
    const loader = new ComponentPortal(LoaderComponent);
    this.overlayRef.attach(loader);
    this._timeoutFinish();
  }

  private _endLoader(): void{
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }

  private _openInfoPopup(messeges: Message[]){
    this._snackBar.openFromComponent(InfoPopupComponent, {
      duration: 3 * 1000,
      data: messeges,
    });  
  }

  private _resetProcess(): void {
    this._tasksToShow = [];
    this._nextProcess = false;
  }

  private _startProcess(): void {
    if(this._nextProcess === false){
      this._startLoader();
    } else {
      this._nextProcess = false;
    }
  }

  private _finishProcess() {     
    clearTimeout(this._timer);
    this._endLoader();
    this._openInfoPopup(this._tasksToShow);   
    this._resetProcess();
  } 

  public taskStart(taskId: number):void {
    if(this._pendingTasks.length === 0){
      this._startProcess();
    }
     
    this._pendingTasks.push(taskId);      
  }

  public taskEnd(taskId: number, message: string, error?: boolean): void {    
    this._tasksToShow.push({id: taskId, text: message, isError: error});
    this._pendingTasks = this._pendingTasks.filter(x => x !== taskId);
    if(this._pendingTasks.length === 0){     
      if(this._nextProcess){       
        this._queueFinishedSubject.next();    
      } else {       
        this._finishProcess();
      } 
    }
  }

  public processAfterProcess(): Promise<boolean>{   
    this._nextProcess = true;
    return new Promise<boolean>((resolve) => {      
      this._queueFinishedSubject.subscribe({
        next: () => {         
          return resolve(true)}        
      });
    });
  }

  private _timeoutFinish():void {
    this._timer = setTimeout(()=> {
      this._tasksToShow.push({id: -1, text: "Zapytanie trwało zbyt długo", isError: true});
      this._finishProcess()
    }, 10000)    
  }
}
