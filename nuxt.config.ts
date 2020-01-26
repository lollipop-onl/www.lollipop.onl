import { Configuration } from '@nuxt/types';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

const config: Configuration = {
  mode: 'universal',
  build: {
    extend(config) {
      config.module!.rules!.push({
        test: /\.ya?ml$/,
        use: 'js-yaml-loader',
      });
    },
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
  head: {
    title: 'www.lollipop.onl',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Welcome to simochee\'s portfolio!',
      },
    ],
    link: [
      { rel: 'stylesheet', href: '//lollipop-onl.github.io/webfonts.lollipop.onl/Ronde-B-Square.css' },
    ],
  },
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
    scss: ['@/assets/styles/vars.scss'],
  },
};

module.exports = config;
