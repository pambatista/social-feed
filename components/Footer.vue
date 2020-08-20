<template>
  <div class="footer">
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
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import Home from "~/assets/imagens/home.svg?inline";
import Plus from "~/assets/imagens/plus.svg?inline";
import Gallery from "~/assets/imagens/gallery.svg?inline";

@Component({
  name: "Footer",
  components: {
    Home,
    Plus,
    Gallery
  }
})
export default class Header extends Vue {
  @Prop({ type: String }) page!: string;
}
</script>

<style lang="scss">
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #f9faf9;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #dadbda;
  @media (min-width: 768px) {
    display: none;
  }

  & > .buttons {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 0;
    height: 24px;
    background: transparent;
    border: none;
    outline: none;
    text-decoration: none;
    & > svg {
      stroke: #000;
    }
    & > .active {
      stroke: #f44336;
    }
  }
}
</style>
