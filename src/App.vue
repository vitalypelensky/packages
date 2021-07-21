<template>
  <v-app>
    <v-app-bar app color="primary" dark class="container--fluid">
      <Header
    /></v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: { Header, Footer },
};
</script>
