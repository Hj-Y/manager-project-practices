<template>
  <div class="my-users">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 输入框 -->
    <!-- <div> -->
    <el-col :span="7">
      <el-input placeholder="请输入内容" v-model="sendData.query" @keyup.native.enter="search">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </el-col>
    <el-col :span="2">
      <el-button type="success" plain @click="addFormVisible=true">添加用户</el-button>
    </el-col>
    <!-- </div> -->
    <!-- 表格 -->
    <el-table :data="userList" style="width: 100%" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="stateChange(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain
            @click="handleEdit(scope.$index,scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
            @click="delData(scope.row)"
          ></el-button>
          <el-button
            type="warning"
            icon="el-icon-check"
            size="mini"
            plain
            @click="showRole(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-sizes="[5, 10, 15, 20]"
      :page-size="sendData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="addFormVisible">
      <el-form :model="addForm" ref="addForm" :rules="addRules">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 用户编辑 -->
    <el-dialog title="编辑用户" :visible.sync="editFormVisible">
      <el-form :model="editForm" ref="editForm" :rules="addRules">
        <el-form-item label="用户名" label-width="100px" prop="username">
          <el-input v-model="editForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户角色 -->
    <el-dialog title="用户角色" :visible.sync="roleFormVisible">
      <el-form>
        <el-form-item label="当前用户" label-width="100px"></el-form-item>
        <el-form-item label="请选择角色" label-width="100px">
          <el-select v-model="editUser.role_name" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitRole('editForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      total: 0,
      sendData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      userList: [],
      addForm: {
        username: "myaccount",
        password: "666666",
        email: "qq.@163.com",
        mobile: "16666666666"
      },
      editForm: {
        username: "myaccount",
        password: "666666",
        email: "qq.@163.com",
        mobile: "16666666666"
      },
      addFormVisible: false,
      editFormVisible: false,
      roleFormVisible: false,
      //用户角色列表
      roleList: [],
      //当前正在编辑的用户信息
      editUser: {},
      addRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 3, max: 16, message: "用户名长度在3-16之间", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 16, message: "密码长度在8-16之间", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    async handleEdit(index, row) {
      // console.log(index);
      let res = await this.$axios.get(`users/${row.id}`);
      this.editForm = res.data.data;
      if (res.data.meta.status === 200) {
        this.editFormVisible = true;
      }
      // let res = await this.$axios.put(`users/${row.id}`);
      // this.editForm = res.data.data;
      // if (res.data.meta.status === 200) {
      //   this.editFormVisible = true;
      // }
    },
    async search() {
      let res = await this.$axios.get("users", {
        // headers: {
        //   Authorization: window.sessionStorage.getItem("token")
        // },
        params: this.sendData
      });
      console.log(res);
      this.total = res.data.data.total;
      this.userList = res.data.data.users;
    },
    stateChange(row) {
      this.$axios.put(`users/${row.id}/state/${row.mg_state}`);
    },
    submitAdd(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res = await this.$axios.post("users", this.addForm);
          if (res.data.meta.status === 201) {
            this.search();
          }
          //关闭弹窗
          this.addFormVisible = false;
        } else {
          this.$message.warning("用户名密码都没得,你提交尼玛呢 ?");
          return false;
        }
      });
    },

    //用户编辑的提交
    async submitEdit(formName) {
      let res = await this.$axios.put(`users/${this.editForm.id}`, {
        email: this.editForm.email,
        mobile: this.editForm.mobile
      });
      if (res.data.meta.status === 200) {
        this.search();
      }
      //关闭弹窗
      this.editFormVisible = false;
    },
    //删除用户的方法
    delData(row) {
      // let res=this.$axios.delete(`users/${row.id}`)
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await this.$axios.delete(`users/${row.id}`);
          if (res.data.meta.status == 200) {
            this.search();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //用户角色编辑列表的显示
    async showRole(row) {
      this.roleFormVisible = true;
      // 保存用户编辑的信息
      this.editUser = row;
      // 获取所有角色列表
      let res = await this.$axios.get("roles");
      this.roleList = res.data.data;
    },
    async submitRole(formName) {
      let res = await this.$axios.put(`users/${this.editUser.id}/role`, {
        rid: this.editUser.role_name
      });
      if (res.data.meta.status === 200) {
        this.roleFormVisible = false;
        this.search();
      }
    }
  },
  created() {
    this.search();
  }
};
</script>

<style lang="scss">
.breadcrumb {
  background: #d3dce6;
  height: 50px;
  line-height: 50px;
  //  padding: 0;
}
</style>
