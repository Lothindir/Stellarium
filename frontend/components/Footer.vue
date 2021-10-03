<template>
    <footer>
        <NuxtLink to="/" tag="img" :src="require('~/static/galaxy.svg')"></NuxtLink>
        <NuxtLink to="/ship" tag="img" :src="require('~/static/battleship.svg')"></NuxtLink>
        <NuxtLink to="/research" tag="img" :src="require('~/static/research.svg')"></NuxtLink>
        <NuxtLink to="/challenges" tag="img" :src="require('~/static/challenges.svg')"></NuxtLink>
        <NuxtLink to="/results" tag="img" :src="require('~/static/results.svg')"></NuxtLink>
    </footer>
</template>
<style scoped>
    footer {
        position: absolute;
        flex-basis: 33%;
        bottom: 2vh;
        width: 100vw;
        display: flex;
        justify-content: space-around;
    }

    img {
        min-width: 25px;
        width: 10vw;
        max-width: 40px;
        opacity: 0.6;
    }

    .nuxt-link-exact-active{
        opacity: 1;
        filter: drop-shadow(0 0 1rem rgba(255,106,0,1));
    }
</style>