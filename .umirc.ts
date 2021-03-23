import { defineConfig } from 'umi';

export default defineConfig({
  layout: {
    name: 'FSS_ClusterManager',
    layout: 'side',
  },
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
});
