import { defineConfig } from 'umi';

export default defineConfig({
  layout: {
    name: 'FSS集群管理',
    layout: 'side',
    navTheme: 'light',
  },
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  routes: [
    {
      path: '/',
      component: '@/pages/index',
    },
    {
      path: '/shareKey',
      component: '@/pages/shareKey',
      name: '分发密钥',
    },
    {
      path: '/addCluster',
      component: '@/pages/addCluster',
      name: '新增集群',
    },
    {
      path: '/expandCluster',
      component: '@/pages/expandCluster',
      name: '集群扩容',
    },
    {
      path: '/addDevice',
      component: '@/pages/addDevice',
      name: '添加磁盘',
    },
    {
      path: '/monitorConfig',
      component: '@/pages/monitorConfig',
      name: '监控配置管理',
    },
  ],
  fastRefresh: {},
});
