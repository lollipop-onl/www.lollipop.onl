<template lang="pug">
  .my-profile
    img.avatar(
      :src="profile.profile_image_url"
      :alt="profile.name"
    )
    .name {{profile.name}}
    ExternalLink.social(
      v-if="profile.twitter_screen_name"
      :href="twitterUrl"
    )
      img.icon(src="@/assets/images/twitter-favicon.svg" alt="")
      | {{profile.twitter_screen_name}}
    ExternalLink.social(
      v-if="profile.github_login_name"
      :href="githubUrl"
    )
      img.icon(src="@/assets/images/github-favicon.svg" alt="")
      | {{profile.github_login_name}}
    p.description {{profile.description}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import ExternalLink from "@/components/ExternalLink.vue";
import {IQiitaPostItem} from "@/types/qiita";

@Component({
  components: {
    ExternalLink,
  },
})
export default class MyProfile extends Vue {
  /** プロフィール情報 */
  @Prop({ type: Object, required: true })
  profile!: IQiitaPostItem['user'];

  /** TwitterアカウントURL */
  get twitterUrl() {
    return `https://twitter.com/${this.profile.twitter_screen_name}`;
  }

  /** GitHubアカウントURL */
  get githubUrl() {
    return `https://github.com/${this.profile.github_login_name}`;
  }
}
</script>

<style lang="scss" scoped>
  .my-profile {
    & > .avatar {}

    & > .name {}

    & > .social {
      align-items: center;
      display: flex;
      font-size: 14px;
      text-decoration: none;
    }

    & > .social > .icon {
      display: block;
      height: 20px;
      margin-right: 4px;
      object-fit: contain;
      width: 18px;
    }
  }
</style>
