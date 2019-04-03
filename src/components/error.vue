<template>
  <div>
    <img class="pic" src="../assets/18.jpg" alt>
  </div>
</template>

<script>
export default {
  name: "error",
  created() {
    setTimeout(() => {
      this.$router.push("/login");
    }, 3000);
  }
};
</script>

<style>
.pic {
  display: block;
  width: 100%;
}
</style>
