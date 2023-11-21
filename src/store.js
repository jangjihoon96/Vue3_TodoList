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
      titleValue: "",
      descriptionValue: "",
      dateValue: `${year}.${zeroMonth}.${zeroDay}`,
      progressValue: "진행전",
      todo: [],
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
      state.titleValue = payload;
    },
    handleDescriptionValue(state, payload) {
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
      };
      state.todo.unshift(newTodo);
      state.showAddTodo = false;
      state.titleValue = "";
      state.descriptionValue = "";
      state.progressValue = "진행전";
      state.dateValue = `${year}.${zeroMonth}.${zeroDay}`;
    },
  },
});

export default store;
