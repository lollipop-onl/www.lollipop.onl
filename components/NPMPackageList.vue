<template lang="pug">
  ul.npm-package-list
    NPMPackage.package(
      v-for="npmPackage in npmPackages"
      :npmPackage="npmPackage"
    )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import NPMPackage from '@/components/NPMPackage.vue';
import { INPMPackage } from '@/types/npm';

@Component({
  components: {
    NPMPackage,
  },
})
export default class NPMPackageList extends Vue {
  /** NPM Packages */
  @Prop({ type: Array, required: true })
  npmPackages!: Array<INPMPackage>;
}
</script>

<style lang="scss" scoped>
  .npm-package-list {
    & > .package:not(:first-child) {
      margin-top: 42px;
    }
  }
</style>
