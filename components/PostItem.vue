<template>
  <div class="content-post" @click="open">
    <div class="post-header">
      <div class="header-info">
        <img src="~/assets/imagens/photo.jpg" class="image" />
      </div>
      <button v-if="hasComments" @click="$emit('openModal')">
        <Menu />
      </button>
    </div>
    <h4>{{ post.title }}</h4>
    <p>{{ post.body }}</p>
    <div class="container-comments">
      <div :class="['content-comments', hasComments ? 'active' : '']">
        <p v-if="hasComments">{{ comments.length }} comentários</p>
        <Comments />
      </div>
      <div v-if="hasComments" class="comments">
        <template v-for="comment in comments">
          <div class="comment" :key="comment.id">
            <h4>{{ comment.name }}</h4>
            <p>
              {{ comment.body }}
            </p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

// Components
import Menu from "~/assets/imagens/menu-vertical.svg?inline";
import Comments from "~/assets/imagens/comments.svg?inline";

@Component({
  name: "post-item",
  components: {
    Menu,
    Comments
  }
})
export default class PostItem extends Vue {
  @Prop({ type: Boolean }) hasComments!: string;
  @Prop({ type: Object }) post!: object;
  @Prop({ type: Array }) comments!: Array<String>;

  open() {
    const { id }: any = this.post;
    this.$router.push(`/post/${id}`);
  }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@300;400&display=swap");
.content-post {
  width: 90%;
  box-shadow: 0px 2px 20px rgba(131, 91, 221, 0.15);
  background: #ffffff;
  border-radius: 20px;
  padding: 24px;
  margin: 12px;
  cursor: pointer;

  & > .post-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    & > .header-info {
      display: flex;
      align-items: center;

      & > .image {
        width: 40px;
        border-radius: 50%;
        margin-right: 16px;
      }
    }
    & > button {
      background: none;
      border: none;
    }
  }

  & > h4 {
    font-family: Archivo;
    font-weight: 600;
    font-size: 16px;
    line-height: 124.03%;
    color: #262626;
    margin-bottom: 12px;
  }

  & > p {
    font-family: Archivo;
    font-size: 18px;
    line-height: 22px;

    color: #262626;
  }

  & > .container-comments {
    & > .content-comments {
      display: flex;
      align-content: center;
      justify-content: flex-end;
      margin-top: 24px;

      & > p {
        font-family: Roboto;
        font-size: 14px;
        line-height: 14px;
        display: flex;
        align-items: center;
        margin-right: 16px;
        color: #9597a1;
      }
    }
    & > .active {
      & > svg {
        & > path {
          stroke: #f44336;
        }
      }
    }
    & > .comments {
      & > .comment {
        font-family: Roboto;
        padding: 12px 0;
        border-bottom: 1px solid #9597a1;
        & > h4 {
          font-weight: bold;
          font-size: 14px;
          line-height: 16px;
          margin-bottom: 12px;
        }
        & > p {
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
