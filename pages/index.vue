<template lang="pug">
div
  .main-content
    .side(v-if="profile")
      MyProfile.profile(:profile="profile")
    .main
      PageSection.section(title="Qiita feeds")
        template(v-slot:icon)
          img.icon(src="@/assets/images/qiita-favicon.svg" alt="")
        QiitaItemList(:items="qiitaItems")
      PageSection.section(title="NPM Packages")
        template(v-slot:icon)
          img.icon(src="@/assets/images/npm-favicon.svg" alt="")
        NPMPackageList(:npmPackages="npmPackages")
      PageSection.section(title="Publications")
  TheFooter
</template>

<script lang="ts">
import { Context } from '@nuxt/types';
import { Component, On, Vue } from 'nuxt-property-decorator';
import dayjs from 'dayjs';
import PageSection from '@/components/PageSection.vue';
import QiitaItemList from '@/components/QiitaItemList.vue';
import MyProfile from '@/components/MyProfile.vue';
import TheFooter from '@/components/TheFooter.vue';
import NPMPackageList from '@/components/NPMPackageList.vue';
import profile from '@/assets/data/profile.json';
import { version } from '@@/package.json';
import { IQiitaPostItem } from '@/types/qiita';
import { INPMPackage } from "@/types/npm";
import EmitMixin from "@/mixins/Emit";

@Component({
  components: {
    PageSection,
    QiitaItemList,
    NPMPackageList,
    MyProfile,
    TheFooter,
  },
  mixins: [EmitMixin],
})
export default class IndexPage extends Vue {
  /** 最終更新時のタイムスタンプ */
  publishedAt?: dayjs.Dayjs;

  /** Qiitaのポスト */
  qiitaItems: Array<IQiitaPostItem> = [];

  /** npmのPackage */
  npmPackages: Array<INPMPackage> = [];

  /** パッケージバージョン */
  get version() {
    return version;
  }

  /** プロフィール */
  get profile() {
    return profile;
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

      npmPackages = objects.filter((npmPackage: INPMPackage) => (
        !npmPackage.package.version.startsWith('0.0')
      ));
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

  @On('test')
  onTest(arg: any) {
    console.log('happen', arg);
  }
}
</script>

<style lang="scss" scoped>
  .main-content {
    box-sizing: border-box;
    display: grid;
    grid-template:
      'side' auto
      'main' auto
      /auto;
    margin: 0 auto 56px;
    max-width: 1220px;
    padding: 0 20px;
    width: 100%;

    @media ($pc) {
      grid-template:
        'side main' auto
        /auto 1fr;
    }

    & > .side {
      grid-area: side;
      padding: 32px 0;

      @media ($pc) {
        margin-right: 24px;
      }

      @media ($sp) {
        margin-bottom: 24px;
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

    & > .main > .section:not(:last-child) {
      margin-bottom: 48px;
    }
  }
</style>
