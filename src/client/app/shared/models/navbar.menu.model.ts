import { MenuItem } from './menuitem.model';
export class NavBarMenu {
    constructor (
        public mainmenu:Array<MenuItem>,
        public usermenu:Array<MenuItem>
    ) {
        this.mainmenu = mainmenu;
        this.usermenu = usermenu;
    }
}
