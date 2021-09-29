<template>
  <div class="app-wrap">
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
      <div class="writeInput">
        <input type="text" placeholder="오늘 해야할 일이 뭐더라?" />
        <button>
          <i class="fas fa-plus"></i>
        </button>
      </div>

      <div>
        할 일 목록
      </div>
    </section>

    <footer class="footer">
      <!-- 남은 할일 percent에 따라 응원하는 글귀가 뜨도록 한다 -->
      <div class="list-left">
        3개 남았어요,
        <span class="cheer-text">조금만 더 힘내요! </span>
      </div>

      <div class="percentage">
        <span></span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
};
</script>

<style lang="scss">
@import './style.scss';
</style>
