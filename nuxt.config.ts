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
  modules: ['@nuxtjs/axios'],
  plugins: ['@/plugins/libs/axios-logger'],
  css: ['reset.css'],
};

module.exports = config;
