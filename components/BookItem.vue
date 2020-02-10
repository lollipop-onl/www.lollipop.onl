<template lang="pug">
  nuxt-link.book-item(:to="`/book/${book.id}`")
    img.cover(:src="book.cover" alt="書籍カバー")
    .details
      .title
        span.marker {{ book.title }}
      .published 初出 {{ book.published }}
      .label-list.labels
        .label(v-if="book.flags.dlc") DLCアリ
        .label(v-if="book.flags.ebook") 電子書籍販売中
        .label(v-if="book.flags.book") 物理本販売中
      p.lead {{ book.lead }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { IBook } from '@/types/book';

@Component
export default class BookItem extends Vue {
  /** 書籍情報 */
  @Prop({ type: Object, required: true })
  book!: IBook;
}
</script>

<style lang="scss" scoped>
  .book-item {
    color: $_font-basic;
    display: flex;
    position: relative;
    text-decoration: none;

    @media ($sp) {
      flex-direction: column;
    }

    & > .cover {
      width: 240px;

      @media ($sp) {
        width: 100%;
      }

      @media ($pc) {
        transition:
          transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1),
          box-shadow 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
      }
    }

    & > .details {
      display: flex;
      flex-direction: column;
      justify-content: center;

      @media ($sp) {
        margin-top: 18px;
      }

      @media ($pc) {
        margin-left: 28px;
      }
    }

    & > .details > .title {
      font-size: $font-xl;
      line-height: 1.5;
    }

    & > .details > .title > .marker {
      background: linear-gradient(to left, rgba($_primary, 0.2), rgba($_primary, 0.2) 50%, transparent 50%) repeat-x 0 0.5em;
      background-size: 200% 0.8em;
      transition: background-position 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    & > .details > .published {
      font-size: $font-sm;
      margin-top: 12px;
    }

    & > .details > .labels {
      margin: 8px 0 20px;
    }

    & > .details > .lead {
      font-size: $font-md;
      line-height: 1.2;
    }

    &:hover > .cover {
      @media ($pc) {
        box-shadow:
          0 2.8px 2.2px rgba(0, 0, 0, 0.02),
          0 6.7px 5.3px rgba(0, 0, 0, 0.028),
          0 12.5px 10px rgba(0, 0, 0, 0.035),
          0 22.3px 17.9px rgba(0, 0, 0, 0.042),
          0 41.8px 33.4px rgba(0, 0, 0, 0.05),
          0 100px 80px rgba(0, 0, 0, 0.07);
        transform: scale3d(1.05, 1.05, 1.05);
      }
    }

    &:hover > .details > .title > .marker {
      @media ($pc) {
        background-position: -100% 0.5em;
      }
    }
  }

  .label-list {
    display: flex;

    & > .label {
      background: $_primary;
      font-size: $font-sm;
      line-height: 1.2;
      padding: 0 0.2em;
    }

    & > .label:not(:first-child) {
      margin-left: 8px;
    }
  }
</style>
