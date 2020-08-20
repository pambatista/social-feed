<template>
  <div class="container-modal">
    <div class="mask" />
    <div class="content-modal">
      <div v-if="initial" class="card card-initial">
        <div class="close">
          <button @click="close()">
            <Close />
          </button>
        </div>
        <button @click="$emit('update')">
          Editar
        </button>
        <div class="line" />
        <button @click="remove()">
          Excluir
        </button>
      </div>
      <div v-if="!initial" class="card card-delete">
        <div class="close">
          <button @click="close()">
            <Close />
          </button>
        </div>
        <p>Excluir essa publicação?</p>
        <div class="line" />
        <button @click="$emit('delete')" class="btn-delete">
          Excluir
        </button>
        <div class="line" />
        <button @click="close()">
          Não excluir
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop } from "nuxt-property-decorator";
import Close from "~/assets/imagens/close.svg?inline";

@Component({
  name: "Modal",
  components: {
    Close
  }
})
export default class Modal extends Vue {
  initial = true;

  remove() {
    this.initial = false;
  }

  close() {
    this.$emit("closeModal");
  }
}
</script>

<style lang="scss" scoped>
.container-modal {
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;

  & > .mask {
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(black, 0.25);
    z-index: 20;
  }
  & > .content-modal {
    width: 100%;
    padding: 40px;
    margin: 0;
    z-index: 30;
    position: fixed;
    @media (min-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    & > .card {
      width: 100%;
      padding: 18px;
      border-radius: 20px;
      background: #262626;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      @media (min-width: 768px) {
        width: 50%;
      }
      & > .close {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        & > button {
          border: none;
          background: none;
        }
      }
      & > button {
        border: none;
        background: none;
        padding: 16px 0;
        font-family: Poppins;
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        color: #979797;
        &:hover {
          color: #fff;
        }
      }

      & > .line {
        width: 100%;
        height: 2px;
        background: #9597a1;
        opacity: 0.2;
        border-radius: 10px;
      }
    }
    & > .card-delete {
      & > p {
        color: #f9faf9;
        padding: 16px 0;
      }
      & > .btn-delete {
        color: #1466cc;
        font-weight: 500;
        font-size: 20px;
        & :hover {
          color: #3183e7;
        }
      }
    }
  }
}
</style>
