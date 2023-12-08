import { createStore } from "vuex";
import dayjs from "dayjs";

const store = createStore({
  state() {
    return {
      tab: 1,
      category: "제목",
      showAddTodo: false,
      titleValue: "제목을 입력하세요",
      descriptionValue: "설명을 입력하세요",
      selectedDate: dayjs().format("YYYY-MM-DD"),
      progressValue: "진행전",
      todo: [],
      editTitle: "",
      editDescription: "",
      editDate: "",
      sortTodo: [],
      lineChartCategories: [],
      lineChartData: [],
      donutChartData: [0, 0, 0],
      filterTodo: [],
      searchTerm: "",
    };
  },
  mutations: {
    handleTabChange(state, payload) {
      state.tab = payload.tabValue;
    },
    handleCategory(state, payload) {
      state.category = payload;
    },
    toggleAddTodo(state, payload) {
      state.showAddTodo = payload.toggle;
    },
    handleTitleValue(state, payload = "제목을 입력하세요.") {
      state.titleValue = payload;
    },
    handleDescriptionValue(state, payload = "설명을 입력하세요.") {
      state.descriptionValue = payload;
    },
    handleProgressValue(state, payload) {
      state.progressValue = payload;
    },
    updateSelectedDate(state, newDate) {
      state.selectedDate = newDate;
    },
    handleAddTodo(state) {
      let newTodo = {
        id: state.todo.length + 1,
        title: state.titleValue,
        description: state.descriptionValue,
        selectedDate: state.selectedDate,
        progress: state.progressValue,
        edit: false,
      };
      state.todo.unshift(newTodo);
      state.showAddTodo = false;
      state.titleValue = "";
      state.descriptionValue = "";
      state.progressValue = "진행전";
      state.selectedDate = dayjs().format("YYYY-MM-DD");
      if (state.titleValue === "") {
        state.titleValue = "제목을 입력하세요.";
      }
      if (state.descriptionValue === "") {
        state.descriptionValue = "설명을 입력하세요.";
      }
    },
    updateDate(state, payload) {
      const { event } = payload;
      state.editDate = event.target.value;
    },
    handleOpenEdit(state, payload) {
      const { id, title, description } = payload;
      const allTodo = state.todo;
      const todoToEdit = state.todo.find((todo) => todo.id === id);
      allTodo.forEach((todo) => {
        todo.edit = false;
      });
      todoToEdit.edit = true;
      state.editTitle = title;
      state.editDescription = description;
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
    handleEditComplete(state, payload) {
      const { id, selectedDate } = payload;
      const todoToEdit = state.todo.find((todo) => todo.id === id);
      if (todoToEdit) {
        todoToEdit.title = state.editTitle;
        todoToEdit.description = state.editDescription;
        if (state.editDate === "") {
          todoToEdit.selectedDate = selectedDate;
        } else {
          todoToEdit.selectedDate = state.editDate;
        }
      }
      todoToEdit.edit = false;
    },
    handleLineChartData(state) {
      function convertToDate(dateString) {
        const parts = dateString.split("-");
        return new Date(parts[0], parts[1] - 1, parts[2]);
      }
      const arr = state.todo;
      arr.sort((a, b) => {
        const dateA = convertToDate(a.selectedDate);
        const dateB = convertToDate(b.selectedDate);
        return dateA - dateB;
      });
      state.sortTodo = [...arr];
      let countedDates = state.sortTodo.reduce((acc, curr) => {
        if (acc[curr.selectedDate]) {
          acc[curr.selectedDate] += 1;
        } else {
          acc[curr.selectedDate] = 1;
        }
        return acc;
      }, {});
      state.lineChartCategories = [...Object.keys(countedDates)];
      state.lineChartData = [...Object.values(countedDates)];
    },
    handleProgressData(state) {
      const originData = state.todo;

      let countBefore = 0;
      let countProgress = 0;
      let countComplete = 0;

      originData.forEach((data) => {
        if (data.progress === "진행전") {
          countBefore++;
        } else if (data.progress === "진행중") {
          countProgress++;
        } else if (data.progress === "완료") {
          countComplete++;
        }
      });
      state.donutChartData = [countBefore, countProgress, countComplete];
    },
    setSearchTerm(state, value) {
      state.searchTerm = value;
    },
  },
  getters: {
    filteredItems: (state) => {
      const searchTerm = state.searchTerm.trim().toLowerCase();

      if (!searchTerm) {
        return state.todo;
      }

      return state.todo.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
    },
  },
});

export default store;
