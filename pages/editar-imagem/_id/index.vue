<template>
  <div v-if="!isMounted" class="container">
    <Loading />
  </div>
  <div v-else class="container-publication">
    <div class="content-publication">
      <div class="section">
        <p>Editar imagem</p>
      </div>
      <form>
        <input v-model="link" type="text" placeholder="link da imagem" />
        <input v-model="imageTitle" type="text" placeholder="titulo" />
        <button @click="updatePhoto" type="button">
          Atualizar
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { Action, Getter } from "vuex-class";

// Components
import Loading from "~/components/Loading.vue";

@Component({
  name: "edit-publication",
  components: {
    Loading
  }
})
export default class EditPublication extends Vue {
  @Getter("photos/getPhoto") photo: any;
  @Action("photos/getPhoto") getPhoto: any;
  @Action("photos/updatePhoto") update: any;

  isMounted = false;
  link = "";
  imageTitle = "";

  async updatePhoto() {
    const data = {
      albumId: 1,
      title: this.imageTitle,
      url: this.link,
      thumbnailUrl: this.link,
      id: this.photo.id
    };
    await this.update(data);
    this.$router.push(`/imagem/${this.photo.id}`);
  }

  async mounted() {
    const { id } = this.$route.params;
    await this.getPhoto(id);
    this.imageTitle = this.photo.title;
    this.link = this.photo.url;
    this.isMounted = true;
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container-publication {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 75px 0;
  & > .content-publication {
    width: 90%;
    box-shadow: 0px 2px 20px rgba(131, 91, 221, 0.15);
    background: #ffffff;
    border-radius: 20px;
    padding: 24px;
    margin: 12px;
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
      width: 50%;
    }
    & > .section {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 18px 0;

      & > p {
        font-family: Poppins;
        font-weight: 500;
        font-size: 22px;
        line-height: 33px;
        color: #979797;
        text-align: center;
      }
    }

    & > form {
      margin-bottom: 18px;
      display: flex;
      flex-direction: column;
      @media (min-width: 768px) {
        align-items: flex-end;
      }
      & > input,
      textarea {
        width: 100%;
        height: 56px;
        background: rgba(0, 0, 0, 0.03);
        border: none;
        padding: 8px;
        border-radius: 14px;
        margin-bottom: 16px;
        font-family: Poppins;
        font-size: 14px;
        line-height: 14px;
        outline: none;
      }

      & > textarea {
        padding: 12px;
        height: 135px;
      }

      & > button {
        background: #f44336;
        border-radius: 16px;
        border: none;
        height: 56px;
        font-family: Poppins;
        font-weight: 600;
        font-size: 14px;
        line-height: 14px;
        color: #ffffff;
        cursor: pointer;

        &:hover {
          background: #ca382d;
        }
        @media (min-width: 768px) {
          width: 30%;
        }
      }
    }
  }
}
</style>
