<template>
  <div>
   <navbar></navbar>
   <Alert></Alert>
<div class="container-fluid">
  <div class="row">
      <sidebar></sidebar>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
      <router-view></router-view>
    </main>
  </div>
</div>
  </div>
</template>

<script>
import sidebar from'./sidebar';
import navbar from'./navbar'
import Alert from './AlertMessage'
export default {
  components:{
    sidebar,
    navbar,
    Alert
  },
  methods: {
    signout() {
      const api = "https://vue-course-api.herokuapp.com/logout";
      const vm = this;
      this.$http.post(api).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push("/login");
        }
      });
    },
  },
}
</script>