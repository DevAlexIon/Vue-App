<template>
    <div>
        <table border="1px">
            <td> ID: {{player.id}}</td>
            <td> RANK: {{player.Rank}}</td>
            <td> NAME: {{player.Player}}</td>
            <td> AGETHATYEAR: {{player.AgeThatYear}}</td>
            <td> HITS: {{player.Hits}}</td>
            <td> YEAR: {{player.Year}}</td>
            <td> BATS: {{player.Bats}}</td>
        </table>
    </div>
</template>
<script>
import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from "axios"
Vue.use(VueAxios,axios)
    export default {
        data()
        {
            return {
                player: []
            }
        },
        computed: {
            playerId() {
                return parseInt(this.$route.params.id)
            }
        },
         mounted()
    {
         Vue.axios.get("https://api.sampleapis.com/baseball/hitsSingleSeason")
        .then(resp => {
            this.player = resp.data.find(player => player.id === this.playerId)
        })
        .catch(e => console.error(e))
    },
    }
</script>