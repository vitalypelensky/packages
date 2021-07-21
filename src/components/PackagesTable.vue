<template>
  <div>
    <template v-if="hasPackages">
      <v-data-table
        height="500px"
        :loading="loading"
        :headers="headers"
        :items="packages"
        hide-default-footer
        class="elevation-1"
        @click:row="selectPackage"
      />
      <v-pagination
        class="mt-5"
        v-model="page"
        :length="pagesLength"
        :total-visible="totalVisible"
      ></v-pagination>
    </template>
    <div v-else class="text-center">
      <span class="icon">&#128581;</span>
    </div>
  </div>
</template>

<script>
import { PAGINATION_LIMIT } from "../constants/values";

export default {
  name: "PackagesTable",
  props: {
    packages: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      page: 1,
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
          width: "30%",
          sortable: true,
        },
        {
          text: "Version",
          align: "start",
          width: "15%",
          value: "version",
          sortable: true,
        },
        {
          text: "Description",
          align: "start",
          width: "55%",
          value: "description",
          sortable: true,
        },
      ],
    };
  },
  computed: {
    hasPackages() {
      return !!this.total;
    },
    pagesLength() {
      return Math.ceil(this.total / PAGINATION_LIMIT);
    },
    totalVisible() {
      return this.pagesLength > 7 ? 7 : this.pagesLength;
    },
  },
  watch: {
    page() {
      const offset = (this.page - 1) * PAGINATION_LIMIT;
      this.$emit("onChangePageNumber", offset);
    },
  },
  methods: {
    selectPackage(data) {
      this.$emit("onOpenDetails", data);
    },
  },
};
</script>

<style scoped>
.icon {
  font-size: 70px;
}
</style>
