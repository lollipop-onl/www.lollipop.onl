<template lang="pug">
img(:src="thumnbnail")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { defaultTo } from 'lodash-es';
import { IQiitaPostItem } from '@/types/qiita';

@Component
export default class QiitaItem extends Vue {
  /** Qiitaのポスト */
  @Prop({ type: Object, required: true })
  readonly item!: IQiitaPostItem;

  /** サムネイル */
  get thumnbnail(): string {
    const { body = '' } = this.item;
    const matches = /!\[.+\]\((.+)\)/.exec(body);

    return defaultTo(matches && matches[1], 'https://placehold.jp/320x320.png');
  }
}
</script>

<style lang="scss" scoped>
</style>
