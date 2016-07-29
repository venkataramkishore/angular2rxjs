import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ResourceType} from '../../models/index';

@Injectable()
export class MasterDataService {
    private _resourceType$:Observable<ResourceType[]>;

    public get resourceType$() : Observable<ResourceType[]> {
        return this._resourceType$;
    }

    public set resourceType$(resType$:Observable<ResourceType[]>) {
         this._resourceType$ = resType$;
    }
}
