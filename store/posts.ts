import axios from "axios";

export const state = () => ({
  posts: [],
  post: {},
  comments: [],
  error: "",
  success: ""
});

export const getters = {
  getPosts(state) {
    return state.posts;
  }
};

export const mutations = {
  GET_POSTS(state, payload) {
    state.posts = payload;
  },
  GET_POST(state, payload) {
    state.post = payload;
  },
  GET_COMMENTS(state, payload) {
    state.comments = payload;
  },
  SUCCESS(state, payload) {
    state.success = payload;
  },
  ERROR(state, payload) {
    state.success = payload;
  }
};

export const actions = {
  // list posts
  async listPosts({ commit }) {
    await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(res => {
        commit("GET_POSTS", res.data);
      })
      .catch(error => {
        commit(
          "ERROR",
          "Ocorreu um erro no sistema, tente novamente mais tarde!"
        );
      });
  },

  // take one post
  async getPost({ commit }, postId) {
    await axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(res => {
        commit("GET_POST", res.data);
      })
      .catch(error => {
        commit(
          "ERROR",
          "Ocorreu um erro no sistema, tente novamente mais tarde!"
        );
      });
  },
  // get comments
  async getComments({ commit }, postId) {
    await axios
      .get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then(res => {
        commit("GET_COMMENTS", res.data);
      })
      .catch(error => {
        commit(
          "ERROR",
          "Ocorreu um erro no sistema, tente novamente mais tarde!"
        );
      });
  },
  // insert post
  async postPost({ commit }, data) {
    await axios
      .post("https://jsonplaceholder.typicode.com/posts", data)
      .then(res => {
        commit("SUCCESS", "O post foi adicionado com sucesso!");
      })
      .catch(error => {
        commit(
          "ERROR",
          "Ocorreu um erro no sistema, tente novamente mais tarde!"
        );
      });
  },
  // update post
  async updatePost({ commit }, data) {
    await axios
      .put(`https://jsonplaceholder.typicode.com/posts/${data.id}`, data)
      .then(res => {
        commit("SUCCESS", "O post foi atualizado com sucesso!");
      })
      .catch(error => {
        commit(
          "ERROR",
          "Ocorreu um erro no sistema, tente novamente mais tarde!"
        );
      });
  },
  // delete post
  async deletePost({ commit }, id) {
    await axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => {
        commit("SUCCESS", "O post foi deletado com sucesso!");
      })
      .catch(error => {
        commit(
          "ERROR",
          "Ocorreu um erro no sistema, tente novamente mais tarde!"
        );
      });
  }
};
