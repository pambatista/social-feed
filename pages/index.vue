<template>
  <div class="container">
    <div class="image">
      <img src="~/assets/imagens/logo.svg" />
    </div>
    <nuxt-link to="/posts" class="button">Começar</nuxt-link>
    <p class="notification">Conheça a rede social mais feliz.</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component({
  name: "inicial"
})
export default class Inicial extends Vue {}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@300;400&display=swap");
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  padding: 32px;
  @media (min-width: 768px) {
    height: 70vh;
    justify-content: center;
  }
  & > .image {
    flex: 1;
    display: flex;
    width: 100%;
    justify-content: center;
  }
  & > .button {
    width: 100%;
    height: 52px;
    background: #f44336;
    box-shadow: 0px 15px 30px rgba(0, 102, 204, 0.16);
    border-radius: 16px;
    border: none;
    font-family: Archivo;
    font-weight: 600;
    font-size: 16px;
    line-height: 14px;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;

    &:hover {
      background: #ca382d;
    }
  }
  & > .notification {
    font-family: Archivo;
    font-size: 14px;
    line-height: 14px;
    color: #979797;
    text-align: center;
    margin-top: 16px;
  }
}
</style>
