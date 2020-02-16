<template lang="pug">
  .page-container
    p.message
      | 遷移しています
      span.dots
        span.dot .
        span.dot .
        span.dot .
</template>

<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator';
import aliases from '@/assets/data/aliases.yml';

@Component
export default class AliasPage extends Vue {
  /** ライフサイクル */
  beforeMount() {
    const { path } = this.$route;
    const alias = path.replace(/^\/|\/$/g, '');

    location.href = aliases[alias];
  }
}
</script>

<style lang="scss" scoped>
  @keyframes hopping {
    0% {
      transform: translateY(0);
    }

    15% {
      transform: translateY(-10px);
    }

    30% {
      transform: translateY(0);
    }
  }

  .page-container {
    align-items: center;
    display: flex;
    font-size: $font-lg;
    height: 50vh;
    justify-content: center;
    width: 100%;

    & > .message {
      display: flex;
    }

    & > .message > .dots {
      display: flex;
      letter-spacing: 0.5em;
      margin-left: 0.5em;
    }

    & > .message > .dots > .dot {
      display: block;
    }

    & > .message > .dots > .dot:nth-child(1) {
      animation: hopping 1s ease infinite;
    }

    & > .message > .dots > .dot:nth-child(2) {
      animation: hopping 1s 0.25s ease infinite;
    }

    & > .message > .dots > .dot:nth-child(3) {
      animation: hopping 1s 0.5s ease infinite;
    }
  }
</style>
