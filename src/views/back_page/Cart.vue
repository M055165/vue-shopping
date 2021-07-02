<template>
  <div>
<table class="table mt-4 mx-auto" style="width: 500px;">
      <thead class="wigth:500px">
        <tr>
          <th width="100"></th>
          <th>品名</th>
          <th width="100">數量</th>
          <th width="100">價格</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in Cart.carts" :key="item.id">
          <td>
            <button class="btn btn-outline-danger btn-sm" @click="deleteCar(item.id)">
               <i class="far fa-trash-alt"></i>
            </button>
          </td>
          <td>
           {{ item.product.title }}
            <div class="text-success" >已套用優惠卷</div>
          </td>
          <td>{{item.qty}}/{{item.product.unit}}</td>
          <td class="text-right">{{ item.final_total | currency }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="text-right">總計</td>
          <td class="text-right">{{ Cart.total }}</td>
        </tr>
        <tr class="text-primary" v-if="Cart.final_total !== Cart.total">
          <td colspan="3" class="text-right">折扣價</td>
          <td class="text-right">{{ Cart.final_total | currency}}</td>
        </tr>
      </tfoot>
    </table>
    
    <!-- Order -->
    <ValidationObserver class="my-5 row justify-content-center" ref="form">
      <form class="col-md-6" @submit.prevent="createdOrder">
        <ValidationProvider rules="required|email" name="email">
          <div class="form-group">
            <label for="useremail">Email</label>
            <!-- 如果無內容送出表單的話，可以在input內加上required去阻擋，Chrome會自動跳出錯誤訊息 -->
            <input type="email" class="form-control" id="useremail" name="email"  placeholder="請輸入 Email"  required v-model="form.user.email" />
            <span class="text-danger" ></span>
          </div>
        </ValidationProvider>
        <ValidationProvider rules="required"  name="name">
          <div class="form-group">
            <label for="username">收件人姓名</label>
            <input type="text" class="form-control" name="name" id="username"  placeholder="輸入姓名"  required v-model="form.user.name"/>
            <span class="text-danger" >姓名錯誤</span>
          </div>
        </ValidationProvider>
        <ValidationProvider rules="required"  name="tel">
          <div class="form-group">
            <label for="usertel">收件人電話</label>
            <input type="tel" class="form-control" id="usertel"  placeholder="請輸入電話" name="tel"  required v-model="form.user.tel"/>
            <span  class="text-danger">電話錯誤</span>
          </div>
        </ValidationProvider>

        <ValidationProvider rules="required"  name="address">
          <div class="form-group">
            <label for="useraddress">收件人地址</label>
            <input type="text" class="form-control" name="address" id="useraddress"  placeholder="請輸入地址"  required v-model="form.user.address"/>
            <span class="text-danger" >地址欄位不得留空</span>
          </div>
        </ValidationProvider>

        <div class="form-group">
          <label for="comment">留言</label>
          <textarea name='' id="comment" class="form-control form_textarea" cols="30" rows="10" v-model="form.message"></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      status: {
        loading: {},
      },
      isLoading: false,
      Cart: {},
      couponcode: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    createdOrder(){
      const vm = this;
      const url = `https://vue-course-api.herokuapp.com/api/ace0678/order`;
      const order = vm.form;
      this.$http.post(url,{data:order}).then((response) => {
        console.log(vm.form.user.email)
        console.log(response.data)
        $('#productModal').modal('show');
        // console.log( vm.product);
        vm.status.loadingItem ='';
      })
    },
  gettoCar() {
      const vm = this;
      const url = `https://vue-course-api.herokuapp.com/api/ace0678/cart`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        vm.Cart = response.data.data;
        console.log(vm.Cart)
        vm.isLoading = false;
      });
    },
  deleteCar(id){
      const vm = this;
      const url = `https://vue-course-api.herokuapp.com/api/ace0678/cart/${id}`;
      vm.isLoading = true;
      vm.$http.delete(url).then((response) => {
        vm.isLoading = false;
        vm.gettoCar()
      });
    },
  },
  created() {
    this.gettoCar();
  }
} 
</script>