<template lang="pug">
div
  template(v-for="item in items")
    QiitaItem(:item="item")
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
</style>
