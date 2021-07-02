<template>
  <div>
    <div class="cart-bg"></div>
    <div class="orderCheck-wrapper">
      <div class="orderCheck-header">
        <div class="order-proccess">
          <div class="proccess-number bgGreen">1</div>
          <div class="proccess-text">訂購資料</div>
        </div>
        <div class="order-proccess">
          <div class="proccess-number bgGreen">2</div>
          <div class="proccess-text">訂單付款</div>
        </div>
        <div class="order-proccess">
          <div class="proccess-number">3</div>
          <div class="proccess-text">付款成功</div>
        </div>
      </div>
    </div>
    <div class="payment-success">
      <i class="far fa-check-circle"></i>
      <h1 class="header">
        <span>{{order.user.name}}&nbsp;您好!</span>
        <p class="fontGreen">恭喜您!付款成功</p>
        <p>付款總金額:{{order.total|currency}}</p>
      </h1>
      <div class="order-info">
        <ul>
          <li class="title">訂單資訊:</li>
          <li>收件人人&nbsp;:&nbsp;&nbsp;{{order.user.name}}</li>
          <li>收件人電話人&nbsp;:&nbsp;&nbsp;{{order.user.tel}}</li>
          <li>收件人Email人&nbsp;:&nbsp;&nbsp;{{order.user.email}}</li>
          <li>收件人地址人&nbsp;:&nbsp;&nbsp;{{order.user.address}}</li>
          <li>付款時間人&nbsp;:&nbsp;&nbsp;{{order.create_at |date}}</li>
        </ul>
      </div>
      <a href="/frontproducts" class="btn btn-success success-btn">繼續購物</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        user: {},
      },
    };
  },
  methods: {
    getOrders(id) {
      const vm = this;
      const api = `https://vue-course-api.herokuapp.com/api/ace055165/order/${id}`;
      vm.$http.get(api).then((res) => {
        vm.order = res.data.order;
      });
    },
  },
  created(){
    const vm = this;
    vm.getOrders(vm.$route.query.id)
  }
};
</script>

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
}

.payment-success {
  i {
    font-size: 80px;
    color: $green;
  }
  .header {
    span {
      font-size: 24px;
      color: #212529;
      margin: 16px 0 8px;
    }
    p {
      font-size: 28px;
      color: #212529;
      margin: 16px 0 8px;
    }
    .fontGreen {
      color: $green;
      font-size: 40px;
      font-weight: bold;
    }
  }
  .order-info {
    margin-top: 50px;
    ul {
      margin: 0 auto;
      padding: 0;
      width: 300px;
      list-style: none;
      text-decoration: none;
      padding-left: 20px;
      li {
        text-align: left;
        margin-bottom: 10px;
        font-size: 16px;
      }
      .title {
        font-size: 24px;
        font-weight: bold;
      }
    }
  }
  .success-btn {
    font-size: 25px;
    font-weight: bold;
    letter-spacing: 1.2px;
    margin: 50px 0;
    padding: 10px;
    width: 150px;
  }
}
</style>