import { Component, OnInit } from '@angular/core';
import { SessionStorage, SessionStorageService} from 'ng2-webstorage';

import { User, NavBarMenu } from '../shared/models/index';

import { NavbarService } from '../shared/services/navbar/navbar.service';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public navMenu:NavBarMenu;

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
              this.navbarService.changeToUserMenu(newValue);
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
