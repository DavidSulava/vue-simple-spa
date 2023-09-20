<template>
  <v-container class=" align-center">
    <v-simple-table
      v-if="calls"
      dark
    >
      <thead>
        <tr>
          <th
            v-for="obKeys in tableHeaders"
            :key="obKeys"
            class="text-left pa-1 pa-sm-3 text-caption text-sm-body-2"
          >
            {{ obKeys }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in calls.calls" :key="item._id.calls_id">
          <td class="pa-1 pa-sm-3 text-caption text-sm-body-2">
            {{ item._id.tariff_name }}
          </td>
          <td class="pa-1 pa-sm-3 text-caption text-sm-body-2">
            {{ item._id.line_city }}
          </td>
          <td class="pa-1 pa-sm-3 text-caption text-sm-body-2">
            {{ item._id.created }}
          </td>
          <td class="pa-1 pa-sm-3 text-caption text-sm-body-2">
            {{ item._id.outgoing_cost }}
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-pagination
      v-if="calls && calls.calls.length "
      v-model="goToPage"
      class="mt-10"
      :length="calls.totalPages"
      :page="pagination.page"
      :total-visible="pagination.totalVisible"
    >
    </v-pagination>
  </v-container>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "Calls",
  data() {
    return {
      tableHeaders: ['Tariff', 'City', 'Created', 'Price'],
      pagination: {
        circle: true,
        disabled: false,
        length: 5,
        page: 1,
        totalVisible: 10
      },
      path: "/calls?page="
    }
  },
  computed: {
    ...mapState(['calls', 'user']),
    goToPage: {
      get() {
        return parseInt(this.calls.page)
      },
      set(val) {
        return this.$store.dispatch('getUserDataAction', {path: this.path + val});
      }
    },
  },
  watch: {
    user(newState) {
      if (!newState)
        this.$router.push({path: "/home"});
    }
  },
  created() {
    this.$store.dispatch('getUserDataAction', {path: this.path + 1});
  },
};
</script>