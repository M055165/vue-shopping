<template>
  <div>
    <div class="bg-cover oldbg"></div>
    <Slide></Slide>
    <!-- 產品理念 -->
    <div class="container mt-1">
      <p class="h1 ">產品理念</p>

      <div class="row mb-5 mt-5">
        <div class="col-md-6 col-12">
          <img
            src="https://images.unsplash.com/photo-1554042861-0ad2fc2a8dc2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
            alt
          />
        </div>
        <div class="col-md-6 text-center mt-4 col-12">
          <p class="h3">餐具用的好 健康跟著跑</p>
          <br>
          <p class="text-center">台灣在2018年高齡人口（65歲以上人口）比例已超過14%，正式邁入高齡（aged）社會，且高齡化的問題日益嚴重!然而相對於年輕人，老年人的手腳較不靈活，因此有一個專門為他們設計的餐具可以說是老年人的一大福音!</p>
        </div>
      </div>

      <div class="row mb-5">
        <div class="col-md-6 text-center mt-5 col-12 order-2 order-md-1">
          <p class="h3">輪椅挑的巧 行動沒煩惱</p>
          <br />
          <p class="text-center">輪椅，對於不良於行的人而言不只是單純的移動方法，更是促進生活自立的重要工具。另外，也是人們從事喜歡的活動或旅遊時擴大活動範圍的良伴。</p>
        </div>
        <div class="col-md-6 col-12 order-1 order-md-2">
          <img
            src="https://images.unsplash.com/photo-1508847154043-be5407fcaa5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
            alt
          />
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 col-12">
          <img src="https://images.unsplash.com/photo-1523246224990-496e9a19113a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="">
        </div>
        <div class="col-md-6 text-center mt-3 col-12">
          <p class="h3">食品吃得好 醫生掰掰了</p>
         <br>
          <p class="text-center">要讓細胞機能活化健康，必須適時補充身體所不足的營養素（Nutrients），人體需要四十多種均衡營養素，來維持身體機能的正常運作。因此除了調整飲食及生活習慣外，視個人需求補充保健食品，可以讓身體更健康，更有活力！</p>
        </div>
      </div>

    </div>
    
    <Customer></Customer>
  </div>
</template>

<script>
import Slide from "../../components/FrontSlide.vue";
import Customer from "../../components/Customer.vue";
export default {
  components: {
    Slide,Customer
  },
};
</script>

<style lang="scss" scoped>
$font-color: black;

img {
  width: 100%;
  height: 300px;
}
p {
  font-weight: 200;
  line-height: 1.8;
  font-size:20px;
}

.h1,
.h3 {
  font-size:35px;
  font-weight: 500;
  color: $font-color;
}
.h3 {
  font-size:25px;
}

.oldbg {
  background-image: url("https://images.unsplash.com/photo-1508963493744-76fce69379c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80");
}
.bg-cover {
  background-size: cover;
  background-position: center center;
}

.oldbg {
  width: 100%;
  height: 80vh;
}

@media screen and (max-width:767px){
  .oldbg {
    width: 100%;
    height: 60vh;
  }
}
</style>