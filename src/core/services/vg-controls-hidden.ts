import { Subject ,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class VgControlsHidden {
    isHidden: Observable<boolean>;

    private isHiddenSubject: Subject<boolean> = new Subject<boolean>();

    constructor() {
        this.isHidden = this.isHiddenSubject.asObservable();
    }

    state(hidden: boolean) {
        this.isHiddenSubject.next(hidden);
    }
}
