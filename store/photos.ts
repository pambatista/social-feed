import axios from "axios";

export const state = () => ({
  photos: [],
  photo: {},
  error: "",
  success: ""
});

export const getters = {
  getPhotos(state) {
    console.log(state);
    return state.photos;
  },
  getPhoto(state) {
    return state.photo;
  }
};

export const mutations = {
  GET_PHOTOS(state, payload) {
    state.photos = payload;
  },
  GET_PHOTO(state, payload) {
    state.photo = payload;
  },
  SUCCESS(state, payload) {
    state.success = payload;
  },
  ERROR(state, payload) {
    state.success = payload;
  }
};

export const actions = {
  // List Photos
  async listPhotos({ commit }) {
    await axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then(res => {
        commit("GET_PHOTOS", res.data);
      })
      .catch(error => {
        commit(
          "ERROR",
          "Ocorreu um erro no sistema, tente novamente mais tarde!"
        );
      });
  },

  // take one photo
  async getPhoto({ commit }, photoId) {
    await axios
      .get(`https://jsonplaceholder.typicode.com/photos/${photoId}`)
      .then(res => {
        commit("GET_PHOTO", res.data);
      })
      .catch(error => {
        commit(
          "ERROR",
          "Ocorreu um erro no sistema, tente novamente mais tarde!"
        );
      });
  },

  // insert photo
  async postPhoto({ commit }, data) {
    await axios
      .post(`https://jsonplaceholder.typicode.com/photos`, data)
      .then(res => {
        commit("SUCCESS", "A foto foi adicionada com sucesso!");
      })
      .catch(error => {
        commit(
          "ERROR",
          "Ocorreu um erro no sistema, tente novamente mais tarde!"
        );
      });
  },

  // update photo
  async updatePhoto({ commit }, data) {
    await axios
      .put(`https://jsonplaceholder.typicode.com/photos/${data.id}`, data)
      .then(res => {
        commit("SUCCESS", "A foto foi deletado com sucesso!");
      })
      .catch(error => {
        commit(
          "ERROR",
          "Ocorreu um erro no sistema, tente novamente mais tarde!"
        );
      });
  },

  // delete photo
  async deletePhoto({ commit }, id) {
    await axios
      .delete(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then(res => {
        commit("SUCCESS", "A foto foi deletado com sucesso!");
      })
      .catch(error => {
        commit(
          "ERROR",
          "Ocorreu um erro no sistema, tente novamente mais tarde!"
        );
      });
  }
};
