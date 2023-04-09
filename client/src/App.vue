<template>
  <router-view/>
</template>

<style>
    .container{
        margin-left: auto;
        margin-right: auto;
        padding: 0px 160px;
        max-width: 660px;
        width: 100%;
    }
    .sidenav {
        height: 100%;
        width: 160px;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: #111;
        overflow-x: hidden;
        padding-top: 20px;
    }

    .sidenav a {
        width: 100%;
        padding: 6px 8px 6px 16px;
        text-decoration: none;
        font-size: 25px;
        color: #818181;
        display: block;
    }

    .sidenav a:hover {
        color: #f1f1f1;
    }

    .main {
        padding: 0px 40px;
        width: 100%;
    }

    .title{
        text-align: center;
        font-size: 32px;
    }
    
    ::-webkit-scrollbar {
        width: 10px;
    }
    ::-webkit-scrollbar-track {
        background-color: #FFF;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #818181;
    }
</style>
