<template>
  <div class="label">
    <div class="pink"></div>
    <div class="text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Label"
}
</script>

<style scoped>
.label {
  width: 100%;
  padding: 0.4rem;
  display: flex;
}
.pink{
  margin: 0.1rem 0 0 0;
  height: 0.5rem;
  width: 0.08rem;
  background: #ff8cce;
  border-radius: 0.04rem;
}
.text{
  font-weight: bold;
  font-size: 0.5rem;
  margin-left: 0.3rem;
}
</style>