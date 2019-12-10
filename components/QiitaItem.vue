<template lang="pug">
ExternalLink.qiita-item(:href="item.url")
  .thumbnail
    .skeleton
    img.image(:src="thumbnail")
    .likes(v-if="item.likes_count > 0") {{item.likes_count}} likes!
  .title {{item.title}}
  ul.tags
    li.tag(v-for="tag in item.tags") {{tag.name}}
  .updated {{updatedAt}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { defaultTo } from 'lodash-es';
import dayjs from 'dayjs';
import ExternalLink from "@/components/ExternalLink.vue";
import { IQiitaPostItem } from '@/types/qiita';

@Component({
  components: {
    ExternalLink,
  },
})
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
  .qiita-item {
    color: $_font-basic;
    display: grid;
    grid-template:
      'thumbnail  thumbnail'  auto
      'title      title'      auto
      'tags      updated'    auto
      /1fr        auto;
    text-decoration: none;

    & > .thumbnail {
      grid-area: thumbnail;
      position: relative;
      width: 100%;
    }

    & > .thumbnail > .skeleton {
      width: 100%;
    }

    & > .thumbnail > .skeleton::before {
      content: '';
      display: block;
      padding-top: 50%;
    }

    & > .thumbnail > .image {
      display: block;
      height: 100%;
      left: 0;
      object-fit: cover;
      position: absolute;
      top: 0;
      width: 100%;
    }

    & > .thumbnail > .likes {
      bottom: 0;
      position: absolute;
      right: 0;
    }

    & > .title {
      font-size: 16px;
      grid-area: title;
      line-height: 1.5;
      margin: 8px 0 4px;
    }

    & > .tags {
      align-items: flex-start;
      display: flex;
      flex-wrap: wrap;
      grid-area: tags;
      overflow: hidden;
    }

    & > .tags > .tag {
      background: #ccc;
      border-radius: 2px;
      box-sizing: border-box;
      font-size: 11px;
      line-height: 18px;
      margin: 4px 4px 0 0;
      overflow: hidden;
      padding: 0 8px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    & > .updated {
      grid-area: updated;
      line-height: 18px;
      margin-top: 4px;
    }
  }
</style>
