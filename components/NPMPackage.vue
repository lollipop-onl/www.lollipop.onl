<template lang="pug">
  li.npm-package
    .header
      .name {{ npmPackage.package.name }}
      button.copy(@click="copyPackageName") > Copy
    .detail
      .version v{{ npmPackage.package.version }}
      .updated Last publish: {{ modifiedAt }}
      ExternalLink.link(:href="npmPackage.package.links.npm") Browse on npm
    .description(v-html="description")
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'nuxt-property-decorator';
import dayjs from 'dayjs';
import marked from 'marked';
import sanitizeHtml from 'sanitize-html';
import ExternalLink from '@/components/ExternalLink.vue';
import { INPMPackage } from '@/types/npm';

const renderer = new marked.Renderer();
renderer.link = (href, title, text) => {
  return `<a target="_blank" rel="noopener" href="${href}" title="${title}">${text}</a>`;
};

@Component({
  components: {
    ExternalLink
  },
})
export default class NPMPackage extends Vue {
  /** NPM Packages */
  @Prop({ type: Object, required: true })
  npmPackage!: INPMPackage;

  /** 更新日 */
  get modifiedAt(): string {
    const { date } = this.npmPackage.package;

    return dayjs().from(dayjs(date));
  }

  /** 説明文 */
  get description(): string {
    const { description } = this.npmPackage.package;

    return sanitizeHtml(marked(description, { renderer }));
  }

  /**
   * パッケージ名をコピーする
   */
  copyPackageName(): void {
    const { name } = this.npmPackage.package;
    const textAreaElement = document.createElement('textarea');
    textAreaElement.textContent = name;
    document.body.appendChild(textAreaElement);
    textAreaElement.select();
    document.execCommand('copy');
    document.body.removeChild(textAreaElement);
  }
}
</script>

<style lang="scss" scoped>
  .npm-package {
    display: grid;
    grid-template:
      'header header'         auto
      'detail description'  auto
      /180px  1fr;

    @media only screen and ($sp) {
      grid-template:
        'header'      auto
        'detail'      auto
        'description' auto
        /auto;
    }

    & > .header {
      border-bottom: 1px solid $_border;
      display: flex;
      grid-area: header;
      justify-content: space-between;
      margin-bottom: 18px;
      position: relative;
      width: 100%;
    }

    & > .header::before {
      background: $_npm;
      bottom: -1px;
      color: transparent;
      content: '@lollipop-onl';
      font-size: $font-lg;
      height: 1px;
      left: 0;
      overflow: hidden;
      position: absolute;
    }

    & > .header > .name {
      font-size: $font-lg;
      line-height: 1.8;
    }

    & > .header > .copy {
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: $font-md;
      margin: 0;
      padding: 0;
      text-align: center;
      width: 5em;

      @media only screen and ($sp) {
        display: none;
      }
    }

    & > .header > .copy::first-letter {
      color: $_npm;
    }

    & > .detail {
      grid-area: detail;
    }

    & > .detail > .version {
      font-size: $font-md;
    }

    & > .detail > .updated {
      font-size: $font-sm;
      margin-top: 6px;
      opacity: 0.7;
    }

    & > .detail > .link {
      color: $_npm;
      display: inline-block;
      font-size: $font-md;
      margin-top: 12px;
    }

    & > .detail > .link:hover {
      text-decoration: none;
    }

    & > .description {
      grid-area: description;
    }

    /* stylelint-disable-next-line rscss/no-descendant-combinator */
    & /deep/ .description {
      /* stylelint-disable rscss/no-descendant-combinator */
      p {
        color: #333;
        font-size: $font-md;
        line-height: 1.5;
      }

      code {
        background: #f7f7f7;
        border-radius: 4px;
        font-size: 0.9em;
        padding: 0.2em 0.5em;
      }

      a,
      a > code {
        color: $_npm;
      }

      a:hover {
        text-decoration: none;
      }
      /* stylelint-enable rscss/no-descendant-combinator */
    }
  }
</style>
