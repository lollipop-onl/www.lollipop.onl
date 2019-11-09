<template lang="pug">
a(
  :href="item.url"
  target="_blank"
  rel="noopener"
)
  img.thumbnail(:src="thumbnail")
  .title {{item.title}}
  .likes
    template(v-if="item.likes_count > 0") {{item.likes_count}} likes!
    template(v-else) no likes
  ul.tags
    li.tag(v-for="tag in item.tags") {{tag.name}}
  .updated {{updatedAt}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { defaultTo } from 'lodash-es';
import dayjs from 'dayjs';
import { IQiitaPostItem } from '@/types/qiita';

@Component
export default class QiitaItem extends Vue {
  /** Qiitaのポスト */
  @Prop({ type: Object, required: true })
  readonly item!: IQiitaPostItem;

  /** サムネイル */
  get thumbnail(): string {
    const { body = '' } = this.item;
    const matches = /!\[.+\]\((.+)\)/.exec(body);

    return defaultTo(matches && matches[1], 'https://placehold.jp/320x320.png');
  }

  /** 更新日 */
  get updatedAt(): string {
    // eslint-disable-next-line @typescript-eslint/camelcase
    const { created_at } = this.item;

    return dayjs().from(dayjs(created_at), true);
  }
}
</script>

<style lang="scss" scoped>
</style>
