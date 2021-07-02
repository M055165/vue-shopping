<template>
  <div>
    <div class="cart-bg"></div>
    <div class="orderCheck-wrapper">
      <div class="orderCheck-header">
        <div class="order-proccess">
          <div class="proccess-number">1</div>
          <div class="proccess-text">訂購資料</div>
        </div>
        <div class="order-proccess">
          <div class="proccess-number bgGreen">2</div>
          <div class="proccess-text">訂單付款</div>
        </div>
        <div class="order-proccess">
          <div class="proccess-number bgGreen">3</div>
          <div class="proccess-text">付款成功</div>
        </div>
      </div>
      <div class="orderCheck-content">
        <div class="row">
          <div class="col-md-6">
            <div class="content-form">
              <h2 class="form-title">聯繫資訊</h2>
              <form action="#">
                <div class="form-wrapper">
                  <label for="email" class="form-field">
                    Email
                    <span>*</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    placeholder="請輸入Email"
                    required="required"
                    v-model="form.user.email"
                  />
                  <h5 class="alert">email 為必填</h5>
                </div>
                <div class="form-wrapper">
                  <label for="name" class="form-field">
                    姓名
                    <span>*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="請輸入姓名"
                    required="required"
                    v-model="form.user.name"
                  />
                  <h5 class="alert">姓名 為必填</h5>
                </div>
                <div class="form-wrapper">
                  <label for="phone" class="form-field">
                    電話
                    <span>*</span>
                  </label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="請輸入電話"
                    required="required"
                    v-model="form.user.tel"
                  />
                  <h5 class="alert">電話 為必填</h5>
                </div>
                <div class="form-wrapper">
                  <label for="address" class="form-field">
                    地址
                    <span>*</span>
                    <input
                      type="text"
                      id="address"
                      placeholder="請輸入地址"
                      required="required"
                      v-model="form.user.address"
                    />
                    <h5 class="alert">地址欄位為必填</h5>
                  </label>
                </div>
                <div class="form-wrapper">
                  <label for="address" class="form-field">
                    付款方式
                    <span>*</span>
                    <select
                      name="address"
                      id="address"
                      required="required"
                      placeholder
                      v-model="form.user.method"
                    >
                      <option value selected disabled>選擇付款方式</option>
                      <option value="貨到付款">貨到付款</option>
                      <option value="超商取貨付款">超商取貨付款</option>
                      <option value="ATM轉帳">ATM轉帳</option>
                      <option value="超商代碼繳費">超商代碼繳費</option>
                    </select>
                  </label>
                </div>

                <div class="form-wrapper">
                  <label for="others" class="form-field">其他</label>
                  <textarea
                    name="others"
                    id="others"
                    cols="30"
                    rows="10"
                    placeholder="留言其他建議"
                    v-model="form.user.message"
                  ></textarea>
                </div>
              </form>
            </div>
          </div>
          <div class="col-md-6">
            <div class="content-submit">
              <h2 class="submit-title">你的訂單</h2>
              <table>
                <thead>
                  <th>產品名稱</th>
                  <th width="100">價格</th>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in Cart.carts" :key="index">
                    <td>
                      {{item.product.title}}
                      <span>*{{item.qty}}</span>
                    </td>
                    <td class="price">{{item.total| currency}}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <td>總價</td>
                  <td class="price">{{Cart.total |currency}}</td>
                </tfoot>
              </table>
              <a href="#" class="btn btn-green" @click.prevent="createdOrder">送出訂單</a>
            </div>
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
      width: 94%;
      transform: translate(-50%, -50%);
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
        margin-bottom: 8px;
      }
      .proccess-text {
        padding-top: 10px;
        color: $green;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
  .orderCheck-content {
    padding: 50px 0;
    .content-form {
      padding-right: 20px;
      border-right: 1px solid rgb(173, 181, 189);
      .form-title {
        font-size: 24px;
        margin-bottom: 16px;
        font-weight: bold;
      }
      .form-wrapper {
        .form-field {
          display: block;
          font-size: 16px;
          margin-right: 8px;
          span {
            color: red;
          }
        }
        input {
          width: 100%;
          // border: 1px solid #dc3545;
          height: 40px;
          border-radius: 5px;
          padding-left: 10px;
        }
        .alert {
          color: #dc3545;
          font-size: 16px;
          padding-top: 5px;
          padding-left: 0px;
        }
        select {
          width: 100%;
          height: 40px;
          border-radius: 5px;
          padding-left: 10px;
          option {
            padding-left: 10px;
          }
        }
        textarea {
          padding-top: 5px;
          padding-left: 10px;
          border-radius: 5px;
          height: 100%;
          width: 100%;
        }
      }
    }
    .content-submit {
      .submit-title {
        font-size: 24px;
        margin-bottom: 16px;
        font-weight: bold;
      }
      table {
        width: 100%;
        margin-bottom: 50px;
        th {
          font-size: 16px;
          font-weight: bold;
          padding: 12px;
          border-top: 1px solid rgb(173, 181, 189);
        }
        td {
          font-size: 16px;
          padding: 12px;
          border-top: 1px solid rgb(173, 181, 189);
          &.price {
            text-align: right;
          }
        }
        tfoot {
          td {
            font-size: 20px;
            font-weight: bold;
            border-bottom: 1px solid rgb(173, 181, 189);
            &.price {
              text-align: right;
            }
          }
        }
      }
      .btn-green {
        background: $green;
        width: 100%;
        border-radius: 5px;
        color: #fff;
        font-weight: bold;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .content-form {
    border-right: none !important;
  }
  .content-submit {
    margin-top: 30px;
  }
}
</style>

<script>
export default {
  data() {
    return {
     form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
          message: '',
          method: '',
        },
      },
      Cart: {},
    };
  },
  methods: {
    gettoCar() {
      const vm = this;
      const url = `https://vue-course-api.herokuapp.com/api/ace055165/cart`;
      vm.$http.get(url).then((res) => {
        vm.Cart = res.data.data;
      });
    },
    createdOrder() {
      const vm = this;
      const url = `https://vue-course-api.herokuapp.com/api/ace055165/order`;
      const order = vm.form;
      console.log(order);
      vm.$http.post(url, { data: order }).then((response) => {
         vm.$router.push({
                name: 'OrderPayment',
                query: {
                  id: response.data.orderId,
                },
              });
      });
    },
  },
  created() {
    const vm = this;
    vm.gettoCar();
  },
};
</script>