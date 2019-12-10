<template lang="pug">
div
  .qiita-item-list
    QiitaItem.item(
      v-for="(item, i) in items"
      v-show="!isCollapsed || i < 5"
      :key="item.id"
      :item="item"
    )
  button.more-button(
    v-if="isCollapsed && items.length > 5"
    @click.prevent="isCollapsed = false"
  ) Show more items
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
      transition: opacity 0.3s ease;
      width: 100%;

      @media ($pc) {
        width: calc(#{100% / $columns-posts} - #{$gap-size * ($columns-posts - 1) / $columns-posts});
      }
    }

    & > .item:nth-child(-n + #{$columns-pickup}) {
      @media ($pc) {
        width: calc(#{100% / $columns-pickup} - #{$gap-size * ($columns-pickup - 1) / $columns-pickup});
      }
    }

    & > .item:not(:nth-child(-n + #{$columns-pickup})) {
      @media ($pc) {
        margin-top: $gap-size;
      }
    }

    & > .item:not(:first-child) {
      @media ($sp) {
        margin-top: $gap-size;
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
    border: 1px solid #ccc;
    font-size: 18px;
    margin: 32px 0 auto;
    padding: 8px 16px;
  }
</style>
