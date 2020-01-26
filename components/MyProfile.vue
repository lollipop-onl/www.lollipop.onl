<template lang="pug">
  .my-profile
    img.avatar(
      src="@/assets/images/avatar.jpg"
      :alt="profile.displayName"
    )
    .name {{profile.displayName}}
    .fullname {{profile.fullName}}
    .socials
      ExternalLink.social(
        :href="twitterUrl"
        :data-name="profile.twitter"
      )
        img.icon(
          src="@/assets/images/twitter-favicon.svg"
          :alt="profile.twitter"
        )
      ExternalLink.social(
        :href="qiitaUrl"
        :data-name="profile.qiita"
      )
        img.icon(
          src="@/assets/images/qiita-favicon.svg"
          :alt="profile.qiita"
        )
      ExternalLink.social(
        :href="githubUrl"
        :data-name="profile.github"
      )
        img.icon(
          src="@/assets/images/github-favicon.svg"
          :alt="profile.github"
        )
      ExternalLink.social(
        :href="npmUrl"
        :data-name="profile.npm"
      )
        img.icon(
          src="@/assets/images/npm-favicon.svg"
          :alt="profile.npm"
        )
    p.description(v-html="description")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import marked from 'marked';
import sanitizeHtml from 'sanitize-html';
import ExternalLink from '@/components/ExternalLink.vue';
import profile from '@/assets/data/profile.yml';

@Component({
  components: {
    ExternalLink,
  },
})
export default class MyProfile extends Vue {
  /** プロフィール情報 */
  @Prop({ type: Object, required: true })
  profile!: typeof profile;

  /** TwitterアカウントURL */
  get twitterUrl() {
    return `https://twitter.com/${this.profile.twitter}`;
  }

  /** QiitaアカウントURL */
  get qiitaUrl() {
    return `https://qiita.com/${this.profile.qiita}`;
  }

  /** GitHubアカウントURL */
  get githubUrl() {
    return `https://github.com/${this.profile.github}`;
  }

  /** npmアカウントURL */
  get npmUrl() {
    return `https://npmjs.com/~${this.profile.npm}`;
  }

  /** 紹介文 */
  get description() {
    return sanitizeHtml(marked(this.profile.description));
  }
}
</script>

<style lang="scss" scoped>
  .my-profile {
    & > .avatar {
      display: block;
      margin: 0 auto;
      width: 60%;

      @media ($sp) {
        width: 40%;
      }
    }

    & > .name {
      font-size: $font-lg;
      margin-top: 24px;
      text-align: center;
    }

    & > .fullname {
      font-size: $font-sm;
      margin-top: 5px;
      opacity: 0.7;
      text-align: center;
    }

    & > .socials {
      align-items: center;
      display: flex;
      justify-content: center;
      margin-top: 16px;

      @media ($sp) {
        flex-direction: column;
        justify-content: flex-start;
      }
    }

    & > .socials > .social {
      align-items: center;
      display: flex;
      font-size: $font-sm;
      position: relative;
      text-decoration: none;
    }

    & > .socials > .social:not(:first-child) {
      @media ($pc) {
        margin-left: 6px;
      }

      @media ($sp) {
        margin-top: 6px;
      }
    }

    & > .socials > .social::after {
      @media ($sp) {
        content: attr(data-name);
        margin-left: 0.3em;
      }
    }

    & > .socials > .social > .icon {
      display: block;
      height: 20px;
      margin-right: 4px;
      object-fit: contain;
      width: 20px;
    }

    & > .description {
      margin-top: 24px;
    }

    // stylelint-disable-next-line rscss/no-descendant-combinator
    & > .description /deep/ p {
      font-size: $font-sm;
      line-height: 1.5;
      margin-top: 0.5em;
      text-align: center;
      white-space: pre-wrap;
    }
  }
</style>
