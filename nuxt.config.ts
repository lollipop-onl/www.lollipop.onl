import { Configuration } from '@nuxt/types';

const config: Configuration = {
  mode: 'universal',
  buildModules:['@nuxt/typescript-build'],
  modules: ['@nuxtjs/axios'],
  plugins: ['@/plugins/libs/axios-logger'],
  css: ['reset.css'],
};

module.exports = config;