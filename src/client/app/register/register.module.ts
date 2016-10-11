import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RegisterComponent }   from './register.component';

@NgModule({
    imports: [ReactiveFormsModule, CommonModule, RouterModule ],
    exports: [RegisterComponent],
    declarations: [RegisterComponent]
})
export class RegisterModule { }
