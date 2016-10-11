import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BookHoursModule } from './book_hours/bookhours.module';
import { ContractsModule } from './contracts/contracts.module';
import { MasterDataModule } from './masterdata/masterdata.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { LogoutModule } from './logout/logout.module';
import { NavBarModule } from './navbar/index';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { APP_ROUTES, APP_PROVIDERS, APP_GUARD } from './app.routes';
import { Ng2Webstorage } from 'ng2-webstorage';

@NgModule({
  imports: [BrowserModule,  HttpModule, FormsModule, RouterModule.forRoot(APP_ROUTES),
            Ng2Webstorage,
            ContractsModule,
            BookHoursModule,
            MasterDataModule,
            RegisterModule,
            LogoutModule,
            LoginModule,
            NavBarModule],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  },
  ...APP_PROVIDERS,
  ...APP_GUARD
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
