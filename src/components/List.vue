<template>
  <div v-if="step == 2">
    할 일이 없습니다 😎
  </div>

  <div v-if="step == 3">
    <div class="todoBtns">
      <button @click="changeCurrentState('active')">남은 할일</button>
      <button @click="changeCurrentState('done')">완료</button>
      <button @click="changeCurrentState('all')">전체보기</button>
    </div>
    <ul v-for="(todo, index) in activeTodoList" :key="index" class="checkList">
      <li
        class="todoList"
        :class="{ completed: todo.state == 'done' }"
        @click="toggleTodoState(todo)"
      >
        <input type="checkbox" />
        {{ todo.label }}
      </li>
      <li>
        <button @click="$emit('delete', index)">
          <i class="fas fa-trash-alt"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'List',
  emits: ['delete', 'progress'],
  data() {
    return {
      currentState: 'active',
      todoLabel: '',
      progress: 0,
    };
  },

  methods: {
    setPercentage() {
      this.progress = Math.round((this.completed / this.todoList.length) * 100);
      this.$emit('progress', this.progress);
    },
    changeCurrentState(state) {
      this.currentState = state;
    },
    toggleTodoState(todo) {
      if (todo.state === 'active') {
        todo.state = 'done';
      }
      this.setPercentage();
    },
  },

  computed: {
    activeTodoList() {
      return this.todoList.filter(
        (todo) =>
          this.currentState === 'all' || todo.state === this.currentState
      );
    },
    completed() {
      return this.todoList.filter((todo) => todo.state == 'done').length;
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

.completed {
  text-decoration: line-through;
}

.checkList {
  @include flex(space-between, center, '');
  margin-top: 1em;
  text-align: left;

  button {
    color: $point-c;
  }
}

.todoList {
  width: 100%;
  margin-right: 0.6em;
  font-size: 0.9em;

  input {
    appearance: none;
  }
}

.todoBtns {
  @include flex(space-between, center, '');
  margin-bottom: 1.5em;

  button {
    width: 30%;
    font-size: 0.85em;
    font-weight: 500;
    color: $point-c;
    padding: 0.35em;
    border: 1px dashed $point-c;

    &:last-child {
      background-color: salmon;
      border: 1px solid salmon;
      color: white;
    }
  }
}
</style>
