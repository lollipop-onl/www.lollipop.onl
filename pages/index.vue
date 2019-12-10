<template lang="pug">
.page-layout
  .side(v-if="profile")
    MyProfile.profile(:profile="profile")
  .main
    PageSection.section(title="Qiita posts")
      template(v-slot:icon)
        img.icon(src="@/assets/images/qiita-favicon.svg" alt="")
      QiitaItemList(:items="qiitaItems")
    PageSection.section(title="NPM Packages")
      template(v-slot:icon)
        img.icon(src="@/assets/images/npm-favicon.svg" alt="")
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
import PageSection from "@/components/PageSection.vue";
import QiitaItemList from '@/components/QiitaItemList.vue';
import MyProfile from "@/components/MyProfile.vue";
import { version } from '@@/package.json';
import { IQiitaPostItem } from '@/types/qiita';

@Component({
  components: {
    PageSection,
    QiitaItemList,
    MyProfile,
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

  /** プロフィール */
  get profile(): IQiitaPostItem['user'] | void {
    const item = this.qiitaItems.find((item) => item.user.id === 'simochee');

    return item && item.user;
  }

  /** ライフサイクル */
  async asyncData({ $axios }: Context): Promise<any> {
    const { QIITA_ACCESS_TOKEN } = process.env;

    let qiitaItems: Array<any> = [];

    try {
      qiitaItems = await $axios.$get<Array<IQiitaPostItem>>('https://qiita.com/api/v2/users/simochee/items', {
        headers: {
          Authorization: `Bearer ${QIITA_ACCESS_TOKEN}`,
        },
      });
    } catch (err) {
      // do nothing
    }

    let npmPackages = [];

    try {
      const { objects } = await $axios.$get('https://registry.npmjs.org/-/v1/search', {
        params: {
          text: 'author:lollipop.onl',
        },
      });

      npmPackages = objects;
    } catch (err) {
      // do nothing
    }

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
  .page-layout {
    display: grid;
    grid-template:
      'side' auto
      'main' auto
      /auto;

    @media ($pc) {
      grid-template:
        'side main' auto
        /auto 1fr;
    }

    & > .side {
      grid-area: side;

      @media ($pc) {
        margin-right: 24px;
      }
    }

    & > .side > .profile {
      @media ($pc) {
        position: sticky;
        top: 0;
        width: 280px;
      }
    }

    & > .main {
      grid-area: main;
    }

    & > .main > .section {
      margin-bottom: 48px;
    }
  }
</style>
