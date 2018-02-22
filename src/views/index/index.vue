<template>
  <section>
    <el-row class="qhz-container">
      <!--头部-->
      <el-col :span="24" class="qhz-head-nav" id="top-head">
        <header-top></header-top>
      </el-col>
      <!--中间页面-->
      <el-col :span="24" class="main">
        <el-col class="content-container">
          <div class="grid-content bg-purple-light">
            <el-col :span="24" class="content-wrapper">
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-col>
          </div>
        </el-col>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  function addClass(ele,cName) {
    var arr = ele.className.split(' ').concat(cName.split(" "));
    for(var i=0;i<arr.length;i++){
      for(var k=arr.length-1;k>i;k--){
        (arr[k]==="")&&arr.splice(k,1);
        (arr[i]===arr[k])&&arr.splice(k,1);
      }
    }
    ele.className = arr.join(" ");
  }
  function removeClass(ele,cName) {
    var arr1 = ele.className.split(' ');
    var arr2 = cName.split(" ");
    for(var i=0;i<arr2.length;i++)for(var j=arr1.length-1;j>=0;j--)(arr2[i]===arr1[j])&&arr1.splice(j,1)
    ele.className = arr1.join(" ")
  }
  function fixed(){
    var classVal = document.getElementById('searchBox')
    var t = document.documentElement.scrollTop || document.body.scrollTop
    console.log(t)
    if(t >= 90){
      addClass(classVal,'fixednav')
    }else{
      removeClass(classVal,'fixednav')
    }
  }
  window.onload = function(){
    fixed()
  }
  window.onscroll = function(){
    fixed()
  }
  import leftNav from '@/components/leftNav'
  import headerTop from '@/components/Header'
  export default {
    data () {
      return {

      }
    },
    components: {
      leftNav,
      headerTop
    }
  }
</script>
<style >
</style>
