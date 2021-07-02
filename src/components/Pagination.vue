<!-- Pagination -->
<template>
  <div>
    <div class="Pagination-wrapper">
      <span class="left" @click.prevent="updatapage(getpagination.current_page-1)" :class="{ 'not-active' : !getpagination.has_pre }">
        <a href="javascript:;" ><<</a>
      </span>
      <ul>
       <li v-for="page in getpagination.total_pages" :key="n=page" @click.prevent="updatapage(page)" :class="{'pageGreen': getpagination.current_page === page }">{{page}}</li>
      </ul>
      <span @click.prevent="updatapage(getpagination.current_page + 1)" :class="{ 'not-active' : !getpagination.has_next }">
        <a href="javascript:;" >>></a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
   props: ['getpagination'],
   methods:{
     updatapage(page) {
      this.$emit('userpage', page);
    },
   }
};
</script>

<style lang="scss">
$green : #008443;
.not-active {
  pointer-events: none;
  cursor: default;
  text-decoration: none;
  color: black;
}
.pageGreen {
  background: $green!important;
  color:white!important;
}
.Pagination-wrapper {
  display: flex;
  justify-content: center;
  span {
    text-align: center;
    width: 35px;
    display: inline-block;
    padding: 8px 12px;
    border: 1px solid #dee2e6;
    border-top-right-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
    &:hover {
        background-color: #dee2e6;
      }
    a {
      color:black;
      text-decoration: none;
      font-size: 1px;
    }
    &.left {
      border-top-right-radius: 0rem;
      border-bottom-right-radius: 0rem;
      border-top-left-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;
    }
  }
  ul {
    display: inline-block;
    margin: 0;
    padding: 0;
    li {
      display: inline-block;
      padding: 8px 12px;
      width: 35px;
      border: 1px solid #dee2e6;
      cursor: pointer;
      &:hover {
        background-color: #dee2e6;
      }
    }
  }
}
</style>