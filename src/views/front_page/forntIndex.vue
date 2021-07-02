<template>
  <div>
     <Alert></Alert>
    <navfront></navfront>
    <router-view></router-view>
    <footerfront></footerfront>
  </div>
</template>

<script>
import Alert from '../back_page/AlertMessage';
import navfront from "../../components/navFront.vue";
import footerfront from "../../components/footerFront.vue";
export default {
  components: {
    navfront,
    footerfront,
    Alert,
  },
}
</script>

<style lang="css" scoped >
  body {
    background-color: #F0F0F0;
  }
</style>