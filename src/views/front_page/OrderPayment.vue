<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="cart-bg"></div>
    <div class="orderCheck-wrapper">
      <div class="orderCheck-header">
        <div class="order-proccess">
          <div class="proccess-number">1</div>
          <div class="proccess-text">訂購資料</div>
        </div>
        <div class="order-proccess">
          <div class="proccess-number">2</div>
          <div class="proccess-text">訂單付款</div>
        </div>
        <div class="order-proccess">
          <div class="proccess-number bgGreen">3</div>
          <div class="proccess-text">付款成功</div>
        </div>
      </div>
      <div class="orderCheck-content">
        <div class="row">
          <div class="col-md-7">
            <div class="order-information">
              <table>
                <thead>
                  <tr>
                    <th colspan="2" class="text-center">訂購資料</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th width="200">Email</th>
                    <td>{{order.user.email}}</td>
                  </tr>
                  <tr>
                    <th>姓名</th>
                    <td>{{order.user.name}}</td>
                  </tr>
                  <tr>
                    <th>收件人電話</th>
                    <td>{{order.user.tel}}</td>
                  </tr>
                  <tr>
                    <th>收件人地址</th>
                    <td>{{order.user.address}}</td>
                  </tr>
                  <tr>
                    <th>付款方式</th>
                    <td>{{order.user.email}}</td>
                  </tr>
                  <tr>
                    <th>其他留言</th>
                    <td>{{order.user.message}}.</td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>{{is_paid}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-md-5">
            <table class="order-products">
              <thead>
                <tr>
                  <th colspan="3" class="products-title">訂購資料</th>
                </tr>
                <tr>
                  <th>品名</th>
                  <th width="80">數量</th>
                  <th width="80">單價</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in order.products" :key="index">
                  <td>{{item.product.title}}</td>
                  <td>{{item.qty}}/{{item.product.unit}}</td>
                  <td class="price">{{item.total | currency}}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2">總計</td>
                  <td class="price">{{order.total | currency}}</td>
                </tr>
                <tr class="order-btn">
                  <td colspan="3">
                    <a
                      href="javascript:;"
                      class="btn btn-green"
                      @click="payOrder(orderId)"
                    >確認付款去</a>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$green: #008433;
.bgGreen {
  background-color: $green !important;
  color: #fff !important;
  font-weight: bold !important;
}
.cart-bg {
  height: 200px;
  width: 100%;
  background-image: url("https://images.unsplash.com/photo-1505051508008-923feaf90180?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80");
  background-size: cover;
  background-position: center center;
}

.orderCheck-wrapper {
  padding: 50px 12vw;
  text-align: left;
  .orderCheck-header {
    display: flex;
    justify-content: space-between;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 30%;
      left: 50%;
      width: 91.5%;
      transform: translate(-54%, -50%);
      height: 5px;
      background-color: #008443;
      z-index: -9;
    }
    .order-proccess {
      display: flex;
      flex-direction: column;
      .proccess-number {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid $green;
        font-size: 24px;
        color: $green;
        background-color: #fff;
      }
      .proccess-text {
        padding-top: 10px;
        color: $green;
        font-size: 20px;
        font-weight: bold;
        margin-left: -8px;
      }
    }
  }
  .orderCheck-content {
    margin-top: 30px;
    .order-information {
      width: 100%;
      table {
        width: 100%;
      }
      thead {
        width: 100%;
        th {
          font-size: 24px;
          font-weight: bold;
          border-right: 1px solid #dee2e6;
        }
      }
      th {
        border: 1px solid #dee2e6;
        border-right: none;
        padding-left: 10px;
        padding: 12px;
        font-size: 16px;
      }
      td {
        text-align: center;
        border: 1px solid #dee2e6;
        border-left: none;
        padding-left: 10px;
        padding: 12px;
        font-size: 16px;
      }
    }
    .order-products {
      width: 100%;
      table {
        width: 100%;
        background-color: red;
      }
      .products-title {
        width: 100%;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
      }
      td {
        padding: 12px;
        border: 1px solid #dee2e6;
        text-align: center;
        &.price {
          text-align: right;
        }
      }
      th {
        text-align: center;
        padding: 12px;
        border: 1px solid #dee2e6;
      }
      tfoot {
        width: 100%;
        td {
          font-weight: bold;
          border-right: none;
          &.price {
            border: 1px solid #dee2e6;
            border-left: none;
          }
        }
        .order-btn {
          border: 1px solid #dee2e6;
          td {
            text-align: right;
            .btn-green {
              color: #fff;
              font-weight: bold;
              background: #008443;
              width: 33.3333%;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 767px) {
  .order-products {
    margin-top: 30px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      orderId: "",
      order: {
        user: {},
      },
      isLoading: true,
    };
  },
  methods: {
    getOrder(id) {
      const vm = this;
      vm.orderId = id;
      const url = `https://vue-course-api.herokuapp.com/api/ace055165/order/${id}`;
      vm.$http.get(url).then((res) => {
        vm.isLoading = false;
        vm.order = res.data.order;
      });
    },
    payOrder(id) {
      const vm = this;
      const api = `https://vue-course-api.herokuapp.com/api/ace055165/pay/${id}`;
      vm.$http.post(api).then((res) => {
        vm.$router.push({
          name: "PaymentSuccessful",
          query: {
            id,
          },
        });
      });
    },
  },
  computed: {
    is_paid() {
      if (this.order.is_paid == true) {
        return "已付款完成";
      } else if (this.order.is_paid == false) {
        return "尚未付款";
      }
    },
  },
  created() {
    this.getOrder(this.$route.query.id);
  },
};
</script>
