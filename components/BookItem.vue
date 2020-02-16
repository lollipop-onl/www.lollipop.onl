<template lang="pug">
.book-item
    img.cover(:src="book.cover" alt="書籍カバー")
    .details
      .title {{ book.title }}
      .subtitle(v-if="book.subtitle") {{ book.subtitle }}
      .published 初出: {{ book.published }}
      p.lead {{ book.lead }}
      .external-links.links
        ExternalLink.link(:href="book.dlcUrl") ダウンロードコンテンツ
        ExternalLink.link(:href="book.boothBookUrl") 物理本 BOOTH販売ページ
        ExternalLink.link(:href="book.boothDownloadUrl") PDF本 BOOTH販売ページ
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import ExternalLink from '@/components/ExternalLink.vue';
import { IBook } from '@/types/book';

@Component({
  components: {ExternalLink}
})
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
        margin: 0 auto;
        width: 60%;
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

    & > .details > .subtitle {
      font-size: $font-sm;
    }

    & > .details > .published {
      border-bottom: 1px solid $_font-basic;
      font-size: $font-sm;
      margin-top: 12px;
      width: 60%;
    }

    & > .details > .labels {
      margin: 8px 0 20px;
    }

    & > .details > .lead {
      font-size: $font-md;
      line-height: 1.2;
      margin-top: 18px;
    }

    & > .details > .links {
      margin-top: 20px;
    }
  }

  .external-links {
    & > .link {
      color: $_primary;
      display: table;
      font-size: $font-md;
      line-height: 1.5;
      padding-left: 24px;
      position: relative;
    }

    & > .link:hover {
      text-decoration: none;
    }

    & > .link:not(:first-child) {
      margin-top: 8px;
    }

    & > .link::before {
      background: rgba($_font-basic, 0.5);
      content: '';
      display: block;
      height: 2px;
      left: 8px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
    }
  }
</style>
