<template>
  <div class="my-users">
    <!-- 面包屑导航 -->
    <breadcrumb sectitle="订单管理" thirdtitle="订单列表"></breadcrumb>
    

    <!-- </div> -->
    <!-- 表格 -->
    <el-table :data="orderList" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="email" label="订单价格" width="180"></el-table-column>
      <el-table-column prop="mobile" label="是否付款">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            plain
          >未付款</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="是否发货"></el-table-column>
      <el-table-column prop="mobile" label="下单时间"></el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
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
      orderList:[{},{}]
    };
  },
  
};
</script>

<style lang="scss">
.my-users{
  background-color: #e9eef3;
}

</style>
