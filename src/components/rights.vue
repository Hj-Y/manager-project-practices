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
    <el-table style="width: 100%" border :data="rightList">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级" width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-if="scope.row.level==='1'">二级</span>
          <span v-if="scope.row.level==='2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "rights",
  data() {
    return {
      rightList: []
    };
  },

  async created() {
    let res = await this.$axios.get("rights/list");
    // console.log(res);
    this.rightList = res.data.data;
  }
};
</script>

<style lang="scss">
.my-users {
  background-color: #e9eef3;
}
</style>
