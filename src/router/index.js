import {createRouter, createWebHashHistory, createWebHistory} from "vue-router";
import {loginVerify} from "@/api/utils";

const routes = [
    // {
    //     path: "/",
    //     component: () => import("../views/list_Business.vue"),
    //     meta: { title: "商机列表" },
    // },
    {
        path: "/",
        component: () => import("../views/list_Business.vue"),
        meta: {title: "线索列表"},
    },
    {
        path: "/list_Business",
        component: () => import("../views/list_Business.vue"),
        meta: {title: "线索列表"},
    }, {
        path: "/user_data",
        component: () => import("../views/user_data.vue"),
        meta: {title: "个人中心"},

    }, {
        path: "/my_Business",
        component: () => import("../views/my_Business.vue"),
        meta: {title: "我的线索"},
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
        meta: {title: "我的订单"},
    },
    {
        path: "/list_Business_Detail",
        component: () => import("../views/list_Business_Detail.vue"),
        meta: {title: "线索详情"},
        beforeEnter: (to) => {
            if (to.query?.clue_id === undefined || to.query?.type === undefined) {
                router.replace('/list_Business')
            }
        },
    }, {
        path: "/up_Business",
        component: () => import("../views/userDataManage/up_Business.vue"),
        meta: {title: "上传线索"},
    }, {
        path: "/up_UserBrand",
        component: () => import("../components/up_userBrand.vue"),
        meta: {title: "汽车品牌"},
    }, {
        path: "/UpOrder",
        component: () => import("../views/UpOrder.vue"),
        meta: {title: "我的线索"},
    }, {
        path: "/test",
        component: () => import("../views/test.vue"),
        meta: {title: "我的线索"},
    }, {
        path: "/payment",
        component: () => import("../views/payment.vue"),
        meta: {title: "支付界面"},
    }, {
        path: "/Ordernotes",
        component: () => import("../components/Ordernotes.vue"),
        meta: {title: "申诉备注"},
    }, {
        path: "/success_content",
        component: () => import("../views/success_content.vue"),
        meta: {title: "案例详情"},
    }, {
        path: "/customer",
        component: () => import("../views/customer.vue"),
        meta: {title: "联系客服"},
    }, {
        path: "/upUserInfo",
        component: () => import("../views/userDataManage/upUserInfo.vue"),
        meta: {title: "上传审核信息"},
    }, {
        path: "/share",
        component: () => import("../views/share.vue"),
        meta: {title: "我的分享"},
    }, {
        path: "/shareUserList",
        component: () => import("../views/shareUserList.vue"),
        meta: {title: "用户上传的线索"},
    }, {
        path: "/income",
        component: () => import("../views/income.vue"),
        meta: {title: "累计收益"},
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({y: 0}),
    routes: routes,
});

//路由守卫
router.beforeEach(async (to, from, next) => {

    document.title = "汽车线索助手联盟-" + to.matched[0].meta.title;


    if (window._hmt) {
        if (to.path) {
            window._hmt.push(['_trackPageview', '/#' + to.fullPath])
        }
    }

    next();
    // /up_Business
    // my_Clue UpOrder


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

});

export default router;