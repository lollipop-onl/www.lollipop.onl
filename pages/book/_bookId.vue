<template lang="pug">
  p {{ book.title }}
</template>

<script lang="ts">
import {Context} from "@nuxt/types";
import { Component, Vue } from 'nuxt-property-decorator';
import {IBook} from "@/types/book";
import books from '@/assets/data/books.yml';

@Component
export default class BookPage extends Vue {
  get book(): IBook {
    const { bookId } = this.$route.params;

    return books.find((book: IBook) => book.id === bookId);
  }

  /** Lifecycle hook */
  validate({ route }: Context): boolean {
    const { bookId } = route.params;

    return books.some((book: IBook) => book.id === bookId);
  }
}
</script>

<style lang="scss" scoped>
</style>
