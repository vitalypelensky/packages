<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title class="primary">
        <v-avatar color="teal" size="56" class="mr-3"
          ><span class="white--text text-h5">{{ abbr }}</span></v-avatar
        >
        <strong class="subheading">{{ name }}</strong>

        <v-spacer></v-spacer>

        <v-btn class="mx-4" :href="link" dark icon target="_blank">
          <v-icon size="24px"> mdi-github </v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      abbr: "VP",
      name: "Vitalii",
      link: "https://github.com/vitalypelensky",
    };
  },
};
</script>

<style scoped></style>
