import { Configuration } from '@nuxt/types';
import path from 'path';

const {
  QIITA_ACCESS_TOKEN = '',
} = process.env;
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
  env: {
    QIITA_ACCESS_TOKEN,
  },
  buildModules: ['@nuxt/typescript-build'],
  modules: ['@nuxtjs/axios'],
  plugins: [
    '@/plugins/libs/axios-logger',
    '@/plugins/libs/dayjs',
  ],
  css: ['reset.css'],
};

module.exports = config;
