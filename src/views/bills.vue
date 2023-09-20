<template>
  <v-container class="align-center">
    <v-simple-table
      v-if='bills'
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
        <tr
          v-for="item in bills.bills"
          :key="item._id.bill_id"
        >
          <td class="pa-1 pa-sm-3 text-caption text-sm-body-2">
            {{ item._id.address }}
          </td>
          <td class="pa-1 pa-sm-3 text-caption text-sm-body-2">
            {{ item._id.bill_description }}
          </td>
          <td class="pa-1 pa-sm-3 text-caption text-sm-body-2">
            {{ item._id.created }}
          </td>
          <td class="pa-1 pa-sm-3 text-caption text-sm-body-2">
            {{ item._id.total_sum }}
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-pagination
      v-if='bills && bills.bills.length'
      v-model="goToPage"
      :length="bills.totalPages"
      :page="pagination.page"
      :total-visible="pagination.totalVisible"
      class='mt-10'
    />
  </v-container>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: 'Bills',
    data() {
      return {
        tableHeaders: ['Address', 'Invoice description', 'Created', 'Total'],
        pagination: {
          length: 5,
          page: 1,
          totalVisible: 5,
        },
        path:"/bills?page="
      }
    },
    computed:{
      ...mapState(['bills', 'user']),
      goToPage:{
          get(){
              return parseInt(this.bills.page)
          },
          set(val){
              return this.$store.dispatch('getUserDataAction', { path:this.path + val });
          }
      },
    },
    watch:{
      user(newState){
        if(!newState)
          this.$router.push({ path: "/home" });
      }
    },
    mounted(){
      this.$store.dispatch('getUserDataAction', { path:this.path + 1 });
    },
  };
</script>

