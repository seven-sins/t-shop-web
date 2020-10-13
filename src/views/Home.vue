<template>
  <a-layout id="components-layout-demo-fixed-sider">
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
      <div class="logo"></div>
      <a-menu theme="dark" :default-selected-keys="['1']" mode="inline">
        <a-menu-item key="1">
          <a-icon type="pie-chart" />
          <span>Option 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="desktop" />
          <span>Option 2</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <span slot="title"><a-icon type="user" /><span>User</span></span>
          <a-menu-item key="3">
            Tom
          </a-menu-item>
          <a-menu-item key="4">
            Bill
          </a-menu-item>
          <a-menu-item key="5">
            Alex
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="team" /><span>Team</span></span>
          <a-menu-item key="6">
            Team 1
          </a-menu-item>
          <a-menu-item key="8">
            Team 2
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <a-icon type="file" />
          <span>File</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header :style="{ background: '#fff', padding: 0 }" >
        <div class="home-header">
          <span class="left">管理后台</span>
          <span class="right">管理员</span>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '0 16px 0', overflow: 'initial' }">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>

        <div class="home-content">
          <div class="home-content-center">

            <router-view></router-view>

          </div>
        </div>
      </a-layout-content>
     
    </a-layout>
  </a-layout>
</template>

<script>
import http from "@/utils/http";
import { onMounted, onUnmounted, reactive } from "@vue/composition-api";
export default {
  name: "Home",
  components: {
    
  }, 
  setup(props, context){
    const panes = reactive([
      { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
      { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
      { title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false },
    ]);

    const test = () => {
      http.post("/rest/admin/gbShop");
    }
    const handleOpen = () => {

    }
    const handleClose = () => {

    }

    onMounted(() => {

    })

    onUnmounted(() => {
      
    })

    return {
      test,
      handleOpen,
      handleClose
    }
  }
};
</script>
<style lang="scss" scoped>
#app{
  .ant-layout{
    height: 100%;
  }
  .home-header{
    background:#001529; padding: 0 0 0 13px; position: relative; color: #fff; border-left: 1px solid #ddd;
    .left{
      font-weight: bold; 
    }
    .right{
      display: inline-block; width: 200px; position: absolute; right: 13px; text-align: right; line-height: 37px;
    }
  }
  .home-content{
    height: 100%; margin-top: -71px; padding-top: 71px; box-sizing: border-box;
    .home-content-center{
      height: 100%; background: #fff;
    }
  }

  
}
</style>
