<template>
  <div id="start">
    <md-card class="card-title">
      <md-card-header>
        <div id="square"></div>
        <div class="md-title">BookHub</div>
      </md-card-header>
    </md-card>

    <md-card class="card-main">
      <div class="main-buttons">
        <md-button to="/register" class="md-raised md-primary main-button">Регистрация</md-button>
        <md-button to="/login" class="md-raised md-primary main-button">Вход</md-button>
        <md-button to="/" class="link">Продолжить без регистрации</md-button>
      </div>
      <div class="main-image"></div> 
    </md-card>
  </div>
</template>

<script>
  export default {
    name: 'ButtonRouter'
  }
</script>

<style scoped>
  #start {
    height: 100vh;
    padding-top: 16px;
    background-color: #F4F4F4;
    width: 100%;
  }
  .card-title {
    width: 90%;
    margin: 0 auto;
    background-color: #D5D5D5;
    border-radius: 10px;
  }
  #square {
    width: 26px;
    height: 26px;
    background-color: #000000;
    border-radius: 5px;
    float: left;
  }
  .md-card-header {
    height: 44px;
    padding: 10px;  
  }
  .md-title {
    font: normal bold 24px/28px Roboto, sans-serif;
    float: left;
    margin-left: 21px;
  }
  .card-main {
    width: 90%;
    margin: 0 auto;
    height: 84vh;
    border-radius: 5px;
    margin-top: 21px;
  }
  .main-buttons {
    padding-top: 58px;
    text-align: center;
  }
  .main-button {
    margin: 10px auto;
  }
  .main-image {
    background: url('../../assets/soufflex.png') no-repeat center;
    height: 235px;
    margin-top: 85px;
  }
  .link {
    font-size: 10px;
    width: 60%;
  }
</style>

<style>
  .main-button {
    display: block;
    margin: 10px auto;
    width: 220px;
    background-color: #D5D5D5 !important;
    color: #000000 !important;
    border-radius: 10px;
    border: 1px solid black;
  }
</style>