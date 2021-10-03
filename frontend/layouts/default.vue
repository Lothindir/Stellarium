<template>
  <div id="layout">
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>
<style>
  html {
    background: rgb(2,0,36);
    background: linear-gradient(5deg, rgba(2,0,36,1) 0%, rgb(32, 19, 107) 71%, rgba(255,106,0,1) 100%);
    background-attachment: fixed;
    color:white;
    font-family: Helvetica, "Open Sans", sans-serif;
    height: 100vh;
  }

  body{
    position: absolute;
    padding: 0.5em;
    height: 100%;
    width: 100%;
  }

  #__nuxt, #__layout{
    height: 100%;
  }

  #layout {
    position: relative;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr; 
    grid-template-rows: 30px 1fr 30px; 
    gap: 0.5em 0; 
    grid-template-areas:
      "header"
      "content"
      "footer";
  }
  
  #header {
    display: flex;
    justify-content: space-around;
    align-content: space-around;
    grid-area: header;
  }
  
  .content {
    display: flex;
    flex-direction: column;
    grid-area: content;
    height: 100%;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .content::-webkit-scrollbar {
    display: none;
  }

  #footer {
    display: flex;
    justify-content: space-around;
    align-content: space-around;
    grid-area: footer;
  }
  .galaxy { grid-area: galaxy; }
  .battleship { grid-area: battleship; }
  .research { grid-area: research; }
  .challenges { grid-area: challenges; }
  .scores { grid-area: scores; }



</style>