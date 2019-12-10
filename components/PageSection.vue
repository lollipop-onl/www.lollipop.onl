<template lang="pug">
  section.page-section
    .header
      slot(name="icon")
      h2.title {{title}}
    .content
      slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class PageSection extends Vue {
  /** タイトル */
  @Prop({ type: String, required: true })
  title!: string;

  /** アイコンファイルパス */
  @Prop({ type: String })
  iconFilePath?: string;
}
</script>

<style lang="scss" scoped>
  .page-section {
    & > .header {
      align-items: center;
      background: #fff;
      display: flex;
      position: sticky;
      top: 0;
      z-index: 1;
    }

    & > .header > .icon {
      height: 48px;
      object-fit: contain;
      width: 48px;
    }

    & > .header > .title {
      font-size: 16px;
      margin-left: 12px;
    }

    & > .content {
      margin-top: 24px;
    }
  }
</style>
