<template lang="pug">
div
  h1 www.lollipop.onl
  p version: {{version}}
  p(v-if="publishedAt") Last published at {{publishedAt}}
  h2 Qiita posts
  QiitaItemList(:items="qiitaItems")
  h2 NPM Packages
  ul
    li(
      v-for="npmPackage in npmPackages"
      v-if="npmPackage.package.version > '0.1'"
    )
      a(
        :href="npmPackage.package.links.npm"
        target="_blank"
        rel="noopener"
      ) {{npmPackage.package.name}} (v{{npmPackage.package.version}})
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

  /** npmのPackage */
  npmPackages: Array<any> = [];

  /** パッケージバージョン */
  get version() {
    return version;
  }

  /** ライフサイクル */
  async asyncData({ $axios }: Context): Promise<any> {
    const { QIITA_ACCESS_TOKEN } = process.env;

    let qiitaItems: any[] = []; 

    try {
      qiitaItems = await $axios.$get<Array<IQiitaPostItem>>('https://qiita.com/api/v2/users/simochee/items', {
        headers: {
          Authorization: `Bearer ${QIITA_ACCESS_TOKEN}`,
        },
      });
    } catch (err) {}

    let npmPackages = [];

    try {
      const { objects } = await $axios.$get('https://registry.npmjs.org/-/v1/search', {
        params: {
          text: 'author:lollipop.onl',
        },
      });

      npmPackages = objects;
  
      console.log(npmPackages);
    } catch (err) {}

    return {
      qiitaItems,
      npmPackages,
      publishedAt: dayjs().add(9, 'h')
        .format('YYYY/MM/DD'),
    };
  }
}
</script>

<style lang="scss" scoped>
div {
  color: #000;
  font-size: 12px;
}

img {
  max-width: 100%;
  max-height: 120px;
}
</style>
