<template>
  <div class="my-users">
    <!-- 面包屑导航 -->
    <breadcrumb sectitle="用户管理" thirdtitle="用户列表"></breadcrumb>
    
    <!-- 输入框 -->
    <!-- <div> -->
    <el-col :span="2">
      <el-button type="success" plain @click="addFormVisible=true">添加角色</el-button>
    </el-col>
    <!-- </div> -->
    <!-- 表格 -->
    <el-table style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column  label="权限名称" width="180"></el-table-column>
      <el-table-column  label="路径" width="180"></el-table-column>
      <el-table-column  label="层级" width="180"></el-table-column>
      
    </el-table>
  </div>
</template>

<script>
export default {
  name: "rights",
  created() {
    
  }
};
</script>

<style lang="scss">
.my-users{
  background-color: #e9eef3;
}

</style>
