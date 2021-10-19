<template>
  <div class="content">
    <table class="table table-striped table-bordered">
      <tbody>
        <tr>
          <td v-for="(skill, index) in crewInfos.research" :key="index">
            <img
              width="32px"
              :src="require('~/static/' + skill.name + '.svg')"
              v-on:click="showTree(skill.name)"
            />
            {{ skill.numberDone }}/{{ skill.max }}
          </td>
        </tr>
      </tbody>
    </table>
    <img height="600px" :src="require('~/static/' + currentTree + '.png')" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTree: 'tree2',
    }
  },
  methods: {
    showTree: function (tree) {
      switch (tree) {
        case 'military': {
        }
        case 'production': {
          this.currentTree = 'tree2'
          break
        }
        default: {
          this.currentTree = 'tree1'
        }
      }
    },
  },
  // Fetch data (post) before rendering the page. No need of placeholder in the code, then.
  async asyncData({ params, $axios }) {
    const crewInfos = await $axios
      .post('/fakeAPI', { api: 'GetCrewInfos' })
      .then((res) => res.data.crewInfos)
    return { crewInfos }
  },
}
</script>