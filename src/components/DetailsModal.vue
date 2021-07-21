<template>
  <v-dialog scrollable persistent v-model="open" width="320">
    <v-card>
      <v-card-title class="text-h5 grey lighten-2"> Details </v-card-title>

      <v-card-text class="body">
        <div
          v-for="(value, key) in filteredData"
          :key="key"
          class="information-item"
        >
          <span>{{ key }}</span>
          <span>{{ value }}</span>
          <v-divider></v-divider>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="closeModal"> Close </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DetailsModal",
  props: {
    open: { type: Boolean, default: false },
    data: { type: Object, default: () => ({}) },
  },
  computed: {
    filteredData() {
      const { name, scope, version, description, links, date } = this.data;
      return {
        name,
        scope,
        version,
        date: new Date(date).toLocaleDateString(),
        link: links?.homepage,
        description,
      };
    },
  },
  methods: {
    closeModal() {
      this.$emit("onCloseDetails");
    },
  },
};
</script>

<style scoped lang="scss">
.body {
  height: 300px;
}
.information-item {
  margin: 10px 0;

  span:nth-child(1) {
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    display: inline-block;
    text-transform: capitalize;
  }

  span:nth-child(2) {
    font-size: 14px;
    color: darkseagreen;
  }
}
</style>
