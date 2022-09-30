export class XRouter {
    name?: string;
    component: any;
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
    children?: XMenuItem[]
}

export class XPageTab {
    label: string = '';
    icon?: string = '';
    active: boolean = false;
    component?: any = null;
}
