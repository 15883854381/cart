import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";

const routes = [
    // {
    //     path: "/",
    //     component: () => import("../views/list_Business.vue"),
    //     meta: { title: "商机列表" },
    // },
    {
        path: "/",
        component: () => import("../views/list_Business.vue"),
        meta: {title: "商机列表"},
    },
    {
        path: "/list_Business",
        component: () => import("../views/list_Business.vue"),
        meta: {title: "商机列表"},
    }, {
        path: "/user_data",
        component: () => import("../views/user_data.vue"),
        meta: {title: "个人中心"},

    }, {
        path: "/my_Business",
        component: () => import("../views/my_Business.vue"),
        meta: {title: "我的商机"},
    }, {
        path: "/deal_Business",
        component: () => import("../views/deal_Business.vue"),
        meta: {title: "成交案例"},
    }, {
        path: "/list_Business",
        component: () => import("../views/list_Business.vue"),
        meta: {title: "成交案例"},
    },
    {
        path: "/Individual",
        component: () => import("../views/Individual.vue"),
        meta: {title: "个人中心"},
    },
    {
        path: "/my_Clue",
        component: () => import("../views/my_Clue.vue"),
        meta: {title: "我的线索"},
    },
    {
        path: "/list_Business_Detail",
        component: () => import("../views/list_Business_Detail.vue"),
        meta: {title: "线索详情"},
        beforeEnter: (to, from) => {
            if (to.query?.id === undefined) {
                router.replace('/list_Business')
            }
            console.log(to, from)
            // return false
        },
    }, {
        path: "/up_Business",
        component: () => import("../views/userDataManage/up_Business.vue"),
        meta: {title: "上传线索"},
    }, {
        path: "/up_UserBrand",
        component: () => import("../components/up_userBrand.vue"),
        meta: {title: "汽车品牌"},
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({y: 0}),
    routes: routes,
});

//路由守卫
router.beforeEach((to, from, next) => {
    document.title = "汽车线索互助联盟-" + to.matched[0].meta.title;

    // if (!localStorage.getItem('token')) {
    //     localStorage.clear()
    // }
    //   const token = localStorage.getItem('stor')
    // const role = localStorage.getItem('ms_username');
    // NProgress.start(); //进度条
    //   if (to.path !== '/login' && !token) {
    //     console.log('1')
    //     next('/login');
    //   } else {
    //     console.log('2')
    //     if (to.name === 'Login' && token) {
    //       router.push('/')
    //     } else {
    //       next();
    //     }
    //   }
    next();
});

export default router;