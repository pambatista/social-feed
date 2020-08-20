<template>
  <div class="formLoader">
    <ul class="formLoading">
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";

@Component({
  name: "Loading",
  components: {}
})
export default class Loading extends Vue {}
</script>

<style lang="scss" scoped>
.formLoader {
  overflow: hidden;
  height: 100%;
  position: absolute;
  width: 100%;
  min-height: 150px;
  ul {
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: 999999;
    margin: 0 auto;
  }
  .formLoading {
    display: block;
    height: 14px;
    margin: 0 auto;
    top: 50%;
    left: 50%;
    transform: translateY(-50%);
    transform: translateX(-50%);
    position: absolute;
    width: auto;
    padding: 0;
    li {
      background: #fff;
      opacity: 0.5;
      display: block;
      float: left;
      width: 12px;
      height: 12px;
      border: 1px solid #f44336;
      line-height: 12px;
      padding: 0;
      position: relative;
      margin: 0 0 0 4px;
      animation: preload 1s infinite;
      top: -50%;
      border-radius: 50%;

      &:first-child {
        margin-left: 0;
      }
      &:nth-child(2) {
        animation-delay: 0.15s;
      }
      &:nth-child(3) {
        animation-delay: 0.3s;
      }
    }
  }
  .formLoader-complete {
    opacity: 0;
    visibility: hidden;
    transition-duration: 1s;
  }
}

@keyframes preload {
  0% {
    background: #f44336;
    opacity: 1;
  }
  50% {
    background: #fff;
    opacity: 0.5;
  }
  100% {
    background: #f44336;
    opacity: 1;
  }
}
</style>
