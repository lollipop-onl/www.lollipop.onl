<template lang="pug">
  ul.book-item-list
    li.item(
      v-for="book in books"
      :key="book.id"
    )
      BookItem(:book="book")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import BookItem from "@/components/BookItem.vue";
import { IBook } from '@/types/book';

@Component({
  components: {
    BookItem,
  },
})
export default class BookItemList extends Vue {
  /** 書籍情報 */
  @Prop({ type: Array, required: true })
  books!: Array<IBook>;
}
</script>

<style lang="scss" scoped>
  .book-item-list {
    & > .item:not(:first-child) {
      margin-top: 48px;
    }
  }
</style>
