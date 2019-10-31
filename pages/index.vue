<template lang="pug">
div
  pre version: {{version}}
  pre {{qiitaItems}}
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Component, Vue } from 'nuxt-property-decorator';
import { version } from '@@/package.json';
import { IQiitaPostItem } from '@/types/qiita';
import { ClassMembers } from '@/types/utils';

@Component
export default class IndexPage extends Vue {
  /** Qiitaのポスト */
  qiitaItems: IQiitaPostItem[] = [];

  /** パッケージバージョン */
  get version() {
    return version;
  }

  /** ライフサイクル */
  async asyncData({ $axios }: Context): Promise<any> {
    const qiitaItems = await $axios.$get<IQiitaPostItem[]>('https://qiita.com/api/v2/users/simochee/items', {
      params: {
        per_page: 4,
      },
    });
    
    return { qiitaItems };
  }
}
</script>

<style lang="sass" scoped>
</style>
