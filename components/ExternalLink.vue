<template lang="pug">
  a(
    v-bind="$attrs"
    v-on="$listeners"
    target="_blank"
    rel="noopener"
  )
    slot
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class ExternalLink extends Vue {}
</script>

<style lang="sass" scoped></style>
