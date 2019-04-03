<template>
  <div class="my-users">
    <!-- 面包屑导航 -->
    <breadcrumb sectitle="订单管理" thirdtitle="订单列表"></breadcrumb>

    <!-- </div> -->
    <!-- 表格 -->
    <el-table :data="orderList" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="180"></el-table-column>
      <el-table-column prop="order_pay" label="是否付款">
        <template slot-scope="scope">
          <el-button v-if="scope.row.order_pay==='0'" type="danger" size="mini" plain>未付款</el-button>
          <el-button v-if="scope.row.order_pay==='1'" type="success" size="mini" plain>已付款</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"></el-table-column>
      <el-table-column prop="create_time" label="下单时间">
        <template slot-scope="scope">{{scope.row.create_time | formatTime("YYYY-MM-DD hh-mm")}}</template>
      </el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain
            @click="dialogFormVisible=true"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-sizes="[5, 10, 15, 20]"
      :page-size="1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange"
    ></el-pagination>
    <!-- 点击按钮弹出的对话框 -->
    <el-dialog title="修改订单地址" :visible.sync="dialogFormVisible">
      <el-form >
        <el-form-item label="省市区/县" >
          <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions"
          >
          </el-cascader>
          <v-distpicker province="广东省" city="深圳市" area="宝安区"></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址" label-width="80px">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
import province from '../assets/city_data2017_element.js'
export default {
  name: "users",
  components: { VDistpicker },
  data() {
    return {
      orderList: [],
      sendData: {
        pagesize: 10,
        pagenum: 1
      },
      total: 0,
      dialogFormVisible: false,
      options:province,
      selectedOptions: []
    };
  },
  methods: {
    async getOrderList() {
      let res = await this.$axios.get("orders", {
        params: this.sendData
      });
      // console.log(res);
      this.orderList = res.data.data.goods;
      this.total = res.data.data.total;
    },
    sizeChange(size) {
      this.sendData.pagesize = size;
      this.getOrderList();
    },
    currentChange(current) {
      this.sendData.pagenum = current;
      this.getOrderList();
    }
  },
  created() {
    this.getOrderList();
  }
};
</script>

<style lang="scss">
.my-users {
  background-color: #e9eef3;
}
</style>
