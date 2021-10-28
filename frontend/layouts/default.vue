<template>
  <div id="layout">
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<style>

  @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;600;700;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,900&display=swap');

  html {
    background: rgb(2,0,36);
    background: linear-gradient(5deg, rgba(2,0,36,1) 0%, rgb(32, 19, 107) 71%, rgba(255,106,0,1) 100%);
    color:white;
    font-family: 'Source Code Pro', monospace;
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
    grid-template-rows: 40px 1fr 50px; 
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

  h1{
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-bottom: 0.4rem;
    padding-left: 1rem;
    padding-right: 1rem;
    color: rgb(32, 19, 107);
    font-weight: 900;
    font-size: 1.5rem;
    text-transform: uppercase;
    font-family:'Source Sans Pro', sans-serif;
    width:fit-content;
    background: white;
    text-rendering: geometricPrecision;
    transform: skewX(-20deg);
  }

  h2{
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-bottom: 0.4rem;
    padding-left: 1rem;
    padding-right: 1rem;
    color: white;
    font-weight: 400;
    font-size: 1.2rem;
    text-transform: uppercase;
    font-family:'Source Sans Pro', sans-serif;
    width:fit-content;
    border:white solid 1px;
    text-rendering: geometricPrecision;
    transform: skewX(-20deg);
  }

  input{
    width: 80%;
    text-align: center;
    background: rgba(0, 190, 190, 0.2);
  }

  input:focus-visible{
    outline: none;
    background: rgba(0, 190, 190, 0.2);
  }

  button, button.sf{
    width: fit-content;
    background: rgba(0, 190, 190, 0.2);
    border: 1px solid #00bebe;
    padding-left: 1em;
    padding-right: 1em;
    color: #00bebe;
    font-weight: 800;
    height: 3rem;
    text-transform: uppercase;
    outline: none;
  }

  .is-danger{
    display: flex;
    align-items: center;
    text-transform: uppercase;
    -webkit-text-stroke: 1px black;
    -webkit-text-fill-color: white;
    background: repeating-linear-gradient(
      45deg,
      gold,
      gold 10px,
      black 10px,
      black 20px
    );
    height: 3rem;
    width: fit-content;
    padding-left: 1em;
    padding-right: 1em;
    font-weight: 800;
    font-size: 1.2rem;
    border: gold 3px solid;
  }

</style>