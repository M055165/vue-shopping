<template>
 <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
              <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="getproduct(item.id)">
              <i class="fa fa-spinner fa-spin" v-if="status.loadingItem === item.id"> </i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
              <i class="fas fa-spinner fa-spin"  v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal -->
     <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
                aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content border-0">
                    <div class="modal-header bg-dark text-white">
                        <h5 class="modal-title" id="exampleModalLabel">
                        {{ product.title }}
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <img :src="product.imageUrl" alt="" class="img-fluid mx-auto d-block" style="height: 400px;">
                        <blockquote class="blockquote mt-3">
                            <p class="mb-0">{{ product.content }}</p>
                            <footer class="blockquote-footer text-right">{{ product.description }}</footer>
                        </blockquote>
                        <div class="d-flex justify-content-between align-items-baseline">
                            <div class="h5" v-if="!product.price">{{ product.origin_price }}</div>
                            <del class="h6" v-if="product.price">{{ product.origin_price }}</del>
                            <div class="h5" v-if="product.price">{{ product.price }}</div>
                        </div>
                        <!-- 會將數量佔存在product內的num -->
                        <select name="" class="form-control mt-3" v-model="product.num">
                            <option value="0" disabled selected>-- 選購數量 --</option>
                            <option :value="num" v-for="num in 10" :key="num">
                                選購 {{ num }} {{ product.unit }}
                            </option>
                        </select>
                    </div>
                    <div class="modal-footer">
                        <div class="text-muted text-nowrap mr-3">
                            小計 <strong>{{ product.num * product.price }}</strong> 元
                        </div>
                        <button type="button" class="btn btn-primary" @click="addtoCart(product.id, product.num)">
                            加到購物車
                        </button>
                    </div>
                </div>
            </div>
        </div> 
  </div>
</template>

<script>
import $ from 'jquery'
export default {
 data() {
    return {
      products: [],
      status:{
        loadingItem:''
      },
      product:{},
      isLoading: false,
    }
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `https://vue-course-api.herokuapp.com/api/ace0678/products`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        vm.products = response.data.products;
        console.log(response);
        vm.isLoading = false;
      });
    },
    getproduct(id){
      const vm = this;
      const url = `https://vue-course-api.herokuapp.com/api/ace0678/product/${id}`;
      vm.status.loadingItem =id;
      this.$http.get(url).then((response) => {
        vm.product = response.data.product;
        $('#productModal').modal('show');
        // console.log( vm.product);
        vm.status.loadingItem ='';
      });
    },
    addtoCart(id,qty = 1){
       const vm = this;
      const url = `https://vue-course-api.herokuapp.com/api/ace0678/cart`;
      vm.status.loadingItem =id;
      const cart = {
        product_id :id,
        qty : qty
      }
      this.$http.post(url, {data:cart}).then((response) => {
        console.log( response);
        vm.status.loadingItem ='';
        vm.getCart()
         $('#productModal').modal('hide');
      });
    },
    getCart(){
       const vm = this;
      const url = `https://vue-course-api.herokuapp.com/api/ace0678/cart`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        // vm.products = response.data.products;
        console.log(response);
        vm.isLoading = false;
      });
    }
  },
  created() {
    this.getProducts();
    this.getCart()
  },
};
</script>