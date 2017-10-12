<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        tennistider
      </h1>
      <hr />
      <ul class="menu">
        <li>
          Hitta lediga tider
        </li>
        <li>
          Skapa bevakning
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

h1 {
  margin: 0;
}

logo {
  margin: 20px 20px;
}

.menu {
    list-style-type: none;
}

.menu ul {
    margin-left: 0;
}

.menu li {
    border-bottom: 1px solid lightgray !important;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 60px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
