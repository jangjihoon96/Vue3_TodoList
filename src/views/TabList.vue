<template>
  <div class="container">
    <form class="filter-form">
      <select
        name="filter"
        id="filter"
        @change="$store.commit('handleCategory', $event.target.value)"
      >
        <option value="제목" :selected="$store.state.category === '제목'">
          제목
        </option>
        <option value="설명" :selected="$store.state.category === '설명'">
          설명
        </option>
        <option value="상태" :selected="$store.state.category === '상태'">
          상태
        </option>
        <option value="날짜" :selected="$store.state.category === '날짜'">
          날짜
        </option>
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
        <div class="date-picker">
          <input
            class="datejs-input"
            type="date"
            v-model="$store.state.selectedDate"
            :placeholder="$store.state.selectedDate"
          />
        </div>
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
          <div
            v-if="todos.edit === false"
            class="todo-card-content"
            @click="
              $store.commit('handleOpenEdit', {
                id: todos.id,
                title: todos.title,
                description: todos.description,
                selectedDate: todos.selectedDate,
              })
            "
          >
            <h2 class="card-title contents-black">{{ todos.title }}</h2>
            <p class="card-description contents-gray">
              {{ todos.description }}
            </p>
            <span class="card-date contents-lightgray">{{
              todos.selectedDate
            }}</span>
            <span
              class="card-state"
              :class="{
                complete: todos.progress === '완료',
                proceeding: todos.progress === '진행중',
                before: todos.progress === '진행전',
              }"
              >{{ todos.progress }}</span
            >
          </div>
          <form v-if="todos.edit === true" class="edit-todo">
            <div class="vertical">
              <input
                type="text"
                name="title"
                class="edit-title"
                placeholder="수정할 제목을 작성하세요."
                :value="todos.title"
                @change="
                  $store.commit('handleEditTitle', {
                    value: $event.target.value,
                    id: todos.id,
                    title: todos.title,
                  })
                "
              />
              <input
                type="text"
                name="description"
                class="edit-description"
                placeholder="수정할 설명을 작성하세요."
                :value="todos.description"
                @change="
                  $store.commit('handleEditDescription', {
                    value: $event.target.value,
                    id: todos.id,
                    description: todos.description,
                  })
                "
              />
            </div>
            <span class="edit-date">
              <div class="date-picker">
                <input
                  class="datejs-input"
                  type="date"
                  :value="todos.selectedDate"
                  @input="
                    $store.commit('updateDate', { event: $event, id: todos.id })
                  "
                />
              </div>
            </span>
            <select
              class="edit-state contents-primary"
              v-model="todos.progress"
            >
              <option :value="`진행전`" :selected="todos.progress === '진행전'">
                진행전
              </option>
              <option :value="`진행중`" :selected="todos.progress === '진행중'">
                진행중
              </option>
              <option :value="`완료`" :selected="todos.progress === '완료'">
                완료
              </option>
            </select>
            <button
              @click.prevent="
                $store.commit('handleEditComplete', {
                  id: todos.id,
                  selectedDate: todos.selectedDate,
                })
              "
              class="edit-complete-button in-edit-button contents-white"
            >
              수정완료
            </button>
            <button
              @click="$store.commit('handleCancelEdit', { id: todos.id })"
              class="edit-cancel-button in-edit-button contents-white"
            >
              취소
            </button>
          </form>
          <span class="line" aria-hidden="true"></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabList",
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

.input-card .date-picker {
  width: calc(100% - 110px);
  height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  font-size: 12px;
}
.datejs-input {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
  border: 1px solid #dddddd;
  border-radius: 4px;
  transition: all 0.2s;
  padding: 0 10px;
  color: #111111;
}
.datejs-input:hover {
  border: 1px solid #aaaeb7;
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
/* .todo-card {
} */
.todo-card-content {
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  min-height: 80px;
  gap: 4px;
  margin: 10px 0;
  padding: 20px 16px;
  border-radius: 8px;
  transition: all 0.2s;
  cursor: pointer;
}
.todo-card-content:hover {
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);
}
.todo-card .line {
  display: block;
  width: 100%;
  height: 1px;
  background-color: #e7e7e7;
}
.todo-card:last-child .line {
  display: none;
}
.card-title,
.card-description {
  width: calc(100% - 80px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-title {
  min-height: 22px;
  font-weight: 700;
  font-size: 16px;
  text-align: left;
}
.card-description {
  min-height: 19px;
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
  right: 16px;
}
.card-state {
  width: 50px;
  height: 20px;
  line-height: 20px;
  border-radius: 10px;
  text-align: center;
  font-size: 12px;
  bottom: 20px;
  right: 16px;
  color: #ffffff;
}
.card-state.before {
  background-color: #e67979;
}
.card-state.proceeding {
  background-color: #c4a21c;
}
.card-state.complete {
  background-color: #20b720;
}
.edit-todo {
  display: flex;
  flex-flow: row wrap;
  position: relative;
  min-height: 80px;
  gap: 10px;
  margin: 10px 0;
  padding: 20px 16px;
  border-radius: 8px;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.2);
}
.edit-todo .vertical {
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  gap: 10px;
}
.in-edit-button {
  width: calc(50% - 5px);
  height: 30px;
  border: none;
  border-radius: 4px;
  font-weight: 700;
  font-size: 12px;
  transition: all 0.2s;
}
.edit-complete-button {
  background-color: rgba(255, 134, 0, 1);
}
.edit-cancel-button {
  background-color: rgba(118, 118, 118, 1);
}
.edit-complete-button:hover {
  background-color: rgba(255, 134, 0, 0.8);
}
.edit-cancel-button:hover {
  background-color: rgba(118, 118, 118, 0.8);
}

.edit-title,
.edit-description {
  width: calc(100% - 150px);
  height: 30px;
}
.edit-title {
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 12px;
  padding: 0 12px;
  transition: all 0.2s;
}
.edit-description {
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 12px;
  padding: 0 12px;
  transition: all 0.2s;
}
.edit-title:hover,
.edit-description:hover {
  border: 1px solid #aaaeb7;
}
.edit-date,
.edit-state {
  position: absolute;
}
.edit-date {
  font-size: 12px;
  top: 20px;
  right: 16px;
}
.edit-date .date-picker {
  width: 140px;
  height: 30px;
  padding-top: 0;
  padding-bottom: 0;
  font-size: 12px;
}
.edit-state {
  width: 140px;
  height: 30px;
  border-radius: 4px;
  padding: 0 4px;
  border: 1px solid #ff8600;
  font-size: 14px;
  bottom: 60px;
  right: 16px;
}
</style>
