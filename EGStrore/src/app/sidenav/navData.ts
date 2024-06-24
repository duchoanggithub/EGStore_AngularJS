import { INavbarData } from "./helper";

export const navbarData: INavbarData[] =  [
    {
        routeLink: 'dashboard',
        icon: 'fal fa-home',
        label: 'Dashboard'
    },
    {
        routeLink: '',
        icon: 'fal fa-cube',
        label: 'Product',
        items: [
            {
                routeLink: 'product',
                label: 'Danh sách sản phẩm',
            },
            {
                routeLink: 'category',
                label: 'Các Loại sản phẩm',
            },
            // {
            //     routeLink: 'sanpham/lsdmnsp',
            //     label: 'Danh mục nhóm sản phẩm',
            //     items: [
            //         {
            //             routeLink: 'sanpham/doanvat',
            //             label: 'Đồ ăn vặt'
            //         },
            //         {
            //             routeLink: 'sanpham/nuocgk',
            //             label: 'Nước giải khát'
            //         }
            //     ]
            // }
        ]
    },
    {
        routeLink: 'user',
        icon: 'fal fa-user',
        label: 'User',
        // expanded: true,
        // items: [
        //     {
        //         routeLink: 'user/lsuser',
        //         label: 'Danh sách người dùng'
        //     },
            
        // ]
    },
    {
        routeLink: 'role',
        icon: 'fal fa-shield-halved',
        label: 'Quyền'
    },
    {
        routeLink: 'order',
        icon: 'fal fa-newspaper',
        label: 'Order'
    },
    {
        routeLink: 'delivery',
        icon: 'fal fa-truck',
        label: 'Delivery',
    },
    {
        routeLink: 'blog',
        icon: 'fal fa-blog',
        label: 'Blog',
    },
    {
        routeLink: 'supplier',
        icon: 'fal fa-handshake',
        label: 'Supplier'
    },

];
