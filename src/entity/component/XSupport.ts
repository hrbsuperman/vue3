export class XRouter {
    name?: string;
    component: any;
}
export class XSelectItem{
    text:string = '';
    value:string = '';
}
export class XMenuItem {
    label: string = '';
    name: string = '';
    path?: string = '';
    icon?: string = '';
    display?: boolean = false;
    displayAnimation?: boolean = false;

    maxHeight?: number = 0;
    parent?: XMenuItem;
    children?: Array<XMenuItem>
}

export class XPageTab {
    name: string = '';
    label: string = '';
    icon?: string = '';
    active: boolean = false;
    component?: any = null;
}
