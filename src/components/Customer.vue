<template>
  <div>
    <h2 class="text-center mb-5 font-weight-bold mt-5">顧客回饋</h2>
    <div class="row no-gutters px-5 mb-5">
      <div
        class="col-md-2 col-6 boxrow"
        v-for="(item, index) in user"
        :key="index"
        @click="imgClick"
      >
        <img :src="item.picture.large" alt class="w-100 imgBox" />
        <p>{{msg[index]}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      user: [],
      msg: [
        "像極了愛情",
        "出貨迅速",
        "東西很美",
        "極力推薦",
        "優質賣家",
        "謝謝你唷",
        "交貨快",
        "貨品已收到",
        "超讚ㄉ賣家",
        "服務親切",
        "超滿意",
        "價錢公道",
      ],
      imgFlag: false,
    };
  },
  methods: {
    imgClick() {
      this.imgFlag = !this.imgFlag;
    },
  },
  created() {
    const vm = this;
    $.ajax({
      url: "https://randomuser.me/api/?results=12",
      dataType: "json",
      success: function (data) {
        vm.user = data.results;
      },
    });
  },
};
</script>

<style lang="scss" scoped>
.boxrow {
  overflow: hidden !important;
}
p {
  font-weight: bold;
  position: absolute;
  color: white;
  font-size: 20px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  z-index: 999;
  opacity: 0;
}

.boxrow:hover p {
  opacity: 1;
}

img {
  transition: all 0.3s ease-out;
}
.boxrow:hover img {
  transform: scale(1.2, 1.2);
  -webkit-filter: brightness(0.5);
}


.imgClick {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: flex-end;
}

@media (max-width: 500px) {
  .comment {
    font-size: 15px;
  }
}
</style>