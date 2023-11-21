<template>
  <div class="container">
    <form class="filter-form">
      <select name="filter" id="filter">
        <option value="title" selected>제목</option>
        <option value="description">설명</option>
        <option value="state">상태</option>
        <option value="date">날짜</option>
      </select>
      <input type="text" placeholder="검색어를 입력하세요." />
      <button>검색</button>
    </form>
    <div class="list-contents">
      <button
        v-if="$store.state.showAddTodo == false"
        @click="$store.commit('changeShowAddTodo')"
        class="add-todo-button contents-white"
      >
        &#43;
      </button>
      <form v-if="$store.state.showAddTodo == true" class="input-card">
        <h2>Add Todo</h2>
        <VueDatePicker
          class="date-picker"
          calendar-class="date-picker"
          v-model="picked"
          placeholder="날짜를 선택해주세요."
          :enable-time-picker="false"
          :format="formatDate"
          @update:model-value="$store.commit('handleDateValue', picked)"
        />
        <select
          name="filter"
          id="addFilter"
          @change="$store.commit('handleProgressValue', $event.target.value)"
        >
          <option value="진행전" selected>진행전</option>
          <option value="진행중">진행중</option>
          <option value="완료">완료</option>
        </select>
        <input
          type="text"
          name="addTitle"
          id="addTitle"
          class="input"
          placeholder="제목을 입력하세요."
          @change="$store.commit('handleTitleValue', $event.target.value)"
        />
        <input
          type="text"
          name="addDescription"
          id="addDescription"
          class="input"
          placeholder="설명을 입력하세요."
          @change="$store.commit('handleDescriptionValue', $event.target.value)"
        />
        <button
          class="add-button button contents-white"
          @click="$store.commit('handleAddTodo')"
        >
          추가하기
        </button>
        <button
          class="cancel-button button contents-white"
          @click="$store.commit('changeHideAddTodo')"
        >
          취소
        </button>
      </form>
      <ul class="todo-list">
        <li
          v-for="todos in $store.state.todo"
          :key="todos.id"
          class="todo-card"
        >
          <h2 class="card-title contents-black">{{ todos.title }}</h2>
          <p class="card-description contents-gray">
            {{ todos.description }}
          </p>
          <span class="card-date contents-lightgray">{{ todos.date }}</span>
          <span class="card-state">{{ todos.progress }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";
export default {
  components: { VueDatePicker },
  name: "TabList",
  date() {
    return {
      date: null,
    };
  },
  setup() {
    const picked = ref(new Date());

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      // 날짜 앞에 0을 붙여야 하는 경우
      if (month || day < 10) {
        const zeroDay = ("00" + day).slice(-2);
        const zeroMonth = ("00" + month).slice(-2);

        return `${year}.${zeroMonth}.${zeroDay}`;
      } else {
        return `${year}.${month}.${day}`;
      }
    };
    // expose to template and other options API hooks
    return {
      picked,
      formatDate,
    };
  },
};
</script>

<style>
.add-todo-button {
  width: 100%;
  height: 30px;
  border: none;
  border-radius: 4px;
  background-color: rgba(51, 51, 51, 1);
  margin-top: 20px;
  transition: all 0.2s;
  font-size: 20px;
}
.add-todo-button:hover {
  background-color: rgba(51, 51, 51, 0.8);
}
.filter-form {
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
}
.filter-form select {
  width: 100px;
  height: 30px;
  padding: 0 8px;
  flex-shrink: 0;
  border: 1px solid #dddddd;
  border-radius: 4px;
  transition: all 0.2s;
  font-size: 12px;
}
.filter-form select:hover {
  border: 1px solid #aaaeb7;
}
.filter-form input {
  flex-grow: 1;
  height: 30px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 12px;
  padding: 0 92px 0 12px;
  transition: all 0.2s;
}
.filter-form button {
  position: absolute;
  right: 0;
  top: 0;
  width: 80px;
  height: 30px;
  background-color: rgba(118, 118, 118, 1);
  border: 1px solid rgba(118, 118, 118, 1);
  border-radius: 0 4px 4px 0;
  color: #ffffff;
  translate: all 0.2s;
}
.filter-form button:hover {
  background-color: rgba(118, 118, 118, 0.8);
}
.filter-form input:hover {
  border: 1px solid #aaaeb7;
}
.input-card {
  display: flex;
  flex-flow: row wrap;
  gap: 10px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #e7e7e7;
  border-radius: 16px;
  margin: 10px 0;
}
.input-card h2 {
  width: 100%;
  font-size: 16px;
}
.input-card select {
  width: 100px;
  height: 30px;
  padding: 0 8px;
  flex-shrink: 0;
  border: 1px solid #dddddd;
  border-radius: 4px;
  transition: all 0.2s;
  font-size: 12px;
}
.input-card select:hover {
  border: 1px solid #aaaeb7;
}
.input-card .input {
  width: 100%;
  height: 30px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 12px;
  padding: 0 12px;
  transition: all 0.2s;
}
.input-card .input:hover {
  border: 1px solid #aaaeb7;
}
.input-card .dp__input {
  height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  font-size: 12px;
}
.input-card .date-picker {
  width: calc(100% - 110px);
}
.input-card .button {
  width: calc(50% - 5px);
  height: 30px;
  border-radius: 4px;
  border: none;
  font-weight: 700;
  font-size: 12px;
  transition: all 0.2s;
}
.input-card .add-button {
  background-color: rgba(255, 134, 0, 1);
}
.input-card .add-button:hover {
  background-color: rgba(255, 134, 0, 0.8);
}
.input-card .cancel-button {
  background-color: rgba(118, 118, 118, 1);
}
.input-card .cancel-button:hover {
  background-color: rgba(118, 118, 118, 0.8);
}
.todo-card {
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  min-height: 89px;
  padding: 20px 12px;
  border-bottom: 1px solid #e7e7e7;
}
.todo-card:last-child {
  border-bottom: none;
}
.card-title,
.card-description {
  width: calc(100% - 80px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-title {
  font-weight: 700;
  font-size: 16px;
  text-align: left;
}
.card-description {
  font-weight: 400;
  margin-top: 8px;
  font-size: 14px;
  text-align: left;
}
.card-date,
.card-state {
  position: absolute;
}
.card-date {
  font-size: 12px;
  top: 20px;
  right: 12px;
}
.card-state {
  font-size: 14px;
  bottom: 20px;
  right: 12px;
}
</style>
