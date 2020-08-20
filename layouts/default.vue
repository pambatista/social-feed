<template>
  <div class="page-default">
    <Header v-if="isDisable" :title="title" />
    <Nuxt />
    <Footer v-if="isDisable" :page="pageName" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";

@Component({
  name: "defaultPage"
})
export default class DefaultPage extends Vue {
  isDisable = true;
  pageName: String = "";
  title = "";

  // before mount component
  beforeMount(): void {
    if (this.$route.name === "index") {
      this.isDisable = false;
    }
    this.pageName = this.$route.name as String;
    this.title = this.pageName.charAt(0).toUpperCase() + this.pageName.slice(1);
  }

  // watch route
  @Watch("$route")
  onRouteChanged(): void {
    // remove header and footer
    if (this.$route.name === "index") {
      this.isDisable = false;
    } else {
      this.isDisable = true;
    }

    this.pageName = this.$route.name as String;

    // formate title for header
    if (
      this.pageName === "editar-imagem-id" ||
      this.pageName === "editar-publicação-id"
    ) {
      this.title = "Editar";
    } else if (this.pageName === "post-id") {
      this.title = "Post";
    } else if (this.pageName === "imagem-id") {
      this.title = "Imagem";
    } else {
      this.title =
        this.pageName.charAt(0).toUpperCase() + this.pageName.slice(1);
    }
  }
}
</script>

<style lang="scss">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

button {
  cursor: pointer;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.page-default {
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    justify-content: center;
    align-items: center;
  }
}

button {
  outline: none;
}
</style>
