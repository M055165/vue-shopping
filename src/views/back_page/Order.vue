<template>
  <div>
    <table class="table mt-4">
  <thead>
    <tr>
      <th width="150">購買時間</th>
      <th width="">Email</th>
      <th width="">購買款項</th>
      <th width="100">應付金額</th>
      <th width="100">是否付款</th>
      <th width="100">編輯</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item) in orders" :key="item.id">
      <th scope="row">{{item.create_at}}</th>
      <td>{{item.user.email}}</td>
      <td> 
        <span v-for="(product,index) in item.products" :key="index">
              {{ product.product.title }} 數量 : {{ product.qty }} {{ product.product.unit }}
              <br />
        </span>
        </td>
      <td class="text-right">{{item.total}}</td>
      <td >
        <span class="text-success" v-if="item.is_paid">
              已付款
              <br />
              {{ item.paid_date | date }}
            </span>
            <span class="text-secondary" v-else>尚未付款</span>
            <br />
            <span class="text-danger" v-if="item.is_display === 1">已刪除此單</span>
      </td>
       <button class="btn btn-outline-primary mx-auto d-block" >編輯</button>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      orders:[]
    }
  },
  methods:{
    getOrders(page = 1){
    const api = `https://vue-course-api.herokuapp.com/api/ace0678/orders?page=${page}`;
      const vm = this;
       
      vm.isLoading = true;
       vm.$http.get(api).then((response) => {
        //  console.log(response.data)
       vm.orders= response.data.orders;
        vm.isLoading = false;
        console.log(vm.orders[0]);
      });
    }
  },
   computed: {
    sortOrder() {
      const vm = this;
      const neworder = vm.orders.sort((a, b) => {
        const A = a.is_paid ? 1 : 0;
        const B = b.is_paid ? 1 : 0;
        return A - B;
      });
      return neworder;
    },
  },
  created(){
    this.getOrders();
  }
}
</script>

<style lang="">
  
</style>