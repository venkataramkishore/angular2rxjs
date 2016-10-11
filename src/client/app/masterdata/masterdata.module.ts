import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BandModule, BusinessLineModule, GradeModule,
    OffshorePriceModule, OnshorePriceModule,
    ResourceTypeModule, RoleModule, SkillModule,
    StatusModule, StayModule, UserRoleModule } from './index';
import { MasterDataComponent } from './masterdata.component';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, HttpModule, BandModule, BusinessLineModule, GradeModule,
                OffshorePriceModule, OnshorePriceModule,
                ResourceTypeModule, RoleModule, SkillModule,
                StatusModule, StayModule, UserRoleModule],
    exports: [ MasterDataComponent ],
    declarations: [ MasterDataComponent ]
})
export class MasterDataModule { }
