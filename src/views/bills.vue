<template>
  <v-container class=' align-center' >

    <Loading  v-show='isDataLoading'/>

    <v-simple-table dark v-if='bills' >
        <thead>
          <tr >
            <th class="text-left pa-1 pa-sm-3 text-caption text-sm-body-2" v-for='obKeys in tableHeaders' :key="obKeys">
                {{obKeys}}
            </th>

          </tr>
        </thead>

         <tbody >
          <tr v-for="item in bills.bills" :key="item._id.bill_id">
            <td class='pa-1 pa-sm-3 text-caption text-sm-body-2' >{{ item._id.address }}</td>
            <td class='pa-1 pa-sm-3 text-caption text-sm-body-2' >{{ item._id.bill_description }}</td>
            <td class='pa-1 pa-sm-3 text-caption text-sm-body-2'>{{ item._id.created }}</td>
            <td class='pa-1 pa-sm-3 text-caption text-sm-body-2'>{{ item._id.total_sum }}</td>
          </tr>
        </tbody>
    </v-simple-table>

    <v-pagination
        class='mt-10'
        v-if='bills && bills.bills.length'
        v-model="goToPage"
        :length="bills.totalPages"
        :page="pagination.page"
        :total-visible="pagination.totalVisible">

    </v-pagination>

  </v-container>
</template>

<script>
import { mapState } from "vuex";
import Loading from "../components/loading"

export default {
  name: "Bills",
  components: {Loading},

  data() {
    return {
      tableHeaders:['Адресс', 'Описание счета', 'Создан', 'Сумма'],
      pagination:{
        length: 5,
        page: 1,
        totalVisible: 5,
      },
      path:"/bills?page="
    }
  },
  mounted(){
    this.$store.dispatch('getUserDataAction', { path:this.path + 1 });
  },
  computed:{
    ...mapState(['bills', 'isDataLoading', 'user']),
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
  }
};
</script>

