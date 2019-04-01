<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{sectitle}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{thirdtitle}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
    props:['sectitle','thirdtitle']
};
</script>

<style>
.breadcrumb {
  background: #d3dce6;
  height: 50px;
  line-height: 50px;
 
}
</style>
