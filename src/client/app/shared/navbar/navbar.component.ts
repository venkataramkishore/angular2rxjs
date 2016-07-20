import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { SessionStorage, SessionStorageService} from 'ng2-webstorage';

import { User } from '../models/index';

import { NavbarService } from '../services/navbar/navbar.service';
/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class NavbarComponent implements OnInit {

  public navMenu:{};

    @SessionStorage('user')
    public user:User;

  constructor (private navbarService: NavbarService,
                public storage:SessionStorageService) {
    //TODO::
  }

  ngOnInit(): void {

     this.storage.observe('user')
        .subscribe((newValue:User) => {
            console.log(newValue);
            if(newValue) {
              this.navbarService.changeToUserMenu();
            }else {
              this.navbarService.changeToDefaultMenu();
            }
        });

    this.navbarService.getNavbarMenu().subscribe(
      (navMenu)=> {
        this.navMenu = navMenu;
      }
    );
  }

}
