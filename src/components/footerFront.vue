<template>
  <div class="wrap">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="h4 my-4 text-left">關於我們</div>
          <p >將來世界各地的人們都更容易受到細菌和病毒的侵害，我們必須運用科技來改善人們的生活。</p>
        </div>

        <div class="col-md-3">
          <div class="h4 my-4 text-left ">快速連結</div>
         <ul class="ahref text-left">
           <li><a href="#">首頁</a></li>
           <li><a href="#">最新資訊</a></li>
           <li><a href="#">商品</a></li>
         </ul>
        </div>

        <div class="col-md-3">
          <div class="h4 my-4 text-left">連絡我們</div>
         <ul class="ahref text-left">
           <li>
             <i class="fas fa-phone-alt"></i>
             <span>Phone</span>
             <p class="mt-2">  
               0800-090-000
               <br>
               0800-090-000
             </p>
           </li>

           <li>
             <i class="fas fa-envelope"></i>
             <span>Email</span>
             <p class="mt-2">  
               abcd1234@gmail.com
             </p>
           </li>

           
           <li>
             <i class="fas fa-map-marker"></i>
             <span>Address</span>
             <p class="mt-2">  
               <p class="mt-2">  
               Taiwan (R.O.C.)
             </p>
             </p>
           </li>
         </ul>
        </div>

        <div class="icon-wrapper  ">
             <div class="col-md-3 ">
          <div class="h4 my-4 text-right">
            <a href="javascript:;">
            <i class="fab fa-facebook fa-2x"></i>
            </a>
        </div>
           <div class="h4 my-4 text-right">
            <a href="https://github.com/M055165">
            <i class="fab fa-github fa-2x"></i>
            </a>
        </div>
        </div>
        </div>
    

      </div>
      <span class="copy"> Copyright © 2020 僅做為個人學習使用，非商業用途。</span> 
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  .wrap {
    background-color: #DEE2E6;
  }
  a {
    color:#008443;
    text-decoration: none;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  .row  {
    text-align: left;
    font-size: 16px;
    line-height: 1.5;
    color:#008443
  }


  .row .ahref>li {
    display: block;
    text-align: left;
    list-style:noe;
    margin-top: 10px;
    font-size:18px;
  }

  .row .ahref>li a:hover {
    color:#00381c
  }
  .h4 {
    font-weight: 700;
  }
  li i {
    margin-right: 8px;
  }

  .copy {
    color:#008443
  }
  @media screen and (max-width: 767px) {
    .wrap {
    padding:10px 6vw;
    }
    .icon-wrapper {
      margin: 0px auto;
      div {
        display: inline-block;
        margin-right: 15px;
      }
    }
  }
</style>