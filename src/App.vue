<template>
  <Greeting
    v-if="step == 0"
    :savedName="savedName"
    @changeDisplay="changeDisplay($event)"
  />

  <div class="appWrap">
    <header class="header">
      <div class="date">
        <span>{{ weekdayNames[currentDate.day] }}, </span>
        {{ month[currentDate.month] }} {{ currentDate.date }}
      </div>

      <div class="weather">
        <span>{{ getWeather }}</span>
        <span>{{ weather }} {{ city }}</span>
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
        <div v-if="step == 1">
          할 일이 없습니다 😎
        </div>

        <List
          v-if="step == 2"
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
import Greeting from './components/Greeting';
import weatherApi from 'raw-loader!./assets/weatherApi.txt';

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
      step: 0,
      todoList: [],
      userInput: '',
      currentState: 'active',
      percentage: 0,
      username: '',
      savedName: '',
      api: weatherApi,
      city: '',
      weather: '',
    };
  },

  created() {
    this.getCurrentDate();
  },

  computed: {
    getWeather() {
      return navigator.geolocation.getCurrentPosition(
        this.onGeoOk,
        this.onGeoError
      );
    },
    incomplete() {
      return this.todoList.filter((todo) => todo.state == 'active').length;
    },
    completed() {
      return this.todoList.filter((todo) => todo.state == 'done').length;
    },
  },

  methods: {
    onGeoError() {
      alert("Can't find you. No weather for you");
    },

    onGeoOk(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.api}&units=metric`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.city = `${data.name}`;
          this.weather = `${data.main.temp}℃ ,`;
        });
    },

    changeDisplay(userName) {
      localStorage.setItem('username', userName);
      this.savedName = userName;

      setTimeout(() => {
        this.step = 1;
      }, 2500);
    },

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
      this.calcProgress();
    },

    deleteTodo(index) {
      this.todoList.splice(index, 1);
      this.calcProgress();
    },

    setPercentage(progress) {
      this.percentage = progress;
      this.resetProgress();
    },

    calcProgress() {
      this.percentage = Math.round(
        (this.completed / this.todoList.length) * 100
      );
      this.resetProgress();
    },

    resetProgress() {
      if (this.incomplete === 0) {
        setTimeout(() => {
          this.percentage = 0;
        }, 700);
      }
    },
  },

  components: {
    List,
    Greeting,
  },
};
</script>

<style lang="scss">
@import './mixin.scss';
@import './style.scss';
</style>
