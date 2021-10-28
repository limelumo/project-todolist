<template>
  <section class="greeting">
    <div class="helloContainer" v-if="hello">
      <h1>Hi, {{ user }} !</h1>
      <div class="quote">
        <h3>" {{ quote[num].quote }} "</h3>
        <p>- {{ quote[num].author }}</p>
      </div>
      <button @click="toToDos">Get Started</button>
    </div>

    <input
      v-else
      type="text"
      placeholder="What is your name?"
      v-model="userName"
      @keyup.enter="$emit('saveUserName', userName)"
    />
  </section>
</template>

<script>
import quotes from '../assets/quotes.js';

export default {
  name: 'Greeting',
  data() {
    return {
      userName: '',
      quote: quotes,
    };
  },

  methods: {
    toToDos() {
      const appWrap = document.querySelector('#appWrap');
      const greeting = document.querySelector('.greeting');
      appWrap.classList.remove('hide');
      greeting.style.display = 'none';
      this.step = 1;
    },
  },

  props: {
    savedName: String,
    user: String,
    hello: Boolean,
  },

  computed: {
    num() {
      return Math.floor(Math.random() * this.quote.length);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../mixin.scss';

.greeting {
  @include object(100%, 100vh, $point-c);
  @include flex(center, center, column);

  input {
    @include object(60%, 2em, transparent);
    text-align: center;
    &::placeholder {
      color: white;
    }
    outline: none;
    border: none;
    border-bottom: 1px solid white;
    border-radius: 0;
    color: white;
    font-size: 1.3em;
  }

  button {
    color: white;
    margin-top: 5em;
    font-size: 1.2em;
    font-weight: bold;
  }
}

.helloContainer {
  @include flex(center, center, column);
  text-align: center;
  color: white;
}

.quote {
  border: 1px solid white;
  padding: 1.5em;
  margin-top: 2em;

  p {
    margin-top: 0.5em;
  }
}
</style>
