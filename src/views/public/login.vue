<template>
  <div class="loginForm">
    <h1>菜牛后台管理系统</h1>
    <el-form :model="userInfo" status-icon :rules="rules" ref="loginForm" class="demo-ruleForm">
      <el-form-item prop="phone">
        <el-input type="text" v-model="userInfo.phone" auto-complete="off" placeholder="请输入用户名" class="win-input"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="userInfo.password" auto-complete="off" placeholder="请输入密码" class="win-input"></el-input>
      </el-form-item>
      <el-form-item prop="imgCode" class="qhz-code-item">
        <el-input type="text" v-model="userInfo.imgCode" auto-complete="off" placeholder="请输入图形验证码" class="win-input"></el-input>
        <img :src="codeImg" alt="图形验证码" class="codeImg" @click="getImg">
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')" :loading="logining">login / 登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import "../../assets/js/canvas-nest.min"
  import * as types from '@/util/types'
  export default {
    data () {
      return {
        logining: false,
        codeImg: '/user/verificationcode',
        userInfo: {
          phone: '',
          password: '',
          imgCode: ''
        },
        token: null,
        rules: {
          phone: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          imgCode: [
            { required: true, message: '请输入图片验证码', trigger: 'blur' }
          ]
        }
      }
    },
    mounted(){
      this.$store.commit(types.TITLE, 'Login')
    },
    methods: {
      submitForm (formName) {
        var _this = this
        let loginFom = {
          username: this.userInfo.phone,
          password: this.userInfo.password,
          imageCode: this.userInfo.imgCode
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.logining = true
            _this.$fetch('/admin/login', loginFom).then(res => {
              _this.logining = false
              if (res.status === 200) {
                _this.$store.commit(types.LOGIN, this.token)
                _this.$router.push({path: '/list'})
              } else {
                _this.$message.error(res.msg + '请重新输入！')
                this.codeImg = '/user/verificationcode?' + Math.random()
                _this.userInfo.imgCode = ''
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getImg () {
        this.codeImg = '/user/verificationcode?' + Math.random()
      }
    }
  }
</script>
<style lang="less" scoped>
  .qhz-code-item .el-input {
    width: 225px;
  }
  .qhz-code-item .codeImg {
    cursor: pointer;
    display: inline-block;
    width: 145px;
    height: 30px;
  }
  .el-button--primary{
    width:100%;
  }
  .loginForm{
    h1{
      font-size:24px;
      font-weight:normal;
      text-align: center;
      line-height:30px;
      margin-bottom:10px;
    }
    padding:10px;
    width:400px;
    height:370px;
    position: absolute;
    top:50%;
    left:50%;
    margin-left:-400/2px;
    margin-top:-370/2px;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border:1px solid #eee;
    background: #fff;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
  }
</style>
