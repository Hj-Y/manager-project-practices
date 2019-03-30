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
            <el-button type="success" round class="logout-btn">退出</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="my-container">
      <!-- 边栏 -->
      <el-aside width="200px" class="my-aside">
        <el-menu default-active="2" class="el-menu-vertical-demo" router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="/users">
                <span class="el-icon-menu"></span>
                选项1</el-menu-item>
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
  name: "index"
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
    background-color: #87cefa;
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
      background-color: #e9967a;
      padding-top: 0;
    }
  }
}
</style>
