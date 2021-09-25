import { Injectable } from '@angular/core';

import { Toast } from '../messages/toaster/toast.interface';
import { ToastType } from '../messages/toaster/toast.type';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  // subject: BehaviorSubject<Toast>;
  // toast$: Observable<Toast>;

  constructor() {
    // this.subject = new BehaviorSubject<Toast>(null);
    // this.toast$ = this.subject.asObservable()
    //   .pipe(filter(toast => toast !== null));
   }

   show(type: ToastType, title?: string, body?: string, delay?: number) {
    console.log(type,title,body)
    // this.subject.next({ type, title, body, delay });
  }
}
