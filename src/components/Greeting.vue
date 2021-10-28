<template>
  <div class="greeting" v-if="step == 0">
    <input type="text" placeholder="What is your name?" />
  </div>
</template>

<script>
export default {
  name: 'Greeting',
  props: {
    step: Number,
  },
};
</script>

<style lang="scss" scoped>
@import '../mixin.scss';

.greeting {
  @include object(100%, 100vh, $point-c);
  @include flex(center, center, column);

  input {
    @include object(60%, 2.5em, transparent);
    text-align: center;
    &::placeholder {
      color: white;
    }
    outline: none;
    border: none;
    border-bottom: 1px solid white;
    border-radius: 0;
    color: white;
  }
}
</style>
