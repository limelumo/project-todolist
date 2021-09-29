<template>
  <div class="app_wrap">
    <header class="header">
      <button class="prev">
        <i class="fas fa-angle-left"></i>
      </button>

      <div class="date">
        <span>MONDAY, </span>
        March 14th
      </div>

      <button class="next">
        <i class="fas fa-angle-right"></i>
      </button>
    </header>

    <section class="list">
      <div class="write_input">
        <input type="text" placeholder="오늘의 할 일을 적어주세요" />
        <button>
          +
        </button>
      </div>

      <div class="todos">
        <List />
        <List />
        <List />
        <List />
      </div>
    </section>

    <footer class="footer">
      <!-- 남은 할일 percent에 따라 응원하는 글귀가 뜨도록 한다 -->
      <div class="list_left">
        3개 남았어요,
        <span class="cheer_text">조금만 더 힘내요! </span>
      </div>

      <div class="percent_bar">
        <span>75%</span>
      </div>
    </footer>
  </div>
</template>

<script>
import List from './components/List';

export default {
  name: 'App',
  components: {
    List,
  },
};
</script>

<style lang="scss">
@import './mixin.scss';
@import './style.scss';
</style>
