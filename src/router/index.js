import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    components: {
      header: () => import('@/components/AppHeader'),
      navigation: () => import('@/components/AppNavigation'),
      default: () => import('@/views/dashboard'),
    },
    meta: {
      title: 'Dashboard - Admin',
      isRequiresAuth: true,
    },
  },
  {
    path: '/department',
    components: {
      header: () => import('@/components/AppHeader'),
      navigation: () => import('@/components/AppNavigation'),
      default: () => import('@/views/department'),
    },
    meta: {
      title: 'Quản lý khoa/viện',
      isRequiresAuth: true,
    },
  },
  {
    path: '/sector',
    components: {
      header: () => import('@/components/AppHeader'),
      navigation: () => import('@/components/AppNavigation'),
      default: () => import('@/views/sector'),
    },
    meta: {
      title: 'Quản lý ngành đào tạo',
      isRequiresAuth: true,
    },
  },
  {
    path: '/teacher',
    components: {
      header: () => import('@/components/AppHeader'),
      navigation: () => import('@/components/AppNavigation'),
      default: () => import('@/views/teacher'),
    },
    meta: {
      title: 'Quản lý giảng viên',
      isRequiresAuth: true,
    },
  },
  {
    path: '/student',
    components: {
      header: () => import('@/components/AppHeader'),
      navigation: () => import('@/components/AppNavigation'),
      default: () => import('@/views/student'),
    },
    meta: {
      title: 'Quản lý sinh viên',
      isRequiresAuth: true,
    },
  },
  {
    path: '/subject',
    components: {
      header: () => import('@/components/AppHeader'),
      navigation: () => import('@/components/AppNavigation'),
      default: () => import('@/views/subject'),
    },
    meta: {
      title: 'Quản lý môn học',
      isRequiresAuth: true,
    },
  },
  {
    path: '/thesis',
    components: {
      header: () => import('@/components/AppHeader'),
      navigation: () => import('@/components/AppNavigation'),
      default: () => import('@/views/thesis'),
    },
    meta: {
      title: 'Quản lý đồ án',
      isRequiresAuth: true,
    },
  },
  {
    path: '/admin',
    components: {
      header: () => import('@/components/AppHeader'),
      navigation: () => import('@/components/AppNavigation'),
      default: () => import('@/views/admin'),
    },
    meta: {
      title: 'Quản lý đồ án',
      isRequiresAuth: true,
    },
  },
  {
    path: '/login',
    components: {
      default: () => import('@/views/login'),
    },
    meta: {
      title: 'Đăng nhập - Admin',
      isRequiresAuth: false,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (to.meta.isRequiresAuth) {
    if (!localStorage.getItem('token')) {
      return next('/login');
    }
    return next();
  }
  return next();
});

export default router;
