import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      percentage: 0,
      todoList: [],
    };
  },
  mutations: {
    setPercentage(state) {
      state.percentage = Math.round(
        (this.completed / state.todoList.length) * 100
      );

      if (this.incomplete === 0) {
        setTimeout(() => {
          this.percentage = 0;
        }, 700);
      }
    },
  },
});

export default store;
