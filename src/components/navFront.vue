<template>
  <div class="box">
    <div class="container">
      <div class="header-wrapper">
        <button class="hamburger-menu" @click="burgerClick">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>

        <div class="logo d-flex">
          <a href="#">
            <div class="logo-pic">
              <img src="https://image.flaticon.com/icons/svg/1141/1141066.svg" />
            </div>
          </a>
          <div class="logo-text">
            <a href="/">
              <P>Give More</P>
              <span>Love and Patient</span>
            </a>
          </div>
        </div>
        <div class="list" :class="{'left0':burgerFlag}">
          <ul>
            <li class="cancle" @click="burgerClick">
              <i class="fas fa-times menu-close"></i>
            </li>
            <li>
              <router-link to="/">首頁</router-link>
            </li>
            <li>
              <a href="#">最新資訊</a>
            </li>
            <li>
              <router-link to="/frontproduct">商品</router-link>
            </li>
          </ul>
        </div>
        <ul class="navbar-nav">
          <li>
            <div class="like">
              <a
                href="javascript:;"
                class="fas fa-heart fa-2x text-white mouseMoving"
                @click.prevent="likeModalClick"
              ></a>
              <div
                class="favorite-quantity"
                v-if="Favorite!== undefined && Favorite.length > 0"
              >{{ Favorite.length }}</div>
              <div class="like-card" :class="{'d-block':likeModalFlag}">
                <h2 v-if="Favorite!== undefined && Favorite.length > 0">收藏的產品</h2>
                <div
                  class=" text-center mt-2 mb-3 font-weight-bold"
                  v-if="Favorite!== undefined && Favorite.length ==0"
                >－&nbsp;還沒有收藏的商品喔&nbsp;－</div>
                <a href="./frontproduct" class="btn btn-primary w-100"  v-if="Favorite!== undefined && Favorite.length ==0">購物去</a>
                <div class="table-wrapper" v-if="Favorite!== undefined && Favorite.length > 0">
                  <table>
                    <tbody>
                      <tr v-for="(item,index) in Favorite" :key="index">
                        <td>
                          <button
                            class="btn btn-outline-danger btn-sm"
                            @click="deleteFavorite(item.id)"
                          >
                            <i class="fas fa-times"></i>
                          </button>
                        </td>
                        <td class="pic" :style="{backgroundImage: `url(${ item.image })`}"></td>
                        <td class="name">{{item.title}}</td>
                        <td>
                          <button
                            class="btn btn-outline-danger btn-sm"
                            @click="addtoCar(item.id, 1, item.title)"
                          >
                            <i class="fas fa-shopping-cart"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <div class="shopping-cart">
              <a
                class="fas fa-shopping-basket fa-2x text-white mouseMoving"
                @click.prevent="cartModalClick"
              ></a>
              <div
                class="cart-quantity"
                v-if="Cart.carts !== undefined && Cart.carts.length > 0"
              >{{Cart.carts.length}}</div>
              <div class="cart-card" :class="{'d-block':cartModalFlag}">
                <h2 v-if="Cart.carts !== undefined && Cart.carts.length > 0">- 你的購物車 -</h2>
                <div
                  class="text-center mt-2 mb-3 font-weight-bold"
                  v-if="Cart.carts !== undefined && Cart.carts.length === 0"
                >－&nbsp;還沒有收藏的商品喔&nbsp;－</div>
                <a href="./frontproduct" class="btn btn-primary w-100"  v-if="Cart.carts !== undefined && Cart.carts.length === 0">購物去</a>
                <div class="table-wrapper" v-if="Cart.carts !== undefined && Cart.carts.length > 0">
                  <table>
                    <tbody>
                      <tr v-for="(item,index ) in Cart.carts" :key="index">
                        <td>
                          <button class="btn btn-outline-danger btn-sm" @click="deleteCar(item.id)">
                            <i class="fas fa-times"></i>
                          </button>
                        </td>
                        <td class="pic" :style="{backgroundImage: `url(${ item.product.image })`}"></td>
                        <td class="name align-middle">{{item.product.title}}</td>
                        <td class="unit align-middle">{{item.qty}}/{{item.product.unit}}</td>
                        <td class="text-right">{{item.product.price | currency}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="card-text text-right" v-if="Cart.carts !== undefined && Cart.carts.length > 0">
                  <span>總計</span>
                  <small>{{Cart.total | currency}}</small>
                </div>
                <a href="frontcart" class="btn btn-green" v-if="Cart.carts !== undefined && Cart.carts.length >0">結帳</a>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <a href="/login" class="nav-link text-white mouseMoving">
              <a class="fas fa-sign-in-alt fa-2x"></a>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headerchange: false,
      burgerFlag: false,
      likeModalFlag: false,
      cartModalFlag: false,
      Favorite: [],
      Cart: {},
    };
  },
  methods: {
    addtoCar(id, qty, title) {
      const vm = this;
      const url = `https://vue-course-api.herokuapp.com/api/ace055165/cart`;
      vm.$http.get(url).then((response) => {
        vm.Cart = response.data.data; //先取購物車的所有商品出來
        const itemId = vm.Cart.carts.find(
          (item) => item.product.title === title
        ); //查看新加的是否已經在購物車裡
        let itemqty = 0;
        if (itemId) {
          const api = `https://vue-course-api.herokuapp.com/api/ace055165/cart/${itemId.id}`;
          vm.$http.delete(api).then(() => {});
          itemqty = +itemId.qty;
        }
        const car = {
          product_id: id,
          qty: itemqty + qty,
        };
        vm.$http.post(url, { data: car }).then((data) => {});
      });
    },
    burgerClick() {
      this.burgerFlag = !this.burgerFlag;
    },
    likeModalClick() {
      this.likeModalFlag = !this.likeModalFlag;
      if (this.cartModalFlag) {
        this.cartModalFlag = false;
      }
    },
    cartModalClick() {
      this.cartModalFlag = !this.cartModalFlag;
      if (this.likeModalFlag) {
        this.likeModalFlag = false;
      }
    },
    gettoFavorite() {
      const vm = this;
      vm.Favorite = JSON.parse(localStorage.getItem("Favorites")) || [];
    },
    gettoCart() {
      const vm = this;
      const url = `https://vue-course-api.herokuapp.com/api/ace055165/cart`;
      vm.$http.get(url).then((response) => {
        vm.Cart = response.data.data;
      });
    },
    deleteCar(id) {
      const vm = this;
      const url = `https://vue-course-api.herokuapp.com/api/ace055165/cart/${id}`;
      vm.$http.delete(url).then(() => {
        vm.gettoCart();
      });
    },
    deleteFavorite(id) {
      const vm = this;
      let deleteIndex = "";
      vm.Favorite.forEach((item, index) => {
        if (item.id === id) {
          deleteIndex = index;
        }
      });
      vm.Favorite.splice(deleteIndex, 1);
      localStorage.setItem("Favorites", JSON.stringify(vm.Favorite));
      vm.gettoFavorite();
    },
  },
  created() {
    const vm = this;
    window.addEventListener(
      "scroll",
      () => {
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 60) {
          vm.headerchange = true;
        } else if (scrollTop < 60) {
          vm.headerchange = false;
        }
        if (scrollTop > 500) {
          vm.scrolltop = true;
        } else if (scrollTop < 500) {
          vm.scrolltop = false;
        }
      },
      true
    ),
      this.gettoFavorite();
    this.gettoCart();
  },
};
</script>
<style lang="scss" scoped>
.box {
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  z-index: 100;
  width: 100%;
}

