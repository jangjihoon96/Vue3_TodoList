<template>
  <h1>Todo List</h1>
  <ul class="tab">
    <li>
      <button
        class="tab-button list-button"
        :class="$store.state.tab === 1 ? 'active' : null"
        @click="
          $router
            .push('/Vue3_Todolist_Deploy')
            .then(() => $store.commit('handleTabChange', { tabValue: 1 }))
        "
      >
        목록 탭
      </button>
    </li>
    <li>
      <button
        class="tab-button stet-button"
        :class="$store.state.tab === 2 ? 'active' : null"
        @click="
          $router
            .push('/Vue3_Todolist_Deploy/stet')
            .then(() => $store.commit('handleTabChange', { tabValue: 2 }))
            .then(() => $store.commit('handleLineChartData'))
            .then(() => $store.commit('handleProgressData'))
        "
      >
        통계 탭
      </button>
    </li>
  </ul>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  color: #111111;
}
ul,
ol,
li {
  list-style: none;
}
select,
button {
  cursor: pointer;
}
.contents-primary {
  color: #ff8600;
}
.contents-white {
  color: #ffffff;
}
.contents-black {
  color: #1b1b1b;
}
.contents-gray {
  color: #767676;
}
.contents-lightgray {
  color: #999999;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1 {
  font-size: 24px;
}
.tab {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  gap: 16px;
  margin: 20px 0 10px 0;
}
.tab-button {
  background-color: transparent;
  border: none;
  padding: 2px;
  font-size: 16px;
}
.tab-button.active {
  color: #ff8600;
  border-bottom: 1px solid #ff8600;
}
.container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
}
</style>
