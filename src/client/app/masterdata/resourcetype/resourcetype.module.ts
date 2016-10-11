import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ResourceTypeComponent }   from './resourcetype.component';
import { ResourceTypeService } from '../../shared/services/index';
//import { ResourceTypeRoutes } from './resourcetype.routes';

@NgModule({
    imports: [ CommonModule, RouterModule, FormsModule, HttpModule ],
    exports: [ ResourceTypeComponent ],
    declarations: [ ResourceTypeComponent ],
    providers: [ ResourceTypeService ],
})
export class ResourceTypeModule { }
