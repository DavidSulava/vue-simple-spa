<template>
  <v-container class=' align-center' >

    <Loading v-show='isDataLoading'/>

    <v-simple-table dark v-if='calls'>
        <thead>
          <tr>
            <th class="text-left" v-for='obKeys in tableHeaders' :key="obKeys">
                {{obKeys}}
            </th>

          </tr>
        </thead>

         <tbody>
          <tr v-for="item in calls.calls" :key="item._id.calls_id">
            <td>{{ item._id.tariff_name }}</td>
            <td>{{ item._id.line_city }}</td>
            <td>{{ item._id.created }}</td>
            <td>{{ item._id.outgoing_cost }}</td>
          </tr>
        </tbody>
    </v-simple-table>

    <v-pagination
        class='mt-10'
        v-if='calls && !calls.calls.lenght '
        v-model="goToPage"
        :length="calls.totalPages"
        :page="pagination.page"
        :total-visible="pagination.totalVisible">

    </v-pagination>

  </v-container>
</template>

<script>
import { mapState } from "vuex";
import Loading from "../components/loading"

export default {
  name: "Calls",

  components: {Loading},

  data() {
    return {
      tableHeaders:['Тариф', 'Город', 'Создан', 'Цена'],
      pagination:{
        circle: true,
        disabled: false,
        length: 5,
        page: 1,
        totalVisible: 10,
      },
      path:"/calls?page="
    }
  },
  created(){
    this.$store.dispatch('getUserData', { path:this.path + 1 });
  },
  computed:{
    ...mapState(['calls', 'isDataLoading', 'user']),
    goToPage:{
        get(){
          return parseInt(this.calls.page)
        },
        set(val){
          return this.$store.dispatch('getUserData', { path:this.path + val });
        }
    },
  },
  watch:{
    user(newState){
      if(!newState)
         this.$router.push({ path: "/home" });
    }
  }
};
</script>