<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" @click="test()" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import http from "@/utils/http";

export default {
  name: "Home",
  components: {
    HelloWorld
  }, 
  methods: {
    test(){
      http.post("/rest/admin/gbShop");
    }
  }
};
</script>
