<template>
  <div>
    <div class="topbar-logo topbar-btn">
      <!--<a href="/"><img src="../../static/i/logo.png" style="width:42px;margin-top: 5px;"></a>-->
    </div>
    <div class="topbar-title topbar-btn">
      <router-link to="/index">趣回租后台管理系统</router-link>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        sysUserName: ''
      }
    },
    mounted () {
    },
    methods: {
    }
  }
</script>



