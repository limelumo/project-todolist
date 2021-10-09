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
        <button class="addNewTodo" @click="addNewTodo">+</button>
      </div>

      <div class="todos">
        <List
          :step="step"
          :todoList="todoList"
          @delete="deleteTodo($event)"
          @progress="setPercentage($event)"
        />
      </div>
    </section>

    <footer class="footer" v-if="step == 2">
      <div class="listLeft">
        <div v-if="incomplete != 0">
          {{ incomplete }}개 남았어요,
          <span class="cheerText">
            조금만 더 힘내요!
          </span>
        </div>
        <span class="allDonText" v-if="incomplete == 0"
          >대단해요! <br />
          할 일을 모두 마치셨습니다 😆</span
        >
      </div>

      <div class="progressBar">
        <span :style="{ width: percentage + '%' }">
          <p v-if="percentage > 0">{{ percentage }}%</p>
        </span>
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
        'Saturday',
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
      percentage: 0,
    };
  },

  created() {
    this.getCurrentDate();
  },

  computed: {
    incomplete() {
      return this.todoList.filter((todo) => todo.state == 'active').length;
    },
  },

  methods: {
    setPercentage(progress) {
      this.percentage = progress;
      console.log(progress);
    },

    getCurrentDate() {
      let today = new Date();
      this.currentDate.date = today.getDate();
      this.currentDate.day = today.getDay();
      this.currentDate.month = today.getMonth();
      this.currentDate.year = today.getFullYear();
    },

    addNewTodo(progress) {
      if (!this.userInput) {
        return;
      }

      this.todoList.push({
        label: this.userInput,
        state: 'active',
      });
      this.userInput = '';
      this.step = 2;
      this.setPercentage(progress);
    },

    deleteTodo(index, progress) {
      this.todoList.splice(index, 1);
      this.setPercentage(progress);
    },
  },

  components: {
    List,
  },
};
</script>

<style lang="scss">
@import './mixin.scss';
@import './style.scss';
</style>
