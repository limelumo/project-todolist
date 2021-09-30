<template>
  <div v-if="step == 1">
    더이상 할 일이 없습니다 😎
  </div>

  <div v-if="step == 2">
    <ul
      v-for="todo in activeTodoList"
      :key="todo"
      class="checkList"
      @click="toggleTodoState(todo)"
    >
      <li class="todoList">{{ todo.label }}</li>
      <li>
        <button><i class="fas fa-pen"></i></button>
        <button><i class="fas fa-trash-alt"></i></button>
      </li>
    </ul>

    <div>
      <button @click="changeCurrentState('active')">남은 할일</button>
      <button @click="changeCurrentState('done')">완료</button>
      <button @click="changeCurrentState('all')">전체보기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'List',
  data() {
    return {
      currentState: 'active',
    };
  },
  methods: {
    changeCurrentState(state) {
      this.currentState = state;
    },
    toggleTodoState(todo) {
      todo.state = todo.state === 'active' ? 'done' : 'active';
    },
  },
  computed: {
    activeTodoList() {
      return this.todoList.filter(
        (todo) =>
          this.currentState === 'all' || todo.state === this.currentState
      );
    },
  },
  props: {
    step: Number,
    todoList: Object,
  },
};
</script>

<style lang="scss" scoped>
@import '../mixin.scss';

.checkList {
  @include flex(space-between, center, '');
  margin-top: 1em;
  text-align: left;

  button {
    color: $point-c;
  }
}

.todoList {
  margin-right: 0.6em;
}
</style>
