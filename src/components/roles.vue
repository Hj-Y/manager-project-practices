<template>
  <div class="my-users">
    <!-- 面包屑导航 -->
    <breadcrumb sectitle="用户管理" thirdtitle="用户列表"></breadcrumb>

    <!-- 输入框 -->
    <!-- <div> -->
    <el-col :span="2">
      <el-button type="default" plain @click="addFormVisible=true">添加角色</el-button>
    </el-col>
    <!-- </div> -->
    <!-- 表格 -->
    <el-table style="width: 100%" border :data="roleList">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="角色名称" width="180"></el-table-column>
      <el-table-column label="角色描述" width="180"></el-table-column>
      <el-table-column label="操作">
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
  </div>
</template>

<script>
export default {
  name: "roles",
  data() {
    return {
      roleList:[{},{}]
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
      console.log(res);

      if (res.data.meta.status === 200) {
        this.roleFormVisible = false;
        this.search();
      }
    }
  },
  created() {}
};
</script>

<style lang="scss">
.my-users {
  background-color: #e9eef3;
}
</style>
