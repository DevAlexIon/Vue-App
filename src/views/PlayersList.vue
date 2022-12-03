<template>
    <div>
      <h1>Player List</h1>
      <div>
        <button @click="sort('Hits')" v-bind:class="[sortBy === 'Hits' ? sortDirection : '']">Sort By Hits and Rank</button>
        <button @click="sort('AgeThatYear')" v-bind:class="[sortBy === 'AgeThatYear' ? sortDirection : '']">Filter by AgeThatYear</button>
        <table border="1px">
            <tr>
                <td>Id</td>
                <td>Rank</td>
                <td>Player</td>
                <td>AgeThatYear</td>
                <td>Hits</td>
            </tr>
            <tr v-for="item in sortedList" v-bind:key="item.id">
                <td>{{item.id}}</td>
                <td>{{item.Rank}}</td>
                <td>{{item.Player}}</td>
                <td>{{item.AgeThatYear}}</td>
                <td>{{item.Hits}}</td>
                <router-link :to="{path: `/details/${item.id}`}"><button>Details</button></router-link>
            </tr>
        </table>
      </div>
    </div>
</template>
<script>
import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from "axios"
Vue.use(VueAxios,axios)
export default {
    name: "PlayerList",
    data()
    {
        return {
            list: [],
            sortBy: 'Hits',
            sortDirection: "desc",
        }
    },
    mounted()
    {
         Vue.axios.get("https://api.sampleapis.com/baseball/hitsSingleSeason")
        .then(resp => {
            this.list = resp.data
        })
        .catch(e => console.error(e))
    },
   methods: {
    sort: function (s) {
        if (s === this.sortBy) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
        }
        this.sortBy = s
    }
   },
   computed: {
    sortedList: function(){
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        return this.list.sort((p1,p2) => {
            let modifier = 1;
            if(this.sortDirection === 'desc') modifier = -1;
            if(p1[this.sortBy] < p2[this.sortBy] ) return -1 * modifier;
            if(p1[this.sortBy] > p2[this.sortBy] ) return 1 * modifier;
            return 0;
        });

    },
}
}
</script>

<style>
.asc:after{
    content: "\25B2"
}

.desc:after{
    content: "\25BC"
}</style>