.header-wrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  .logo {
    justify-content: center;
    align-items: center;
    .logo-pic {
      width: 80px;
      height: 80px;
      margin-right: 10px;
      img {
        max-width: 100%;
        height: auto;
        vertical-align: bottom;
      }
    }
    .logo-text {
      a {
        text-decoration: none;
        font-size: 20px;
        color: white;
        p {
          margin-bottom: 0;
        }
      }
    }
  }
  .list {
    display: flex;
    align-items: center;
    ul {
      margin-top: 10px;
      display: flex;
      align-items: center;

      li {
        list-style: none;
        &.cancle {
          display: none;
        }
        &:hover {
          a {
            color: #c69e6c;
          }
        }
      }
      a {
        padding: 5px 10px;
        font-size: 24px;
        text-decoration: none;
        color: white;
      }
    }
  }
  .hamburger-menu {
    background: none;
    border: none;
    display: none;
    margin-right: 10px;
  }
  .hamburger-menu .icon-bar {
    background-color: white;
    display: block;
    height: 5px;
    margin: 0 auto 4px;
    width: 35px;
  }
  .navbar-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
    // font-size: 18px;
    li {
      margin-right: 10px;
      &:hover {
        .mouseMoving {
          color: green !important;
          transition: color 0.7s;
        }
      }
    }
    .like {
      display: flex;
      position: relative;
      a {
        text-decoration: none;
      }
      .favorite-quantity {
        margin-top: -10px;
        margin-left: 5px;
        width: 20px;
        height: 25px;
        background-color: green;
        border-radius: 50px;
        color: white;
        line-height: 25px;
      }
    }
    .like-card {
      display: none;
      position: absolute;
      top: 50px;
      left: -200px;
      background: #fff;
      border-radius: 5px;
      padding: 10px;
      box-shadow: 5px 4px 6px 5px rgba(0, 0, 0, 0.2);
      h2 {
        padding: 10px 0;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        border-bottom: 1px solid #dee2e6;
      }
      .table-wrapper {
        height: 100px;
        overflow-y: auto;
        overflow-x: hidden;
        table {
          tbody {
            tr {
              display: flex;
              align-content: center;
              justify-content: center;
              td {
                padding: 1rem;
                display: flex;
                justify-content: center;
                align-items: center;
                &.pic {
                  width: 50px;
                  height: 50px;
                  background-size: cover;
                  background-position: center center;
                  background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/tedcode%2F1583988100843.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=KNlSBUHlqcVyU7m311XyAjR9a5ptDdfjeGKpn%2FtJTMvOIgbijrQvh02y8s7m0uirVGCImQZXhAcgz3aDmKr0RmdSodArIAUWygONooffX4xGdt1taV0f0s%2FF03AN5n45dEamGpzgQHopWt%2Fx5idEwnl%2FgEdP8d0MzoHec3qvLgBX6OwTAe%2BXUKuY8EDNGgftafwGTgSYbpWiMQOCI6a%2FsfJupNTD0Uy%2BbhHA6XypAPT2a3ZySLEB0QhtFTcqai%2BEt1NZCc8IsFNmkLd7X%2B3Sq6rwyhwBSr6VA9DpDZ3cBonAPDJ4EaxZld2ABa%2BDGFr93Qz75LgbimMp8%2FjZn6pf9A%3D%3D);
                }
                &.name {
                  min-width: 150px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
              }
            }
          }
        }
      }
    }
    .shopping-cart {
      position: relative;
      display: flex;
    }
    .cart-quantity {
      margin-top: -10px;
      margin-left: 5px;
      width: 20px;
      height: 25px;
      background-color: green;
      border-radius: 50px;
      color: white;
      line-height: 25px;
    }
    .cart-card {
      display: none;
      position: absolute;
      top: 50px;
      left: -300px;
      background: #fff;
      border-radius: 5px;
      padding: 10px;
      box-shadow: 5px 4px 6px 5px rgba(0, 0, 0, 0.2);
      h2 {
        padding: 10px 0;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        border-bottom: 1px solid #dee2e6;
      }
      .table-wrapper {
        height: 100px;
        overflow-x: hidden;
        overflow-y: auto;
        table {
          tbody {
            border-bottom: 1px solid #dee2e6;
            tr {
              display: flex;
              align-content: center;
              justify-content: center;
              td {
                padding: 1rem;
                display: flex;
                justify-content: center;
                align-items: center;
                &.name {
                  padding: 12px;
                  min-width: 150px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                &.unit {
                  width: 80px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                &.pic {
                  width: 50px;
                  height: 50px;
                  background-size: cover;
                  background-position: center center;
                }
              }
            }
          }
        }
      }
      .card-text {
        padding: 20px 0;
        span {
          margin-right: 20px;
        }
      }
      .btn-green {
        width: 95%;
        background-color: #008443;
        color: #fff;
      }
    }
  }
}
@media screen and (max-width: 767px) {
  .header-wrapper {
    .logo {
      .logo-pic {
        width: 50px !important;
        height: 50px !important;
        margin-right: 0px;
        img {
          max-width: 100%;
          height: auto;
        }
      }
      .logo-text {
        font-size: 14px;
      }
    }
    .list {
      position: absolute;
      left: -200%;
      top: 0;
      width: 80vw;
      height: 100vh;
      background-color: #fff;
      transition: left 1s;
      ul {
        width: 100%;
        flex-direction: column;
        position: absolute;
        top: 0;
        padding-left: 0;
        li {
          width: 100%;
          padding: 10px 0;
          &.cancle {
            display: block;
            border-bottom: 2px solid #8e8e8e;
            i {
              color: green;
              font-size: 30px;
            }
          }
          a {
            padding: 5px 10px;
            font-size: 24px;
            font-weight: bold;
            color: green;
          }
        }
      }
    }
    .hamburger-menu {
      display: block;
    }
    .like-card,
    .cart-card {
      max-width: 300px;
      left: -200px;
      td {
        &.pic {
          display: none !important;
        }
      }
    }
  }
}
@media screen and (max-width: 380px) {
  .header-wrapper {
    .logo {
      .logo-pic {
        width: 50px !important;
        height: 50px !important;
        margin-right: 0px;
        img {
          max-width: 100%;
          height: auto;
        }
      }
      .logo-text {
        font-size: 14px;
      }
    }
    .list {
      ul {
        li {
          a {
            padding: 0px 3px;
            font-size: 24px;
            font-weight: bold;
          }
        }
      }
    }
    .like-card,
    .cart-card {
      max-width: 300px;
      top: 65px !important;
      left: -230px !important;
      td {
        &.pic {
          display: none !important;
        }
      }
    }
  }
}

.left0 {
  left: 0 !important;
}
</style>
