<template>
  <div>
      <h1 class="title">{{tree.title}}</h1>
      <p>{{tree.content}}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    
  data() {
      return {
          type: this.$route.params.type, // Value taken from url -> _type
          trees: [
              {
                  type: 'culture',
                  title: 'Arbre de la culture',
                  content: '[Contenu de l\'arbre de la culture]'
              },
              {
                  type: 'militaire',
                  title: 'Arbre de la culture',
                  content: '[Contenu de l\'arbre militaire]'
              },
              {
                  type: 'vaisseau',
                  title: 'Arbre d\'amélioration du vaisseau',
                  content: '[Contenu de l\'arbre d\'amélioration du vaisseau]'
              },
              {
                  type: 'production',
                  title: 'Arbre de production',
                  content: '[Contenu de l\'arbre de production]'
              }
          ]
      }
   },
   computed: {
       tree() {
           return this.trees.find(tree => tree.type === this.type)
       }
   }
   })
</script>