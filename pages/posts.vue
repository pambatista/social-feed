<template>
  <div v-if="!isMounted" class="container">
    <Loading />
  </div>
  <div v-else class="container-posts">
    <template v-for="post in posts">
      <PostItem :post="post" :key="post.id" />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { Action, Getter } from "vuex-class";

// Components
import PostItem from "~/components/PostItem.vue";
import Loading from "~/components/Loading.vue";

@Component({
  name: "posts",
  components: {
    PostItem,
    Loading
  }
})
export default class Posts extends Vue {
  @Getter("posts/getPosts") posts: any;
  @Action("posts/listPosts") listPosts: any;

  isMounted = false;

  async mounted() {
    await this.listPosts();
    this.isMounted = true;
  }
}
</script>

<style lang="scss" scoped>
.container-posts {
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
