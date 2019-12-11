<template lang="pug">
ExternalLink.qiita-item(
  v-on="$listeners"
  :href="item.url"
)
  .thumbnail
    .skeleton
    img.image(:src="thumbnail")
  .detail
    ul.tags
      li.tag(v-for="tag in item.tags") {{tag.name}}
    .likes(v-if="item.likes_count > 0") {{item.likes_count}}
  .title {{item.title}}
  .updated {{updatedAt}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { defaultTo } from 'lodash-es';
import dayjs from 'dayjs';
import ExternalLink from '@/components/ExternalLink.vue';
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

    return defaultTo(matches && matches[1], '//placehold.jp/320x320.png');
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
      'thumbnail' auto
      'detail'    0
      'title'     1fr
      'updated'   auto
      /auto;
    text-decoration: none;

    & > .thumbnail {
      grid-area: thumbnail;
      overflow: hidden;
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

    & > .detail {
      align-items: center;
      align-self: end;
      display: flex;
      flex-wrap: nowrap;
      grid-area: detail;
      justify-content: space-between;
      overflow: hidden;
      position: relative;
      width: 100%;
    }

    & > .detail > .likes {
      background: rgba(#4bb20c, 0.9);
      box-sizing: border-box;
      color: #fff;
      flex-shrink: 0;
      font-size: 14px;
      height: 20px;
      line-height: 20px;
      padding: 0 1em;
    }

    & > .detail > .likes::after {
      content: 'likes';
      font-size: 10px;
      margin-left: 0.5em;
    }

    & > .detail > .tags {
      align-items: center;
      box-sizing: border-box;
      display: flex;
      flex-grow: 1;
      flex-wrap: wrap;
      height: 20px;
      padding-left: 2px;
    }

    & > .detail > .tags > .tag {
      background: rgba(#ccc, 0.8);
      border-radius: 4px;
      box-shadow: 0 2px 5px -2px rgba(#000, 0.4);
      box-sizing: border-box;
      font-size: 11px;
      line-height: 18px;
      margin: 0 4px 10px 0;
      padding: 0 8px;
    }

    & > .title {
      font-size: 16px;
      grid-area: title;
      line-height: 1.5;
      margin: 8px 0 4px;
    }

    & > .updated {
      font-size: 12px;
      grid-area: updated;
      line-height: 18px;
      margin-top: 4px;
      opacity: 0.8;
      text-align: right;
    }
  }
</style>
