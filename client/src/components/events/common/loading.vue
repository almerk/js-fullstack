<template>
  <div class="load-wraper">
    <div class="activity"></div>
  </div>
</template>

<script>
export default {};
</script>
<style>
.load-wraper {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: rgb(211, 211, 211);
  z-index: 44;
  overflow: hidden;
  border-radius: 5px;
}
.activity {
  position: absolute;
  left: -45%;
  height: 100%;
  width: 45%;
  background-image: linear-gradient(
    to left,
    rgba(251, 251, 251, 0.05),
    rgba(251, 251, 251, 0.3),
    rgba(251, 251, 251, 0.6),
    rgba(251, 251, 251, 0.3),
    rgba(251, 251, 251, 0.05)
  );
  background-image: -moz-linear-gradient(
    to left,
    rgba(251, 251, 251, 0.05),
    rgba(251, 251, 251, 0.3),
    rgba(251, 251, 251, 0.6),
    rgba(251, 251, 251, 0.3),
    rgba(251, 251, 251, 0.05)
  );
  background-image: -webkit-linear-gradient(
    to left,
    rgba(251, 251, 251, 0.05),
    rgba(251, 251, 251, 0.3),
    rgba(251, 251, 251, 0.6),
    rgba(251, 251, 251, 0.3),
    rgba(251, 251, 251, 0.05)
  );
  animation: loading .5s infinite;
  z-index: 45;
}

@keyframes loading {
  0% {
    left: -45%;
  }
  100% {
    left: 100%;
  }
}
</style>