import { Plugin } from '@nuxt/types';
import AxiosLogger from '@lollipop-onl/axios-logger';

const plugin: Plugin = ({ $axios, isServer, isDev }): void => {
  const logger = new AxiosLogger({
    isServer,
    quiet: !isDev,
  });

  $axios.onResponse(logger.log);
  $axios.onResponseError(logger.log);
};

export default plugin;