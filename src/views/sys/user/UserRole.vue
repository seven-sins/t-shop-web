<template>
  <div class="index-container">
    <!-- 工具栏 -->
    <div class="t-grid-toolbar">
      <!-- 操作栏 -->
      <div class="t-btn">
        <LinkButton iconCls="icon-add" @click="save()">保存</LinkButton>
      </div>
      <!-- 搜索栏 -->
      <div class="t-query">
        <Label for="roleName">角色名称:</Label>
        <TextBox
          inputId="roleName"
          name="roleName"
          v-model="query.roleName"
        ></TextBox>
        <LinkButton iconCls="icon-search" @click="load()"></LinkButton>
        <LinkButton iconCls="fa fa-refresh" @click="refresh()"></LinkButton>
      </div>
    </div>

    <!-- 列表组件 -->
    <div class="t-grid">
      <DataGrid
        style="height: 100%;"
        :data="data"
        >

        <GridColumn width="60" align="center">
          <template slot="body" slot-scope="scope">
            <input type="checkbox" :checked="scope.row.isSelect==true?'checked':''" @change="selectChange($event, scope.row)" />
          </template>
        </GridColumn>
        <GridColumn field="roleName" title="角色名称" width="130"></GridColumn>
        <GridColumn field="roleCode" title="角色编码" width="130"></GridColumn>
        <GridColumn field="shopName" title="店铺" width="200"></GridColumn>
        <GridColumn field="isDisabled" title="是否停用" width="130">
            <template slot="body" slot-scope="scope">
              {{ scope.row.isDisabled == 1 ? '是': '否' }}
            </template>
        </GridColumn>

      </DataGrid>

      <Pagination :total="total" :pageSize="pageSize" :pageNumber="pageNumber" @pageChange="changePage($event)"></Pagination>
    </div>

  </div>
</template>

<script>
import http from "@/utils/http";
import { role_get, user_role_get, user_role_post } from "@/utils/urls";

export default {
  name: "Role",
  components: {
    
  },
  data() {
    return {
      conf: {
        title: "编辑",
        loadUserRoleData: false
      },
      query: {},
      data: [],       // 列表数据
      pageNumber: 1,  // 当前页
      pageSize: 200,   // 每页显示x条记录
      total: 200       // 总记录数
    };
  },
  props: ["record"],
  created() {},
  mounted() {
    this.load();
  },
  methods: {
    load(){
      let param = {
        pageNum: this.pageNumber,
        pageSize: this.pageSize
      }
      param = Object.assign(param, this.query);

      http.get(role_get, param, response => {
        let _data = response.data;
        for(let i = 0; i<_data.length; i++){
          _data[i].isSelect = false;
        }
        this.data = _data;
        this.total = response.total;
        this.conf.loadUserRoleData = true;
      });
    },
    selectChange(e, row){
      let checked = e.target.checked;
      for(let i = 0; i<this.data.length; i++){
        if(row.id == this.data[i].id){
          this.data[i].isSelect = checked;
          break;
        }
      }
    },
    refresh(){
      this.query = {};
      this.load();
    },
    loadUserRole(){
      let param = {
        pageNum: this.pageNumber,
        pageSize: this.pageSize,
        userId: this.record.id
      }
      http.get(user_role_get, param, response => {
        let userRoleData = response.data;
        if(!userRoleData || !this.data){
          return;
        }
        for(let i = 0; i<this.data.length; i++){
          this.data[i].isSelect = false;
          for(let j = 0; j<userRoleData.length; j++){
            if(this.data[i].id == userRoleData[j].roleId){
              this.data[i].isSelect = true;
            }
          }
        }
      });
    },
    save(){
      let roleIdList = [];
      for(let i = 0; i<this.data.length; i++){
        if(this.data[i].isSelect){
          roleIdList.push({userId: this.record.id, roleId: this.data[i].id});
        }
      }
      http.post(user_role_post + "/" + this.record.id, roleIdList, response => {
        this.$emit("cancelUserRole");
      });
    },
    changePage(page) {
      this.pageNumber = page.pageNumber;
      this.pageSize = page.pageSize;
      this.load();
    }
  },
  watch: {
    'conf.loadUserRoleData': function(newVal, oldVal){
      if(newVal){
        this.loadUserRole();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
