import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {NavBarMenu, MenuItem, User } from '../../models/index';
/**
 * Navbarservice
 * Provide navigation menu options
 */
export class NavbarService {

    public navBarSubject:Subject<NavBarMenu>;

    private navbarMenu: NavBarMenu;
    private _defaultMenu:boolean = true;
    private _userMenu:boolean = false;

    constructor() {
        let mainmenu = [
            new MenuItem('home', 'Home',  ['/'], true),
            new MenuItem('about', 'About',  ['/about'], true),
            new MenuItem('login', 'Sign In',  ['/login'], true),
            new MenuItem('contracts', 'Contracts',  ['/contracts'], false, true),
            new MenuItem('signup', 'Sign Up',  ['/signup'], true),
            new MenuItem('master', 'Master Data', ['/master'], false, true, true, [
                new MenuItem('resourcetype','Resource Type', ['/'], true, true),
                new MenuItem('skill', 'Skill', ['/skill'], true, true),
                new MenuItem('businessline', 'Business Line', ['/businessline'], true, true),
                new MenuItem('role', 'Role', ['/role'], true, true),
                new MenuItem('grade', 'Grade', ['/grade'], true, true)
            ])
        ];

        let usermenu = [
            new MenuItem('settings', 'Settings', ['/settings'], false, true, true, [
                new MenuItem('resourcetype','Resource Type', ['/'], true, true),
                new MenuItem('skill', 'Skill', ['/skill'], true, true),
                new MenuItem('businessline', 'Business Line', ['/businessline'], true, true),
                new MenuItem('role', 'Role', ['/role'], true, true),
                new MenuItem('grade', 'Grade', ['/grade'], true, true)
            ]),
            new MenuItem('logout', 'Logout',  ['/logout'], false, true),
        ];

        this.navbarMenu = new NavBarMenu(mainmenu, usermenu);
        this.navBarSubject = new BehaviorSubject(this.navbarMenu);
    }

    public isDefaultMenu(): boolean {
        return this._defaultMenu;
    }

    public isUserMenu(): boolean {
        return this._userMenu;
    }

    public changeToUserMenu(user:User):void {
        console.log('User Menu');
        if (this.isDefaultMenu) {
            this.navbarMenu.mainmenu.forEach((element:MenuItem) => {
                element.expose = !element.expose;
            });

            //Add new user details as dropdown menu
            const userTitlemenu:MenuItem = new MenuItem('user', user.firstName+', '+user.lastName, [''], false, true, true, [
                new MenuItem('changepwd','Change Password', ['/'], true, true)
            ]);
            this.navbarMenu.usermenu.push(userTitlemenu);
            this.navbarMenu.usermenu.forEach( (element:MenuItem) => {
                    element.expose = !element.expose;
            });

            this.navBarSubject.next(this.navbarMenu);
            this._userMenu = true;
            this._defaultMenu=false;
        }
    }

    public changeToDefaultMenu():void {
        console.log('Default Menu');
        if(this.isUserMenu) {
            this.navbarMenu.mainmenu.forEach((element:MenuItem) => {
                element.expose = !element.expose;
            });

            this.navbarMenu.usermenu.forEach( (element:MenuItem) => {
                    element.expose = false;
            });

            this.navBarSubject.next(this.navbarMenu);
            this._defaultMenu=true;
            this._userMenu=false;
        }
    }

    public getNavbarMenu(): Subject<NavBarMenu> {
        return this.navBarSubject;
    }

}
