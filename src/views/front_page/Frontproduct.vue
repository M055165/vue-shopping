<template class="mt-5">
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="product-bg"></div>
    <div class="containter products-wrapper">
      <div class="row">
        <div class="col-md-3">
          <ul class="products-category">
            <div class="all">
              <p>產品列表</p>
            </div>
            <li @click="filterProducts(),greenChange(0)" :class="{'active':flag0}">全部商品</li>
            <li @click="filterProducts('老人專用餐具'),greenChange(1)" :class="{'active':flag1}">老年人專用餐具</li>
            <li @click="filterProducts('老人專用輪椅'),greenChange(2)" :class="{'active':flag2}">老年人專用輪椅</li>
            <li @click="filterProducts('保健食品'),greenChange(3)" :class="{'active':flag3}">健康保健食品</li>
            <div class="form-group has-search mt-2">
              <input type="text" class="search_box" placeholder="Search" />
              <span class="fa fa-search search_icon omouse"></span>
            </div>
          </ul>
        </div>
        <div class="col-md-9">
          <div class="products-list">
            <div class="row">
              <div
                class="col-md-4"
                v-for="(item,index) in displayProducts"
                :key="index"
                @click="turnproduct(item.id, item.category)"
              >
                <div class="products-card">
                  <div class="box-pic">
                    <img :src="displayProducts[index].image" alt />
                    <div class="loveAndCart">
                      <div class="love">
                        <i class="fas fa-heart fa-2x text-black" @click.stop="addtoFavorite(item)"></i>
                      </div>
                      <div class="cart">
                        <i
                          class="fas fa-shopping-cart fa-2x"
                          @click.stop="addtoCar(item.id,1,item.title)"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div class="box-text">
                    <span>{{item.category}}</span>
                    <p class="h1">{{item.title}}</p>
                    <small>{{item.origin_price | currency}}</small>
                    <p class="h2">{{item.price | currency}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <frontpagination
        :getpagination="pagination"
        @userpage="getpages"
        v-if="displayProducts.length>9 || pagination.current_page>1"
      ></frontpagination>
    </div>
  </div>
</template>

<script>
import frontpagination from "../../components/Pagination.vue";
export default {
  data() {
    return {
      products: [],
      pagesproducts: [],
      displayProducts: [],
      pagination: {},
      isLoading: false,
      flag0: true,
      flag1: false,
      flag2: false,
      flag3: false,
      favorites: [],
      Cart: [],
    };
  },
  methods: {
    getProducts(page = 1) {
      const api = `https://vue-course-api.herokuapp.com/api/ace055165/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.products = response.data.products;
        vm.displayProducts = vm.products;
        (vm.isLoading = false), (vm.pagination = response.data.pagination);
      });
    },
    filterProducts(category) {
      let vm = this;
      this.displayProducts = this.products.filter(function (item) {
        vm.pagination.current_page = 1;
        if (!category) {
          return item;
        }
        return item.category == category;
      });
    },
    greenChange(index) {
      this.flag0 = false;
      this.flag1 = false;
      this.flag2 = false;
      this.flag3 = false;
      if (index == 0) {
        this.flag0 = true;
      } else if (index == 1) {
        this.flag1 = true;
      } else if (index == 2) {
        this.flag2 = true;
      } else if (index == 3) {
        this.flag3 = true;
      }
    },
    getpages(page = 1) {
      const vm = this;
      const url = `https://vue-course-api.herokuapp.com/api/ace055165/products?page=${page}`;
      vm.$http.get(url).then((response) => {
        vm.displayProducts = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    turnproduct(id, category) {
      this.$router.replace({
        name: "frontProductIn",
        query: {
          id,
          category,
        },
      })
    },
    addtoFavorite(item) {
      const vm = this;
      if (vm.favorites.length > 0) {
        //查看加到我的最愛的項目是否已經在名單裡
        const currentValue = vm.favorites.find(
          (product) => item.id === product.id
        );
        if (!currentValue) {
          //如果沒有，就新增
          vm.favorites.push(item);
        }
      } else {
        vm.favorites.push(item);
      }
      localStorage.setItem("Favorites", JSON.stringify(vm.favorites));
      this.gettoFavorite();
    },
    gettoFavorite() {
      const vm = this;
      vm.favorites = JSON.parse(localStorage.getItem("Favorites")) || [];
    },
    gettoCart() {
      const vm = this;
      const url = `https://vue-course-api.herokuapp.com/api/ace055165/cart`;
      vm.$http.get(url).then((response) => {
        vm.Cart = response.data.data;
      });
    },
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
        vm.$http.post(url, { data: car }).then((data) => {
          vm.gettoCart();
        });
      });
    },
  },
  components: {
    frontpagination,
  },
  created() {
    this.getProducts();
    this.gettoFavorite();
  },
};
</script>

<style lang="scss" scoped>
.product-bg {
  width: 100%;
  height: 400px;
  background-image: url(https://ted808387.github.io/em-cli4x/img/productbg.62e89e81.jpg);
  background-position: 50%;
  background-size: cover;
  z-index: -10;
}

$green: #008443;
.active {
  color: $green !important;
  border-bottom: 3px solid $green !important;
}
.products-wrapper {
  padding: 100px 6vw;
  .products-category {
    font-weight: bold;
    text-decoration: none;
    list-style: none;
    position: -webkit-sticky;
    position: sticky;
    top: 100px;
    .all {
      p {
        text-align: left;
        font-size: 24px;
        padding: 12px;
        color: $green;
        border: 3px solid $green;
        font-weight: bold;
      }
    }
    li {
      cursor: pointer;
      text-align: left;
      padding: 12px 0;
      padding-left: 1.5em;
      border-bottom: 1px solid;
      font-size: 16px;
    }
    .has-search {
      position: relative;
    }
    .search_box {
      width: 100%;
      padding: 10px;
      padding-left: 30px;
      border: 1px solid #9e9e9e;
    }
    .search_box:focus {
      outline-color: #094d2b;
      border-color: #fff;
      box-shadow: 0 0 3px #ccc;
    }
    .search_icon {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
    }
    .wait_icon {
      position: absolute;
      top: 30%;
      left: 5px;
      transform: translateY(-50%);
    }
  }
  .products-list {
    padding-right: 6vw;
    .products-card {
      margin-bottom: 50px;
      .box-pic {
        width: 100%;
        display: block;
        position: relative;
        &:hover {
          .loveAndCart {
            opacity: 1;
          }
          img {
            -webkit-filter: brightness(0.5) !important;
          }
        }
        img {
          width: 100%;
          max-width: 100%;
          height: 149px;
        }
        .loveAndCart {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          width: 50%;
          opacity: 0;
          transition: opacity 0.7s;
          .love {
            width: 50%;
            background-color: $green;
            padding: 15px 0;
            margin-right: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover {
              -webkit-filter: brightness(0.5) !important;
            }
          }
          .cart {
            width: 50%;
            background-color: $green;
            padding: 15px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            &:hover {
              -webkit-filter: brightness(0.5) !important;
            }
          }
        }
      }
      .box-text {
        padding: 10px 0;
        text-align: center;
        span {
          color: #8a8a8a8a;
          font-size: 20px;
          font-weight: bold;
        }
        .h1 {
          color: #212529;
          font-size: 20px;
          font-weight: bold;
        }
        small {
          color: #212529;
          font-size: 14px;
          text-decoration: line-through;
          font-weight: bold;
        }
        .h2 {
          color: #212529;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .products-wrapper {
    padding: 30px 6vw;
    .products-category {
      margin-left: 0;
      padding: 0px 15px;
    }
    .products-list {
      padding: 30px 20px;
    }
  }
}
</style>