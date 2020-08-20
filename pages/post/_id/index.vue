<template>
  <div v-if="!isMounted" class="container">
    <Loading />
  </div>
  <div v-else class="container-post">
    <post-item
      hasComments
      :post="post"
      :comments="comments"
      @openModal="handleModal"
    />
    <Modal
      v-if="hasModal"
      @closeModal="handleModal"
      @delete="deletePost"
      @update="editPost"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { Action, Getter, State } from "vuex-class";

// Components
import PostItem from "~/components/PostItem.vue";
import Modal from "~/components/Modal.vue";
import Loading from "~/components/Loading.vue";

@Component({
  name: "post",
  components: {
    PostItem,
    Modal,
    Loading
  }
})
export default class Post extends Vue {
  @State("posts") posts: any;
  @Action("posts/getPost") getPost: any;
  @Action("posts/getComments") getComments: any;
  @Action("posts/deletePost") delete: any;

  hasModal = false;
  isMounted = false;
  comments = [];
  post = {};

  deletePost() {
    const { id }: any = this.post;
    this.delete(id);
    this.$router.push("/posts");
  }

  editPost() {
    const { id }: any = this.post;
    this.$router.push(`/editar-publicação/${id}`);
  }

  handleModal() {
    this.hasModal = !this.hasModal;
  }

  async mounted() {
    const { id } = this.$route.params;
    await this.getPost(id);
    await this.getComments(id);
    this.comments = this.posts.comments;
    this.post = this.posts.post;
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
.container-post {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 75px 0;
  @media (min-width: 768px) {
    width: 50%;
  }
}
</style>
