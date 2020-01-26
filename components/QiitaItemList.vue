<template lang="pug">
div
  .qiita-item-list
    QiitaItem.item(
      v-for="(item, i) in items"
      v-show="!isCollapsed || i < 5"
      :key="item.id"
      :item="item"
      :class="{ '-inactive': activeItemId && activeItemId !== item.id }"
      @mouseenter="activeItemId = item.id"
      @mouseleave="activeItemId = null"
    )
  button.more-button(
    v-if="isCollapsed && items.length > 5"
    @click.prevent="isCollapsed = false"
  ) SHOW MORE POSTS
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import QiitaItem from '@/components/QiitaItem.vue';
import { IQiitaPostItem } from '@/types/qiita';

@Component({
  components: {
    QiitaItem,
  },
})
export default class QiitaItemList extends Vue {
  /** すべてのポストを表示するかどうか */
  isCollapsed = true;

  /** アクティブな記事ID */
  activeItemId: string | null = null;

  /** Qiitaのポストリスト */
  @Prop({ type: Array, required: true })
  readonly items!: Array<IQiitaPostItem>;
}
</script>

<style lang="scss" scoped>
  $columns-pickup: 2;
  $columns-posts: 3;
  $gap-size: 15px;

  .qiita-item-list {
    display: flex;
    flex-wrap: wrap;

    & > .item {
      transition: opacity 0.12s ease;
      width: 100%;

      @media ($pc) {
        width: calc(#{100% / $columns-posts} - #{$gap-size * ($columns-posts - 1) / $columns-posts});
      }
    }

    & > .item.-inactive {
      opacity: 0.5;
    }

    & > .item:nth-child(-n + #{$columns-pickup}) {
      @media ($pc) {
        width: calc(#{100% / $columns-pickup} - #{$gap-size * ($columns-pickup - 1) / $columns-pickup});
      }
    }

    & > .item:not(:nth-child(-n + #{$columns-pickup})) {
      @media ($pc) {
        margin-top: $gap-size * 1.5;
      }
    }

    & > .item:not(:first-child) {
      @media ($sp) {
        margin-top: $gap-size * 1.5;
      }
    }

    & > .item:not(:nth-child(#{$columns-posts}n + #{$columns-pickup})) {
      @media ($pc) {
        margin-right: $gap-size;
      }
    }
  }

  .more-button {
    appearance: none;
    background: transparent;
    border: 1px solid #4bb20c;
    border-radius: 4px;
    color: #4bb20c;
    cursor: pointer;
    display: block;
    font-size: $font-sm;
    margin: 32px auto 0;
    padding: 0.5em 1.5em;
    transition: background 0.12s ease;

    &:hover {
      background: rgba(#4bb20c, 0.1);
    }
  }
</style>
