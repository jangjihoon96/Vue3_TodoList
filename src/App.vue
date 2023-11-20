<template>
  <h4>안녕 {{ $store.state.name }}</h4>
  <button @click="$router.push('/list')">목록 탭</button>
  <button @click="$router.push('/stet')">통계 탭</button>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
