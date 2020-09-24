<template>
  <v-container class=' align-center' >

    <Loading  v-show='isDataLoading'/>

    <v-simple-table dark v-if='bills'>
        <thead>
          <tr>
            <th class="text-left" v-for='obKeys in tableHeaders' :key="obKeys">
                {{obKeys}}
            </th>

          </tr>
        </thead>

         <tbody>
          <tr v-for="item in bills.bills" :key="item._id.bill_id">
            <td>{{ item._id.address }}</td>
            <td>{{ item._id.bill_description }}</td>
            <td>{{ item._id.created }}</td>
            <td>{{ item._id.total_sum }}</td>
          </tr>
        </tbody>
    </v-simple-table>

    <v-pagination
        class='mt-10'
        v-if='bills && !bills.bills.lenght'
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
        circle: true,
        disabled: false,
        length: 5,
        page: 1,
        totalVisible: 5,
      },
      path:"/bills?page="
    }
  },
  created(){
    this.$store.dispatch('getUserData', { path:this.path + 1 });
  },
  computed:{
    ...mapState(['bills', 'isDataLoading', 'user']),
    goToPage:{
        get(){
            return parseInt(this.bills.page)
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