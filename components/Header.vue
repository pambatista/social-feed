<template>
  <div :class="['header', hasPrev ? 'hasPrev' : '']">
    <div class="button-prev">
      <button v-if="hasPrev" @click="handlePrev()">
        <Arrow />
        <p>Voltar</p>
      </button>
    </div>
    <h3>{{ title }}</h3>
    <div class="header-menu">
      <nuxt-link to="/posts" class="buttons">
        <Home :class="page == 'posts' && 'active'" />
      </nuxt-link>

      <nuxt-link to="/publicação" class="buttons">
        <Plus :class="page == 'publicação' && 'active'" />
      </nuxt-link>

      <nuxt-link to="/galeria" class="buttons">
        <Gallery :class="page == 'galeria' && 'active'" />
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
import Arrow from "~/assets/imagens/left-arrow.svg?inline";
import Home from "~/assets/imagens/home.svg?inline";
import Plus from "~/assets/imagens/plus.svg?inline";
import Gallery from "~/assets/imagens/gallery.svg?inline";

@Component({
  name: "Header",
  components: {
    Arrow,
    Home,
    Plus,
    Gallery
  }
})
export default class Header extends Vue {
  @Prop({ type: String }) title!: string;
  @Prop({ type: String }) page!: string;

  hasPrev = false;

  handlePrev() {
    const pageName = this.$route.name;
    const { id } = this.$route.params;
    if (pageName === "post-id") {
      this.$router.push("/posts");
    } else if (pageName === "imagem-id") {
      this.$router.push("/galeria");
    } else if (pageName === "editar-imagem-id") {
      this.$router.push(`/imagem/${id}`);
    } else if (pageName === "editar-publicação-id") {
      this.$router.push(`/post/${id}`);
    }
  }

  handleHasPagePrev() {
    const pageName = this.$route.name;
    if (
      pageName === "post-id" ||
      pageName === "imagem-id" ||
      pageName === "editar-imagem-id" ||
      pageName === "editar-publicação-id"
    ) {
      this.hasPrev = true;
    } else {
      this.hasPrev = false;
    }
  }

  @Watch("$route")
  onRouteChanged(): void {
    this.handleHasPagePrev();
  }

  mounted() {
    this.handleHasPagePrev();
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@300;400&display=swap");

.header {
  position: fixed;
  top: 0;
  height: 60px;
  width: 100%;
  background: #f9faf9;
  border-bottom: 1px solid #dadbda;
  display: grid;
  grid-template-columns: 20% 60% 20%;
  grid-template-areas: "back title icons";

  & > h3 {
    font-family: Archivo;
    font-weight: 600;
    font-size: 22px;
    display: flex;
    align-items: center;
    grid-area: title;

    @media (min-width: 768px) {
      align-items: center;
      justify-content: center;
    }
  }
}

.hasPrev {
  & > .button-prev {
    /* padding: 0 8%; */
    grid-area: back;
    display: flex;
    align-items: center;
    justify-content: center;
    & > button {
      background: none;
      border: none;
      @media (min-width: 786px) {
        display: flex;
        align-items: center;
      }
      & > p {
        display: none;
        @media (min-width: 786px) {
          display: inline-block;
          font-weight: 700;
        }
      }
    }
  }
}
.header-menu {
  display: none;
  grid-area: icons;
  @media (min-width: 786px) {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  & > .buttons {
    & svg {
      stroke: #000;
    }
  }
}
</style>
