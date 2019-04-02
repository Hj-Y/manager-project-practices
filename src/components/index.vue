<template>
  <el-container class="index-container">
    <!-- 头部 -->
    <el-header class="my-header">
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <img src="../assets/logo.png" alt>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            <h2>后台管理</h2>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary" round class="logout-btn" @click="logout">退出</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="my-container">
      <!-- 边栏 -->
      <el-aside width="200px" class="my-aside">
        <el-menu default-active="users" class="el-menu-vertical-demo" router>
          <el-submenu :index="item.id+''" v-for="item in menuList">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="it.path" v-for="it in item.children">
              <span class="el-icon-menu"></span>
              {{it.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体 -->
      <el-main class="my-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      menuList: []
    };
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem("token");
      //编程式导航
      this.$router.push("/login");
    }
  },
  beforeCreate() {
    if (window.sessionStorage.getItem("token")) {
    } else {
      this.$message.error("请您先登录呢亲!");
      this.$router.push("/login");
    }
  },
  async created() {
    let res = await this.$axios.get("menus");
    console.log(res);

    this.menuList = res.data.data;
  }
};
</script>

<style lang="scss">
.index-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .my-header {
    height: 60px;
    line-height: 60px;
    background-color: #40e0d0;
    h2 {
      margin: 0;
      padding: 0;
      text-align: center;
    }
    .logout-btn {
      width: 100%;
    }
  }
  .my-container {
    flex: 1;
    .my-aside {
      background: #40e0d0;
    }
    .my-main {
      background-color: #e9eef3;
      padding-top: 0;
    }
  }
}
</style>
