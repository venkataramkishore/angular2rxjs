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
            //new MenuItem('home', 'Home',  ['/'], true),
            //new MenuItem('about', 'About',  ['/about'], true),
            new MenuItem('login', 'Sign In',  ['/login'], true),
            new MenuItem('contracts', 'Contracts',  ['/contracts'], false, true),
            new MenuItem('signup', 'Sign Up',  ['/signup'], true),
            new MenuItem('master', 'Master Data', ['/master'], false, true, true, [
                new MenuItem('resourcetypes','Resource Type', ['/resourcetypes'], true, true),
                new MenuItem('skills', 'Skill', ['/skills'], true, true),
                new MenuItem('blines', 'Business Line', ['/blines'], true, true),
                new MenuItem('roles', 'Role', ['/roles'], true, true),
                new MenuItem('grades', 'Grade', ['/grades'], true, true),
                new MenuItem('bands', 'Band', ['/bands'], true, true),
                new MenuItem('stayTypes', 'Stay Type', ['/stayTypes'], true, true),
                new MenuItem('userroles', 'User Role', ['/userroles'], true, true),
                new MenuItem('onshoreprices', 'Onshore Price', ['/onshoreprices'], true, true),
                new MenuItem('offshoreprices', 'Offshore Price', ['/offshoreprices'], true, true)
            ])
        ];

        let usermenu:MenuItem[] = [];

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
        console.log('User Menu :: isDefaultMenu =>' + this.isDefaultMenu());
        if (this.isDefaultMenu()) {
            this.navbarMenu.mainmenu.forEach((element:MenuItem) => {
                element.expose = !element.expose;
            });

            //Add new user details as dropdown menu
            //const userIcon = `<span class="glyphicon glyphicon-user">${user.firstName}, ${user.lastName}</span>`;
            const userIcon = `${user.firstName}, ${user.lastName}`;
            const userTitlemenu:MenuItem = new MenuItem('user', userIcon, [''], true, true, true, [
                new MenuItem('changepwd','Change Password', ['/'], true, true),
                new MenuItem('logout', 'Logout',  ['/logout'], true, true)
            ]);
            this.navbarMenu.usermenu.push(userTitlemenu);

            this.navBarSubject.next(this.navbarMenu);
            this._userMenu = true;
            this._defaultMenu=false;
        }
    }

    public changeToDefaultMenu():void {
        console.log('Default Menu:: isUserMenu => ' +this.isUserMenu());
        if(this.isUserMenu()) {
            this.navbarMenu.mainmenu.forEach((element:MenuItem) => {
                element.expose = !element.expose;
            });
            this.navbarMenu.usermenu= [];
            this.navBarSubject.next(this.navbarMenu);
            this._defaultMenu=true;
            this._userMenu=false;
        }
    }

    public getNavbarMenu(): Subject<NavBarMenu> {
        return this.navBarSubject;
    }
}
