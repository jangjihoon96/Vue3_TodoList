import { createStore } from "vuex";

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

const zeroDay = ("00" + day).slice(-2);
const zeroMonth = ("00" + month).slice(-2);

const store = createStore({
  state() {
    return {
      tab: 1,
      showAddTodo: false,
      titleValue: "제목을 입력하세요",
      descriptionValue: "설명을 입력하세요",
      dateValue: `${year}.${zeroMonth}.${zeroDay}`,
      progressValue: "진행전",
      todo: [],
      editTitle: "",
      editDescription: "",
      editDateValue: "",
    };
  },
  mutations: {
    handleTabList(state) {
      state.tab = 1;
    },
    handleTabStet(state) {
      state.tab = 2;
    },
    changeShowAddTodo(state) {
      state.showAddTodo = true;
    },
    changeHideAddTodo(state) {
      state.showAddTodo = false;
    },
    handleTitleValue(state, payload) {
      if (payload === "") {
        state.titleValue = "제목을 입력하세요.";
      }
      state.titleValue = payload;
    },
    handleDescriptionValue(state, payload) {
      if (payload === "") {
        state.descriptionValue = "설명을 입력하세요.";
      }
      state.descriptionValue = payload;
    },
    handleDateValue(state, payload) {
      if (payload) {
        const year = payload.getFullYear();
        const month = payload.getMonth() + 1;
        const day = payload.getDate();

        // 날짜 앞에 0을 붙여야 하는 경우
        if (month || day < 10) {
          const zeroDay = ("00" + day).slice(-2);
          const zeroMonth = ("00" + month).slice(-2);

          state.dateValue = `${year}.${zeroMonth}.${zeroDay}`;
        } else {
          state.dateValue = `${year}.${month}.${day}`;
        }
      } else {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        const zeroDay = ("00" + day).slice(-2);
        const zeroMonth = ("00" + month).slice(-2);

        state.dateValue = `${year}.${zeroMonth}.${zeroDay}`;
      }
    },
    handleProgressValue(state, payload) {
      state.progressValue = payload;
    },
    handleAddTodo(state) {
      let newTodo = {
        id: state.todo.length + 1,
        title: state.titleValue,
        description: state.descriptionValue,
        date: state.dateValue,
        progress: state.progressValue,
        edit: false,
      };
      state.todo.unshift(newTodo);
      state.showAddTodo = false;
      state.titleValue = "";
      state.descriptionValue = "";
      state.progressValue = "진행전";
      state.dateValue = `${year}.${zeroMonth}.${zeroDay}`;
      if (state.titleValue === "") {
        state.titleValue = "제목을 입력하세요.";
      }
      if (state.descriptionValue === "") {
        state.descriptionValue = "설명을 입력하세요.";
      }
    },
    handleOpenEdit(state, payload) {
      const { id, title, description, date } = payload;
      const allTodo = state.todo;
      const todoToEdit = state.todo.find((todo) => todo.id === id);
      allTodo.forEach((todo) => {
        todo.edit = false;
      });
      todoToEdit.edit = true;
      state.editTitle = title;
      state.editDescription = description;
      state.editDateValue = date;
    },
    handleCancelEdit(state, payload) {
      const { id } = payload;
      const todoToEdit = state.todo.find((todo) => todo.id === id);
      todoToEdit.edit = false;
      state.editTitle = "";
      state.editDescription = "";
    },
    handleEditTitle(state, payload) {
      const { id } = payload;
      const todoToEdit = state.todo.find((todo) => todo.id === id);
      if (state.editTitle === "") {
        todoToEdit.title = payload.value;
      }
      state.editTitle = payload.value;
    },
    handleEditDescription(state, payload) {
      const { id } = payload;
      const todoToEdit = state.todo.find((todo) => todo.id === id);
      if (state.editDescription === "") {
        todoToEdit.description = payload.value;
      }
      state.editDescription = payload.value;
    },
    handleEditDateValue(state, payload) {
      const { date } = payload;
      if (date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        // 날짜 앞에 0을 붙여야 하는 경우
        if (month || day < 10) {
          const zeroDay = ("00" + day).slice(-2);
          const zeroMonth = ("00" + month).slice(-2);

          state.editDateValue = `${year}.${zeroMonth}.${zeroDay}`;
        } else {
          state.editDateValue = `${year}.${month}.${day}`;
        }
      } else {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        const zeroDay = ("00" + day).slice(-2);
        const zeroMonth = ("00" + month).slice(-2);

        state.editDateValue = `${year}.${zeroMonth}.${zeroDay}`;
      }
    },
    handleEditComplete(state, payload) {
      const { id } = payload;
      const todoToEdit = state.todo.find((todo) => todo.id === id);
      if (todoToEdit) {
        todoToEdit.title = state.editTitle;
        todoToEdit.description = state.editDescription;
        todoToEdit.date = state.editDateValue;
      }
      todoToEdit.edit = false;
    },
  },
});

export default store;
