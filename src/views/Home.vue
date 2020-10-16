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
        <div class="main-center">Center Region</div>
      </LayoutPanel>
    </Layout>
  </div>
</template>

<script>
import http from "@/utils/http";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      collapsed: false,
      // selection: null,
      menus: [
        {
          text: "Item1",
          iconCls: "icon-sum",
          state: "open",
          children: [
            {
              text: "Option1",
              url: "http://www.baidu.com",
            },
            {
              text: "Option2"
            },
            {
              text: "Option3",
              children: [
                {
                  text: "Option31"
                },
                {
                  text: "Option32"
                }
              ]
            }
          ]
        },
        {
          text: "Item2",
          iconCls: "icon-more",
          children: [
            {
              text: "Option4"
            },
            {
              text: "Option5"
            },
            {
              text: "Option6"
            }
          ]
        }
      ]
    };
  },
  methods: {
    toggle() {
      this.collapsed = !this.collapsed;
      this.width = this.collapsed ? 50 : 200;
    },
    onItemClick(item) {
      console.log(item);
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
