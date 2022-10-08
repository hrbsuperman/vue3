import type {XMenuItem} from "@/entity/component/XSupport";


const xMenuData: Array<XMenuItem> =
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
                    label: '菜单管理'
                },
                {

                    name: 'home',
                    label: '多级菜单',
                    children: [{
                        name: 'home', label: '多多级菜单',
                        children:[{
                            name: 'home', label: '多级菜单111'
                        }]
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
        name: 'Example', label: 'Example',
        icon: 'icon-yemian',
        children: [
            {
                name: 'Form',
                label: '表单'
            },
            {
                name: 'Table',
                label: '表格'
            },
            {
                name: 'Dialog',
                label: 'Dialog'
            }
            ,
            {
                name: '',
                label: '异常页面',
                children: [{
                    name: '403',
                    label: '403'
                },{
                    name: '404',
                    label: '404'
                },{
                    name: '500',
                    label: '500'
                }]
            }

        ]
    }, {
        name: 'Test',
        label: 'Test'
    }]
export default xMenuData
