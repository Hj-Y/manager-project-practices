<template>
  <div class="login">
    <!-- 居中的盒子 -->
    <div class="box">
      <!-- 标题 -->
      <h2>用户登录</h2>
      <!-- 饿了么ui的form -->
      <el-form
        label-position="top"
        label-width="80px"
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit('loginForm')">登录</el-button>
          <el-button type="success" @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      // 表单数据
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 5, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ]
      }

      // 表单验证 规则
    };
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await this.$axios.post("login", this.loginForm);
          //失败
          if (res.data.meta.status === 400) {
            this.$message.error(res.data.meta.msg);
            // 成功
          } else if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg);
            window.sessionStorage.setItem("token", res.data.data.token);
            //编程式导航
            this.$router.push("/");
          }
        } else {
          this.$message.error("输入格式错误,请根据提示修改");
          return false;
        }
      });
    },
    resetForm(formName) {
      //  console.log(this.$refs);

      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang='scss'>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #324152;
  .box {
    width: 550px;
    padding: 35px;
    border-radius: 10px;
    // 怪异盒模型
    box-sizing: border-box;
    // height: 420px;
    background: white;
    .my-btn {
      width: 100%;
    }
  }
}
</style>
