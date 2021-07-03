<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <section class="productsin">
      <div class="productIn-bg"></div>
      <div class="productIn-wrapper">
        <div class="toastBar">
          <router-link to="/frontproduct" class="toast-list">商品</router-link>&nbsp;/&nbsp;
          <router-link to="/" class="toast-list">口罩</router-link>&nbsp;/&nbsp;
          <span>工業用P95口罩</span>
        </div>
        <div class="productIn-box">
          <div class="row">
            <div class="col-md-8">
              <div class="box-pic" :src="product.imageUrl" :style="{backgroundImage: `url(${ product.image })`}">
                <!-- <img
                  src="https://storage.googleapis.com/vue-course-api.appspot.com/tedcode%2F1583988100843.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=KNlSBUHlqcVyU7m311XyAjR9a5ptDdfjeGKpn%2FtJTMvOIgbijrQvh02y8s7m0uirVGCImQZXhAcgz3aDmKr0RmdSodArIAUWygONooffX4xGdt1taV0f0s%2FF03AN5n45dEamGpzgQHopWt%2Fx5idEwnl%2FgEdP8d0MzoHec3qvLgBX6OwTAe%2BXUKuY8EDNGgftafwGTgSYbpWiMQOCI6a%2FsfJupNTD0Uy%2BbhHA6XypAPT2a3ZySLEB0QhtFTcqai%2BEt1NZCc8IsFNmkLd7X%2B3Sq6rwyhwBSr6VA9DpDZ3cBonAPDJ4EaxZld2ABa%2BDGFr93Qz75LgbimMp8%2FjZn6pf9A%3D%3D"
                  alt
                />-->
              </div>
            </div>
            <div class="col-md-4">
              <div class="box-text">
                <h5 class="products-type">{{ product.category }}</h5>
                <h3 class="products-name">{{ product.title }}</h3>
                <del class="products-oldP d-inline-block">{{ product.origin_price | currency }}</del>
                <h2 class="products-newP d-inline-block">{{ product.price | currency }}</h2>
                <span class="products-comment d-block">{{ product.description }}</span>
                <hr />
                <ul class="pl-4">
                  <li class="products-list">“高齡社會” 正式成為臺灣身份之一！</li>
                  <li class="products-list">臺灣六十五歲以上老年人口佔總人口比率在 2018 三月底達到 14.05%</li>
                  <li class="products-list">達到世界衛生組織定義的「高齡社會」</li>
                  <li class="products-list">也就是說，每 7 人中便有 1 人是老人</li>
                  <li class="products-list">確認人口高齡化在臺已是不爭事實</li>
                  <li class="products-list">讓老年人議題變得更加刻不容緩。</li>
                </ul>
                <h5 class="text-danger">
                  <i class="fas fa-exclamation-triangle"></i>
                </h5>
                <p class="text-danger">面對高齡化滲透的加劇，在中央政府的領導下，雖相繼推出一些相應措施，但長期而言，仍需要各縣市政府及相關單位、民間團體等，甚至是每位民眾肩負重任，一起努力，共同迎接高齡社會的到來。</p>
                <div class="buyproduct mt-3">
                  <div class="select_quantity">
                    <button class="minus" @click="plus(-1)" >-</button>
                    <input class="quantity" type="number" value="1" min="1" max="100" />
                    <button class="plus" @click="plus(1)" >+</button>
                  </div>
                  <a href="#" class="btn btn-green">加到購物車</a>
                </div>
                <div class="product-Fprice">
                  <div class="total-price text-muted text-nowrap mt-3">
                    <strong class="text-">NT 250</strong> 元
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="question">
          <h3 class="font-weight-bold">常見問題FAQ</h3>
          <ul class="list-unstyled pl-2">
            <li class="product-list">
              <i class="text-style text-primary font-weight-bold">我已經下標商品了，請問何時出貨呢?</i>
              <br />訂單成立後，現貨商品為3天內出貨，預購商品為追加期1~4週。
            </li>
            <li class="product-list">
              <i class="text-style text-primary font-weight-bold">可以更改取件門市或地址嗎?</i>
              <br />在商品還未寄出之前是可以的，請與我們聯絡，我們會登記幫您做更改。
            </li>
            <li class="product-list">
              <i class="text-style text-primary font-weight-bold">我收到錯的商品或嚴重瑕疵商品如何處理?</i>
              <br />請於收到商品後3天內拍照與我們聯絡，逾期不受理唷!
            </li>
            <li class="product-list">
              <i class="text-style text-primary font-weight-bold">訂單成立後可以取消訂單嗎?</i>
              <br />訂單成立後就會幫您追加商品囉，故無法取消訂單，若超過追加期間1~4週，您可以聯絡我們先幫您拆單寄出，運費會由我們承擔
            </li>
            <li class="product-list">
              <i class="text-style text-primary font-weight-bold">請問需要付運費嗎?</i>
              <br />現階段為促銷期間，商品通通免運費喔
            </li>
            <li class="product-list">
              <i class="text-style text-primary font-weight-bold">如欲訂購數量較多的產品，可直接向公司訂購嗎？</i>
              <br />需大量訂購時，請您直接與我們連絡。
            </li>
            <li class="product-list">
              <i class="text-style text-primary font-weight-bold">如何計算七天鑑賞期</i>
              <br />根據消費者保護法之規定，您享有商品到貨的七日鑑賞期權益，是由消費者收到商品的隔日開始算起至第7天止，為七日鑑賞期限。
              <br />如有以下狀況則無法辦理退貨：
              <br />• 如有化妝請特別小心，商品沾染到粉妝時，請恕無法接受退貨。
              <br />• 非正常損壞痕跡
              <br />• 商品配件不全
              <br />• 超過七天鑑賞期
            </li>
          </ul>
          <h5 class="font-weight-bold">
            <i class="fas fa-exclamation-circle text-primary"></i>疫情的防護
          </h5>
          <p
            class="pl-2"
          >健康民眾則不需要戴N95口罩，一般外科口罩就有足夠的防護力。防範嚴重特殊傳染性肺炎最有效的方法為勤洗手，可以用肥皂濕洗手或乾洗手，正確的乾洗手使用量只要2至5CC即可，不需要過多。</p>
        </div>
        <hr />
        <recommend :recommandList="itemcategory"></recommend>
      </div>
    </section>
  </div>
