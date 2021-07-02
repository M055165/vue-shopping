<template>
  <div>
    <div class="cart-bg"></div>
    <div class="cart-wrapper">
      <p>購物車</p>

      <div class="empty-wrapper" v-if="Cart.total ==0">
        <h2 class="cart-empty">－ 購物車無物品 －</h2>
        <a href="#" class="btn btn-green">Shopping now</a>
      </div>
      <div class="row" v-if="Cart.total >0">
        <div class="col-12 table-wrapper">
          <table class="cart-table table mt-4">
            <thead style="width: 500px;">
              <tr>
                <th width="50">
                  <button type="buttom" class="btn btn-outline-danger" @click.stop="deleteall">Clear</button>
                </th>
                <th width="50"></th>
                <th>產品名稱</th>
                <th width="100">單價</th>
                <th width="100" class="text-center">數量</th>
                <th width="100">價格</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in Cart.carts" :key="index">
                <td class="align-middle cancel-btn">
                  <button class="btn btn-outline-danger btn-sm" @click="deleteCar(item.id)">
                    <!-- <i class="fa fa-spinner fa-spin" ></i> -->
                    <i class="far fa-trash-alt"></i>
                  </button>
                </td>
                <td class="products-img">
                  <div class="cart-img">
                    <img
                      :src="item.product.image"
                      alt
                      class="img-fluid d-block"
                      style="width: 100%; height: 100%;
                         background-size: cover;
                         background-position: center;"
                    />
                  </div>
                </td>
                <td>{{item.product.title}}</td>
                <td>{{item.product.price | currency}}</td>
                <td>
                  <div class="select_quantity">
                    <button class="minus" @click="changeQty(item.product.id,index,-1)">-</button>
                    <input
                      class="quantity"
                      type="number"
                      placeholder="1"
                      min="1"
                      max="100"
                      :value="item.qty"
                    />
                    <button class="plus" @click="changeQty(item.product.id,index,1)">+</button>
                  </div>
                </td>
                <td class="total-price">{{item.total | currency}}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td class="productimg"></td>
                <td colspan="4" class="text-right total-title">總價</td>
                <td class="text-right total-price">{{Cart.total| currency}}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="pay-wrapper ml-auto">
          <router-link to="/ordercheck" class="btn btn-payment">購物車結算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$green: #1e7529;
.cart-bg {
  height: 200px;
  width: 100%;
  background-image: url("https://images.unsplash.com/photo-1505051508008-923feaf90180?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80");
  background-size: cover;
  background-position: center center;
}
.cart-wrapper {
  padding: 20px 12vw 50px;
  p {
    color: #212529;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 30px;
  }
  .empty-wrapper {
    margin-bottom: 50px;
    .cart-empty {
      color: #212529;
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 48px;
    }
    .btn-green {
      background: $green;
      padding: 8px 16px;
      color: #fff;
      font-size: 20px;
    }
  }
  .table-wrapper {
    overflow-x: auto;
  }
  .cart-table {
    width: 100%;
    th {
      border-top: 1px solid gray;
      padding: 12px;
      border-bottom: 1px solid gray;
      text-align: left;
      font-size: 16px;
      vertical-align: middle;
    }
    tbody {
      td {
        vertical-align: middle;
        text-align: left;
        padding: 12px;
        font-size: 16px;
        border-bottom: 1px solid gray;
        .cart-img {
          width: 50px;
          height: 50px;
          display: block;
          img {
            max-width: 100%;
            height: auto;
          }
        }
      }
      .cancel-btn {
        padding-left: 12px;
      }
      .total-price {
        text-align: right;
      }
      .select_quantity {
        display: flex;
        .minus {
          width: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          outline: none;
          border: 1px solid grey;
          color: grey;
        }
        .quantity {
          text-align: center;
          border: 1px solid grey;
        }
        .plus {
          border: 1px solid grey;
          width: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          outline: none;
          color: grey;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none !important;
          margin: 0;
        }
      }
    }
    tfoot {
      .total-title {
        padding: 20px 0;
        font-weight: bold;
        font-size: 16px;
      }
      .total-price {
        padding: 12px;
        font-weight: bold;
        font-size: 16px;
        vertical-align: middle;
      }
    }
  }
  .pay-wrapper {
    display: flex;
    justify-content: flex-end;
    .btn-payment {
      border: 1px solid $green;
      width: 250px;
      color: $green;
      font-size: 16px;
      font-weight: bold;
      &:hover {
        background: $green;
        color: #fff;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .select_quantity {
    // flex-direction: column;
    input {
      // flex-direction: column;
      width: 100%;
    }
  }
  .pay-wrapper {
    justify-content: center !important;
  }
}
</style>

<script>
export default {
  data() {
    return {
      Cart: [],
      products_qty: 1,
    };
  },
  methods: {
    gettoCar() {
      const vm = this;
      const url = `https://vue-course-api.herokuapp.com/api/ace055165/cart`;
      vm.$http.get(url).then((response) => {
        vm.Cart = response.data.data;
        vm.Cart.carts.sort((a, b) => a.product.price - b.product.price);
        vm.Cart.carts.forEach((item) => {
          if (item.qty < 1) {
            const api = `https://vue-course-api.herokuapp.com/api/ace055165/cart/${item.id}`;
            vm.$http.delete(api).then(() => {
              vm.gettoCar();
            });
          }
        });
        vm.isLoading = false;
      });
    },
    deleteCar(id) {
      const vm = this;
      const url = `https://vue-course-api.herokuapp.com/api/ace055165/cart/${id}`;
      vm.$http.delete(url).then((response) => {
        vm.gettoCar();
      });
    },
    deleteall() {
      const vm = this;
      const url = `https://vue-course-api.herokuapp.com/api/ace055165/cart`;
      vm.$http.get(url).then((response) => {
        response.data.data.carts.forEach((item) => {
          const api = `https://vue-course-api.herokuapp.com/api/ace055165/cart/${item.id}`;
          vm.$http.delete(api).then(() => {
            vm.gettoCar();
          });
        });
      });
    },
    changeQty(id, index, i) {
      this.products_qty += i;
      const vm = this;
      const url = `https://vue-course-api.herokuapp.com/api/ace055165/cart`;
      // vm.Cart.carts[index].qty = vm.products_qty;

      /*123*/
      const itemId = vm.Cart.carts.find((item) => item.product.id === id); //查看新加的是否已經在購物車裡
      let itemqty = 0;
      if (itemId) {
        const api = `https://vue-course-api.herokuapp.com/api/ace055165/cart/${itemId.id}`;
        vm.$http.delete(api).then(() => {});
        itemqty = +itemId.qty;
      }
      const car = {
        product_id: id,
        qty: itemqty + i,
      };
      vm.$http.post(url, { data: car }).then((data) => {
        vm.gettoCar();
      });
    },
  },
  created() {
    this.gettoCar();
  },
};
</script>