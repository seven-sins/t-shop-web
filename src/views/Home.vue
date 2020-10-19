<template>
  <div class="home-container">
    <Layout style="height: 100%;">
      <LayoutPanel class="layout-north" region="north" style="height:80px;">
        <div class="main-header"></div>
      </LayoutPanel>
      <LayoutPanel region="west" style="width:230px;">
        <div class="main-left">
          <SideMenu
            :data="menus"
            :collapsed="collapsed"
            @itemClick="onItemClick($event)"
          >
          </SideMenu>
        </div>
      </LayoutPanel>
      <LayoutPanel region="center" style="height:100%">
        <div class="main-center">
          <router-view></router-view>
        </div>
      </LayoutPanel>
    </Layout>
  </div>
</template>

<script>
import http from "@/utils/http";
import { menu_get } from "@/utils/urls";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      collapsed: false,
      menus: []
    };
  },
  mounted(){
    this.load();
  },
  methods: {
    load() {
      http.get(menu_get, {}, response => {
        this.menus = response.data;
        if(this.menus){
          this.menus[0].state = "open";
          for(let i = 0; i<this.menus.length; i++){
            this.menus[i].iconCls = this.menus[i].icon;
          }
        }
      });
    },
    toggle() {
      this.collapsed = !this.collapsed;
      this.width = this.collapsed ? 50 : 200;
    },
    onItemClick(item) {
      this.$router.push(item.url);
    }
  }
};
</script>
<style lang="scss" scoped>
.home-container {
  height: 100%;
}
.main-header {
  background: #3ac9d6;
  height: 100%;
  box-sizing: border-box;
  .header-left {
    width: 230px;
    height: 100%;
  }
}
.pannel-body {
  box-sizing: border-box;
}
.main-left {
  height: 100%;
  box-sizing: border-box;
  
}
.main-body {
  min-height: 400px;
  height: 100%;
}
.main-center {
  height: 100%;
}
</style>
