<template>
  <div class="VueToNuxtLogo">
    <img src="~/assets/icon.png">
  </div>
</template>

<style>
.VueToNuxtLogo {
  display: inline-block;
  animation: turn 2s linear forwards 1s;
  transform: rotateX(180deg);
  position: relative;
  overflow: hidden;
  height: 180px;
  width: 245px;
  margin: 40px 0 0 0;
}

.VueToNuxtLogo img {
  width: 200px;
  height: 200px;
}

</style>
