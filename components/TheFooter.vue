<template lang="pug">
  footer.the-footer
    .fugu
      img.avatar(src="@/assets/images/avatar-fugu.png")
      .bubbles
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class TheFooter extends Vue {
}
</script>

<style lang="scss" scoped>
  @keyframes floating {
    0% {
      transform: translate3d(0, 0, 0);
    }

    100% {
      transform: translate3d(0, -10px, 0);
    }
  }

  @keyframes bubble {
    0% {
      opacity: 0;
    }

    10% {
      opacity: 1;
    }

    30% {
      opacity: 1;
    }

    40% {
      opacity: 0;
    }

    100% {
      opacity: 0;
    }
  }

  .the-footer {
    background: #47494e;
    height: 1000px;
    width: 100%;

    & > .fugu {
      animation: floating 6s cubic-bezier(0.165, 0.84, 0.44, 1) infinite alternate;
      filter: drop-shadow(0 0 1px #000);
      height: 120px;
      margin: 0 auto;
      position: relative;
      width: 120px;
    }

    & > .fugu > .avatar {
      height: 120px;
      object-fit: contain;
      width: 120px;
    }

    & > .fugu > .bubbles,
    & > .fugu > .bubbles::before,
    & > .fugu > .bubbles::after {
      background: #fff;
      border: 2px solid #000;
      border-radius: 50%;
      position: absolute;
    }

    & > .fugu > .bubbles::before,
    & > .fugu > .bubbles::after {
      content: '';
      display: block;
    }

    & > .fugu > .bubbles {
      animation: bubble 2s 0s ease infinite;
      height: 4px;
      right: -5px;
      top: 40px;
      width: 5px;
    }

    & > .fugu > .bubbles::before {
      animation: bubble 2s 0.2s ease infinite;
      height: 6px;
      right: -10px;
      top: -14px;
      width: 7px;
    }

    & > .fugu > .bubbles::after {
      animation: bubble 2s 0.4s ease infinite;
      height: 9px;
      right: -16px;
      top: -30px;
      width: 10px;
    }
  }
</style>
