<template lang="pug">
.qiita-item-list
  QiitaItem.item(
    v-for="item in items"
    :key="item.id"
    :item="item"
  )
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
  /** Qiitaのポストリスト */
  @Prop({ type: Array, required: true })
  readonly items!: Array<IQiitaPostItem>;
}
</script>

<style lang="scss" scoped>
  $columns-pickup: 3;
  $columns-posts: 4;
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
</style>
