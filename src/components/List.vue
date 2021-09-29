<template>
  <div class="check_list">
    <span> <input type="checkbox" class="checkbox" />Lunch with Mike </span>
    <button>
      <i class="fas fa-trash-alt"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Container',
};
</script>

<style lang="scss" scoped>
@import '../mixin.scss';

.check_list {
  @include flex(space-between, center, '');
  margin-top: 1em;
  text-align: left;

  button {
    color: $point-c;
  }
}

.checkbox {
  margin-right: 0.6em;
}
</style>
