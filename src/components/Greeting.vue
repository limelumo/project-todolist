<template>
  <section class="greeting">
    <div v-if="savedName" class="helloContainer">
      <h1>Hello, {{ userName }}</h1>
      <div class="quote">
        <h3>" {{ quote[num].quote }} "</h3>
        <p>- {{ quote[num].author }}</p>
      </div>
    </div>

    <input
      v-else
      type="text"
      placeholder="What is your name?"
      v-model="userName"
      @keyup.enter="$emit('changeDisplay', userName)"
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
  props: {
    step: Number,
    savedName: String,
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
}

.helloContainer {
  text-align: center;
  color: white;
}

.quote {
  margin-top: 2em;

  p {
    margin-top: 0.5em;
  }
}
</style>
