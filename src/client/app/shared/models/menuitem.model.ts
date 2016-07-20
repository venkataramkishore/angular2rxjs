/**
 * @param key - represents the unique if menu item
 * @param name - represents the name of menu item
 * @param link - represents the router link with string array as expected by routerLink by angular 2 router module
 * @param auth - authentication is required? expected to use in guard on router configured
 * @param expose - expose route to front-end?
 * @param dropdown - menu item is dropdown? 
 * @param dropdownItems - expected dropdown to be true in order to pass menu items
 * 
 */
export class MenuItem {

    constructor (
        public key:string,
        public name:string,
        public link:Array<string>,
        public expose:boolean,
        public auth:boolean= false,
        public dropdown:boolean= false,
        public dropdownItems:Array<MenuItem>=null
    ) {
        this.key = key;
        this.name = name;
        this.link = link;
        this.auth = auth;
        this.expose = expose;
        this.dropdown = dropdown;
        this.dropdownItems = dropdownItems;
    }
}
