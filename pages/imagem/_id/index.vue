<template>
  <div v-if="!isMounted" class="container">
    <Loading />
  </div>
  <div v-else class="container-image">
    <div class="image-header">
      <button @click="handleModal">
        <Menu />
      </button>
    </div>
    <div class="image">
      <img :src="photo.url" />
    </div>
    <p>{{ photo.title }}</p>
    <Modal
      v-if="hasModal"
      @closeModal="handleModal"
      @delete="deletePhoto"
      @update="editPhoto"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { Action, Getter } from "vuex-class";

// Components
import Menu from "~/assets/imagens/menu-vertical.svg?inline";
import Modal from "~/components/Modal.vue";
import Loading from "~/components/Loading.vue";

@Component({
  name: "image",
  components: {
    Menu,
    Modal,
    Loading
  }
})
export default class Image extends Vue {
  @Getter("photos/getPhoto") photo: any;
  @Action("photos/getPhoto") getPhoto: any;
  @Action("photos/deletePhoto") delete: any;

  hasModal = false;
  isMounted = false;

  async deletePhoto() {
    const { id } = this.$route.params;
    await this.delete(id);
    this.$router.push("/galeria");
  }

  editPhoto() {
    const { id } = this.$route.params;
    this.$router.push(`/editar-imagem/${id}`);
  }

  handleModal() {
    this.hasModal = !this.hasModal;
  }

  async mounted() {
    const { id } = this.$route.params;
    await this.getPhoto(id);
    this.isMounted = true;
  }
}
</script>

<style lang="scss" scoped>
.container-image {
  width: 100%;
  margin: 60px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (min-width: 768px) {
    width: 70%;
  }
  & > .image-header {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 14px 0;
    & > button {
      border: none;
      background: none;
    }
  }
  & > .image {
    width: 100%;

    & > img {
      width: 100%;
      height: 60vh;
      @media (min-width: 768px) {
        height: 70vh;
      }
    }
  }

  & > p {
    font-family: Archivo;
    font-size: 18px;
    line-height: 22px;
    color: #262626;
    padding: 8px;
  }
}
</style>
