<template lang="pug">
div
  p version: {{version}}
  p(v-if="publishedAt") Last published at {{publishedAt}}
  QiitaItemList(:items="qiitaItems")
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Component, Vue } from 'nuxt-property-decorator';
import dayjs from 'dayjs';
import QiitaItemList from '@/components/QiitaItemList.vue';
import { version } from '@@/package.json';
import { IQiitaPostItem } from '@/types/qiita';

@Component({
  components: {
    QiitaItemList,
  },
})
export default class IndexPage extends Vue {
  /** 最終更新時のタイムスタンプ */
  publishedAt?: dayjs.Dayjs;

  /** Qiitaのポスト */
  qiitaItems: Array<IQiitaPostItem> = [];

  /** パッケージバージョン */
  get version() {
    return version;
  }

  /** ライフサイクル */
  async asyncData({ $axios }: Context): Promise<any> {
    const { QIITA_ACCESS_TOKEN } = process.env;

    const qiitaItems = await $axios.$get<Array<IQiitaPostItem>>('https://qiita.com/api/v2/users/simochee/items', {
      headers: {
        Authorization: `Bearer ${QIITA_ACCESS_TOKEN}`,
      },
    });

    return {
      qiitaItems,
      publishedAt: dayjs().add(9, 'h').format('YYYY/MM/DD'),
    };
  }
}
</script>

<style lang="scss" scoped>
div {
  color: #000;
  font-size: 12px;
  position: absolute;
}
</style>
