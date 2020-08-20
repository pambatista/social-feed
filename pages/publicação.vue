<template>
  <div v-if="!isMounted" class="container">
    <Loading />
  </div>
  <div v-else class="container-publication">
    <div class="content-publication">
      <h4>O que deseja fazer?</h4>
      <div class="section">
        <p>Postar um texto</p>
        <button @click="text = !text" class="btn-arrow">
          <Arrow />
        </button>
      </div>
      <form v-if="text">
        <input v-model="title" type="text" placeholder="Titulo" />
        <textarea
          v-model="body"
          placeholder="O que você está pensando?"
        ></textarea>
        <button @click="submit" type="button">Publicar</button>
      </form>
      <div class="line" />
      <div class="section">
        <p>Postar uma imagem</p>
        <button @click="image = !image" class="btn-arrow">
          <Arrow />
        </button>
      </div>
      <form v-if="image">
        <input v-model="link" type="text" placeholder="link da imagem" />
        <input v-model="imageTitle" type="text" placeholder="titulo" />
        <button @click="submitPhoto" type="button">
          Publicar
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { Action } from "vuex-class";

// Components
import Loading from "~/components/Loading.vue";
import Arrow from "~/assets/imagens/arrow.svg?inline";

@Component({
  name: "publication",
  components: {
    Loading,
    Arrow
  }
})
export default class Publication extends Vue {
  @Action("posts/postPost") submitPost: any;
  @Action("photos/postPhoto") submitImage: any;

  isMounted = false;
  text = false;
  image = false;
  title = "";
  body = "";
  link = "";
  imageTitle = "";

  async submit() {
    this.isMounted = false;
    const data = {
      title: this.title,
      body: this.body,
      userId: 1
    };

    this.submitPost(data);

    this.isMounted = true;
    this.title = "";
    this.body = "";

    this.$router.push("/posts");
  }

  async submitPhoto() {
    this.isMounted = false;

    const data = {
      albumId: 1,
      title: this.imageTitle,
      url: this.link,
      thumbnailUrl: this.link
    };

    await this.submitImage(data);

    this.isMounted = true;

    this.$router.push("/galeria");
  }

  mounted() {
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
  @media (min-width: 768px) {
    width: 50%;
  }
  & > .content-publication {
    width: 90%;
    box-shadow: 0px 2px 20px rgba(131, 91, 221, 0.15);
    background: #ffffff;
    border-radius: 20px;
    padding: 24px;
    margin: 12px;
    display: flex;
    flex-direction: column;

    & > h4 {
      font-family: Poppins;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 25px;
      color: #1466cc;
      text-align: center;
      padding: 24px;
    }
    & > .line {
      border: 0.75px solid #f2f2f2;
    }
    & > .section {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 18px 0;
      & > .btn-arrow {
        background: none;
        border: none;
      }

      & > p {
        flex: 1;
        text-align: center;
        font-family: Archivo;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        color: #262626;
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
