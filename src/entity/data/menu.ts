import type {XMenuItem} from "@/entity/system/XSupport";


const xMenuData: XMenuItem[] =
    [
        {
            label: '工作台',
            name: 'home',
            icon: 'icon-all',
        }, {
        label: '客户管理',
        name: 'customer',
        icon: 'icon-Customermanagement',
        children: []
    },
        {
            label: '系统设置',
            name: 'home',
            icon: 'icon-set',
            children: [
                {
                    name: 'home',
                    label: '菜单管理',
                },
                {

                    name: 'home',
                    label: '多级菜单',
                    children: [{
                        name: 'home', label: '多多级菜单'
                    }]
                },
                {
                    name: 'home', label: '多级菜单1'
                },
                {
                    name: 'home', label: '多级菜单1'
                },
                {
                    name: 'home', label: '多级菜单1'
                },
                {
                    name: 'home', label: '多级菜单1'
                },
                {
                    name: 'home', label: '多级菜单1'
                }
            ]
        }, {
        name: 'home', label: 'test'
    }

    ]
export default xMenuData
