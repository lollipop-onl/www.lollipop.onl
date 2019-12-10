import { Configuration } from '@nuxt/types';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

const config: Configuration = {
  mode: 'universal',
  build: {
    loaders: {
      scss: {
        sassOptions: {
          includePaths: [
            path.resolve(__dirname, 'assets/styles'),
          ],
        },
      },
    },
    transpile: ['lodash-es'],
    extractCSS: isProduction,
    optimization: {
      minimize: isProduction,
    },
  },
  buildModules: ['@nuxt/typescript-build'],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
  ],
  plugins: [
    '@/plugins/libs/axios-logger',
    '@/plugins/libs/dayjs',
  ],
  css: [
    'reset.css',
    '@/assets/styles/main.scss',
  ],
  styleResources: {
    scss: ['@/assets/styles/vars/*.scss'],
  },
};

module.exports = config;
