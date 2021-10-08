<template>
  <div class="appWrap">
    <header class="header">
      <div class="date">
        <span>{{ weekdayNames[currentDate.day] }}, </span>
        {{ month[currentDate.month] }} {{ currentDate.date }}
      </div>
    </header>

    <section class="list">
      <div class="writeInput">
        <input
          type="text"
          placeholder="오늘의 할 일을 적어주세요"
          v-model="userInput"
          @keyup.enter="addNewTodo"
        />
        <button @click="addNewTodo">+</button>
      </div>

      <div class="todos">
        <List :step="step" :todoList="todoList" @delete="deleteTodo($event)" />
      </div>
    </section>

    <footer class="footer" v-if="step == 2">
      <div class="listLeft">
        {{ incomplete }}개 남았어요,
        <span class="cheerText">조금만 더 힘내요! </span>
      </div>

      <div class="percentBar">
        <span>75%</span>
      </div>
    </footer>
  </div>
</template>

<script>
import List from './components/List';

export default {
  name: 'App',
  data() {
    return {
      currentDate: {
        date: '',
        day: '',
        month: '',
        year: '',
      },
      weekdayNames: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
      month: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      step: 1,
      todoList: [],
      userInput: '',
      currentState: 'active',
    };
  },
  computed: {
    incomplete() {
      console.log(this.todoList);
      return this.todoList.filter(
        (todo) => todo.state == 'all' || todo.state == 'active'
      ).length;
    },
  },
  methods: {
    getCurrentDate() {
      let today = new Date();
      this.currentDate.date = today.getDate();
      this.currentDate.day = today.getDay();
      this.currentDate.month = today.getMonth();
      this.currentDate.year = today.getFullYear();
    },

    addNewTodo() {
      if (!this.userInput) {
        return;
      }

      this.todoList.push({
        label: this.userInput,
        state: 'active',
      });
      this.userInput = '';
      this.step = 2;
    },

    deleteTodo(index) {
      this.todoList.splice(index, 1);
    },

    // inProgress() {
    //   return 'hi';
    // },
  },

  components: {
    List,
  },
  created() {
    this.getCurrentDate();
  },
};
</script>

<style lang="scss">
@import './mixin.scss';
@import './style.scss';
</style>
