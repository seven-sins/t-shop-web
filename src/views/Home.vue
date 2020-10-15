<template>
  <div class="home-container">
    <Layout style="height: 100%;">
      <LayoutPanel class="layout-north" region="north" style="height:80px;">
        <div class="main-header">
          <div class="header-left">
          </div>
          <div class="header-right">
          </div>
        </div>
      </LayoutPanel>
      <LayoutPanel region="west" style="width:230px;">
        <div class="main-left">West Region</div>
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
      title: "AppLayout",
      width: 200,
      collapsed: false,
      selectedMenu: null,
      menus: [
        {
          text: "Forms",
          iconCls: "fa fa-wpforms",
          state: "open",
          children: [
            {
              text: "Form Element"
            },
            {
              text: "Wizard"
            },
            {
              text: "File Upload"
            }
          ]
        },
        {
          text: "Mail",
          iconCls: "fa fa-at",
          selected: true,
          children: [
            {
              text: "Inbox"
            },
            {
              text: "Sent"
            },
            {
              text: "Trash",
              children: [
                {
                  text: "Item1"
                },
                {
                  text: "Item2"
                }
              ]
            }
          ]
        },
        {
          text: "Layout",
          iconCls: "fa fa-table",
          children: [
            {
              text: "Panel"
            },
            {
              text: "Accordion"
            },
            {
              text: "Tabs"
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
      this.selectedMenu = item;
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
  .header-left{
    width: 230px;
    height: 100%;
  }
}
.pannel-body{
  box-sizing: border-box; border-color:#fff;
}
.main-left {
  height: 100%;border: none;box-sizing: border-box;
}
.main-body {
  background: #ecf0f5;
  min-height: 400px;
  height: 100%;
}
.main-center{
  height: 100%;
}
</style>
