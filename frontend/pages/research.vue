<template>
  <center>
    <table class="table table-striped table-bordered">
      <tbody>
          <tr>
              <td><img width="32px" src="~/static/culture.svg" v-on:click="showTree('tree1')"/> {{research.book}}</td>
              <td><img width="32px" src="~/static/war.svg" v-on:click="showTree('tree2')"/> {{research.bomb}}</td>
              <td><img width="32px" src="~/static/exploration.svg" v-on:click="showTree('tree2')"/> {{research.telescope}}</td>
              <td><img width="32px" src="~/static/production.svg" v-on:click="showTree('tree1')"/> {{research.factory}}</td>
          </tr>
      </tbody>
    </table>
    <img height="600px" :src="require('~/static/'+currentTree+'.png')"/>
  </center>
</template>

<script>
export default {
  data() {
    return {
        currentTree: "tree1",
        research: {
          book: 4,
          bomb: 12,
          telescope: 7,
          factory: 6,
        }
    };
  },
  methods: {
    showTree: function (tree) {
      this.currentTree = tree;
    }
  }
};
</script>
<style scoped>
    table {
      border-spacing: 50px;
    }
</style>