</template>

<script>
import recommend from "../../components/Recommand";

export default {
  data() {
    return {
      isLoading: false,
      product:{},
      itemcategory:'',
    };
  },
  components: {
    recommend,
  },
  methods: {
    getproduct(id, category) {
      const vm = this;
      vm.itemcategory = category;
      const url = `https://vue-course-api.herokuapp.com/api/ace055165/product/${id}`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        vm.product = response.data.product;
        vm.product.num = 0;
        vm.isLoading = false;
      });
    },
    plus(index){
      let quantityDom = document.getElementsByClassName('quantity')
      let quantity = parseInt(quantityDom[0].value)+index
      console.log(quantity)
      if(quantity<1){
        quantity = 1
      }
      quantityDom[0].value = quantity
    }
  },
  created() {
    const vm = this;
    vm.getproduct(vm.$route.query.id, vm.$route.query.category);
  },
};
</script>

<style lang="scss" scoped>
$green: #008443;
.productsin {
  .productIn-bg {
    height: 200px;
    width: 100%;
    background-image: url("https://images.unsplash.com/photo-1505051508008-923feaf90180?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80");
    background-size: cover;
    background-position: center center;
  }
  .productIn-wrapper {
    padding: 40px 12vw;
    text-align: left;
    .toastBar {
      font-size: 20px;
      font-weight: bold;
      .toast-list {
        color: #008443;
        text-decoration: none;
      }
      span {
        color: darkgreen;
      }
    }
    .productIn-box {
      margin-top: 20px;
      .box-pic {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }
      .box-text {
        .products-type {
          color: #8a8a8a;
        }
        .products-name {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 16px;
        }
        .products-newP {
          color: $green;
          font-size: 28px;
          font-weight: bold;
          margin-left: 10px;
        }
        ul {
          .products-list {
            letter-spacing: 1.2px;
            line-height: 1.5;
            margin: 10px;
            font-size: 16px;
          }
        }
        p {
          letter-spacing: 2px;
        }
        .buyproduct {
          display: flex;
          justify-content: space-between;
          .btn-green {
            background: $green;
            display: inline-block;
            color: #fff;
          }
          .select_quantity {
            display: flex;
            .minus {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 40px;
              height: 40px;
            }
            .plus {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 40px;
              height: 40px;
            }
            .quantity {
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
            }
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
              -webkit-appearance: none !important;
              margin: 0;
            }
          }
        }
        .product-Fprice {
          columns: #6c757d;
          text-align: right;
          font-size: 24px;
          margin-top: 20px;
        }
      }
    }
    .question {
      margin-top: 20px;
      letter-spacing: 1.2px;
      .product-list {
        margin: 20px;
        font-size: 16px;
        i {
          font-style: normal;
        }
      }
      .text-primary {
        color: $green !important;
      }
    }
    .products-relate {
      .relate-title {
        font-size: 28px;
        margin-bottom: 20px;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .productIn-wrapper {
    padding: 10px 15px !important;
  }
  .box-pic {
    height: 300px !important;
  }
  .products-type {
    margin-top: 20px;
  }
}
</style>