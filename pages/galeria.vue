<template>
  <div v-if="!isMounted" class="container">
    <Loading />
  </div>
  <div v-else class="container-gallery">
    <template v-for="photo in photos">
      <div @click="openPageImage(photo.id)" class="image" :key="photo.id">
        <img :src="photo.thumbnailUrl" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { Action, Getter } from "vuex-class";

// Components
import Loading from "~/components/Loading.vue";

@Component({
  name: "galeria",
  components: {
    Loading
  }
})
export default class Gallery extends Vue {
  @Getter("photos/getPhotos") photos: any;
  @Action("photos/listPhotos") listPhotos: any;

  isMounted = false;

  openPageImage(id: number) {
    this.$router.push(`/imagem/${id}`);
  }

  async mounted() {
    await this.listPhotos();
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
.container-gallery {
  width: 100%;
  margin: 75px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  @media (min-width: 768px) {
    width: 70%;
  }
  & > .image {
    width: 32%;
    margin-bottom: 2px;
    cursor: pointer;
    @media (min-width: 430px) {
      margin-bottom: 8px;
    }
    & > img {
      width: 100%;
    }
  }
}
</style>
