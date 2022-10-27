export class XRouter {
    name?: string;
    component: any;
}
export class XTableColumn{
    label:string = "";
    bind:string = "";
    width:any = 0;
    fixed:string = "";//使用时不需要设置
}
export class XTableOption{
    columns:Array<XTableColumn> = [];
}
export class XDatePickerDay {
    date: number = 0;
    month: number = 0;
    year: number = 0;
    today: boolean = false;
    selected: boolean = false;
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
