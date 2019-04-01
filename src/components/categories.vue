<template>
  <div class="my-users">
    <!-- 面包屑导航 -->
    <breadcrumb sectitle="商品管理" thirdtitle="商品分类"></breadcrumb>
    
    <!-- 输入框 -->
    <!-- <div> -->
    <el-col :span="2">
      <el-button type="success" plain >添加商品</el-button>
    </el-col>
    <!-- </div> -->
    <!-- 表格 -->
    <el-table :data="cateList" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="分类名称" width="180"></el-table-column>
      <el-table-column prop="email" label="级别" width="180"></el-table-column>
      <el-table-column prop="mobile" label="是否有效"></el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-sizes="[5, 10, 15, 20]"
      :page-size='1'
      layout="total, sizes, prev, pager, next, jumper"
      :total="1"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      cateList:[{},{}]
    };
  },
  
};
</script>

<style lang="scss">
.my-users{
  background-color: #e9eef3;
}

</style>
