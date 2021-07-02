<template>
  <div class="slide">
    <!-- 圖片區 -->
    <div class="row mt-5">
      <div class="slideshow col-md-12 col-12 no-gutters">
        <ul>
          <li v-for="(img, index) in imgArray" :key="index" v-show="index===markIndex">
            <img :src="img" alt />
            <div class="shoptitle col-md-12 col-12">
              <p v-if="index==0">全部商品</p>
              <p v-if="index==1">老人專用餐具</p>
              <p v-if="index==2">輪椅</p>
              <p v-if="index==3">健康保健食品</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 小點點區 -->
    <div class="bar">
      <span
        v-for="(item,index) in imgArray"
        :key="index"
        @click="point(index)"
        :class="{'active': index===markIndex,'col-md-12':true,'col-12':true}"
      ></span>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      markIndex: 0, //小點點下標
      imgArray: [
        "https://images.unsplash.com/photo-1535397318751-32521c97e1c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=966&q=80",
        "https://images.unsplash.com/photo-1532431993925-00ed69b363bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1565615833231-e8c91a38a012?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1527844817887-9b937993518b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      ],
    };
  },
  methods: {
    point(index) {
      this.markIndex = index;
    },
    play() {
      let vm = this;
      setInterval(function () {
        vm.markIndex++;
        if (vm.markIndex >= vm.imgArray.length) {
          vm.markIndex = 0;
        }
      }, 5000);
    },
  },
  created() {
    this.play();
  },
};
</script>

<style lang="css" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 14px;
}

.slide {
  width: 80%;
  height: 550px;
  position: relative;
  margin: 0px auto;
  overflow: hidden;
}

.shoptitle {
  width: 60%;
  height: 25%;
  background-color: rgba(0, 0, 0, 0.25);
  position: absolute;
  z-index: 9;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

.shoptitle p {
  font-weight: 900;
  color: white;
  font-size: 30px;
}

.bar {
  position: absolute;
  left: 2%;
  top: 75%;
}

.bar span {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: white;
  margin-right: 15px;
}

.bar .active {
  width: 13px;
  height: 13px;
  margin-bottom: -1.5px;
  background-color: rgba(0, 0, 0, 0.35);
}

.col-md-12 img {
  width: 100%;
  height: 400px;
  background-position: center center;
  background-size: cover;
}

@media (max-width: 500px) {
  .slide {
    height: 400px;
  }
  .col-md-12 img {
    width: 100%;
    height: 300px;
  }
  .shoptitle p {
    font-size: 25px;
  }
  .shoptitle {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
  }
  .bar {
    display: none;
  }
}
</style>