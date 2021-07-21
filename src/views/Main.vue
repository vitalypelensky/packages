<template>
  <v-container id="input-usage" fluid>
    <v-row justify="center">
      <v-col md="6" cols="12">
        <v-text-field
          solo
          clearable
          label="Search"
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          placeholder="Enter please package name ..."
        />
      </v-col>
      <v-col md="10" cols="12">
        <transition name="fade" mode="out-in">
          <div v-if="loadingSearch" class="text-center" key="loading">
            <v-progress-circular :size="70" color="primary" indeterminate />
          </div>
          <PackagesTable
            v-else
            key="table"
            :packages="packages"
            :total="totalPackages"
            :loading="loadingPagination"
            @onOpenDetails="onOpenDetails"
            @onChangePageNumber="onChangePageNumber"
          />
        </transition>
        <DetailsModal
          :open="showDetails"
          :data="selectedPackageData"
          @onCloseDetails="onCloseDetails"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PackagesTable from "../components/PackagesTable";
import DetailsModal from "../components/DetailsModal";
import { mapGetters, mapActions } from "vuex";
import { debounce } from "../helpers/debounce";

export default {
  name: "Home",
  components: { PackagesTable, DetailsModal },
  data() {
    return {
      search: "",
      showDetails: false,
      selectedPackageName: null,
    };
  },
  computed: {
    ...mapGetters("packages", {
      packages: "PACKAGES",
      totalPackages: "TOTAL",
      errorPackages: "ERROR",
      loadingSearch: "LOADING_SEARCH",
      loadingPagination: "LOADING_PAGINATION",
    }),
    selectedPackageData() {
      return this.packages.find(
        (item) => item.name === this.selectedPackageName
      );
    },
  },
  watch: {
    search(newVal) {
      this.debounceLoadPackages({
        size: 10,
        from: 0,
        text: newVal,
      });
    },
  },
  methods: {
    ...mapActions("packages", ["GET_PACKAGES_LIST", "CLEAR_PACKAGES_LIST"]),
    debounceLoadPackages: debounce(function (params) {
      this.GET_PACKAGES_LIST(params);
    }),

    onChangePageNumber(offset) {
      this.GET_PACKAGES_LIST({
        size: 10,
        from: offset,
        text: this.search,
        isPagination: true,
      });
    },

    onOpenDetails(data) {
      this.showDetails = true;
      this.selectedPackageName = data.name;
    },

    onCloseDetails() {
      this.showDetails = false;
      this.selectedPackageName = null;
    },
  },
  destroyed() {
    this.CLEAR_PACKAGES_LIST();
  },
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
