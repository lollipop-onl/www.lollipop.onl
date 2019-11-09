import { Plugin } from '@nuxt/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const plugin: Plugin = (): void => {
  dayjs.extend(relativeTime);
};

export default plugin;
