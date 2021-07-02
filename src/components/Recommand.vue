<template>
  <div>
    <div class="products-relate">
      <h2 class="ralate-title font-weight-bold">相關產品</h2>
      <div class="row relate-card">
        <div class="col-md-4" v-for="(item, index) in products" :key="index" v-if="index<3">
          <div class="card-box">
            <div class="card-pic" :style="{backgroundImage: `url(${ item.image })`}"  @click="turnproduct(item.id, item.category)
"></div>
            <div class="card-text">
              <h3 class="relate-type">{{item.category}}</h3>
              <h2 class="relate-name" @click="turnproduct(item.id, item.category)">{{item.title}}</h2>
              <del class="relate-Oprice">{{item.origin_price}}</del>
              <div class="d-flex justify-content-between">
                <h3 class="relate-Nprice d-inline-block">{{item.price}}</h3>
                <i class="fas fa-shopping-cart fa-2x d-inline-block"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
   props:['recommandList'],
   data(){
     return{
       products: [],
     }
   },
   methods:{
     recommand() {
      const vm = this;
      const url = `https://vue-course-api.herokuapp.com/api/ace055165/products/all`;
      vm.$http.get(url).then((response) => {
        vm.products = response.data.products.filter((item) => {
          const findproduct = vm.recommandList;
          return findproduct === item.category;
        });
      });
    },
      turnproduct(id, category) {
      this.$router.push({
        name: "frontProductIn",
        query: {
          id,
          category,
        },
      }).catch((err)=>{
        this.$router.go(0)
      });;
    },
   },
   created() {
     const vm = this;
     this.recommand()
   }
}
</script>


<style lang="scss" scoped>
$green: #008443;

.relate-card {
  margin: 20px;
  .card-box {
    padding-right: 20px;
    &:hover .card-pic{
        filter: brightness(0.5);
        transition: filter 0.7s;
      }
    .card-pic {
      // background-image: url("https://storage.googleapis.com/vue-course-api.appspot.com/tedcode%2F1583986451787.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=TWfPOW668WWt%2BehWiSQhn%2B%2FdcVKCB5xspMgNylNhCc8R%2BZB%2FfOQK%2BbGoG4ZrE8CjuAL6AUA8XmXW%2B8CR9DDMB1zxde2vKdZwjuYrc4QhzzMRIjSQ4RIC%2BGGYtssLMngg1XrdK8QYsW32JeUBJUZ%2FKC%2FTDowcV5sZSSjz261bySUSagLe5dPwcqKKHHkbOCCtLYDOOhcCZCe%2FTvBs4%2Fau7dULm0w8hb7Mjj%2BGaxMR5KMMpbaoDWyGCtD4H%2FzObJWSdYL3G%2F6ftJ2LDwO888pe45XqCITxq89rLYV9K13BNiarbxTqtzhMWDvllLFYHZKnog1PIZMCGSKYMwgJGBcduQ%3D%3D");
      background-size: cover;
      background-position: center center;
      width: 100%;
      height: 200px;
    }
    .card-text {
      padding: 15px 0px;
      cursor: pointer;
      &:hover {
        color:$green!important;
      }
      .relate-type {
        font-size: 20px;
        color: #8a8a8a;
      }
      .relate-name {
        font-size: 24px;
        font-weight: bold;
      }
      .relate-Nprice {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
}
</style>