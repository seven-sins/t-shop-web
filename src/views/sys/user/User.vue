<template>
  <div class="index-container">
    <!-- 工具栏 -->
    <div class="t-grid-toolbar">
      <!-- 操作栏 -->
      <div class="t-btn">
        <LinkButton iconCls="icon-add" @click="add()">添加</LinkButton>
      </div>
      <!-- 搜索栏 -->
      <div class="t-query">
        <Label for="userName">用户名:</Label>
        <TextBox
          inputId="userName"
          name="userName"
          v-model="query.userName"
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

        <GridColumn field="userName" title="用户名" width="130"></GridColumn>
        <GridColumn field="userCode" title="用户编码" width="130"></GridColumn>
        <GridColumn field="shopName" title="店铺" width="300"></GridColumn>
        <GridColumn field="loginAccount" title="登录账号" width="130"></GridColumn>
        <GridColumn field="phone" title="手机号" width="130"></GridColumn>
        <GridColumn field="idCard" title="证件号码" width="180"></GridColumn>
        <GridColumn field="birthday" title="生日" width="130"></GridColumn>
        <GridColumn field="sex" title="性别" width="130">
          <template slot="body" slot-scope="scope">
            {{ scope.row.sex == 1 ? '男': '女' }}
          </template>
        </GridColumn>
        <GridColumn field="age" title="年龄" width="130"></GridColumn>
        <GridColumn field="isSysUser" title="是否系统用户" width="130">
            <template slot="body" slot-scope="scope">
              {{ scope.row.isSysUser == 1 ? '是': '否' }}
            </template>
        </GridColumn>
        <GridColumn field="isDisabled" title="是否停用" width="130">
            <template slot="body" slot-scope="scope">
              {{ scope.row.isDisabled == 1 ? '是': '否' }}
            </template>
        </GridColumn>

        <!-- 操作栏 -->
        <GridColumn align="center" width="200">
          <template slot="body" slot-scope="scope">
            <a class="t-cell-btn" @click="edit(scope.row)">编辑</a>
            <a class="t-cell-btn" @click="setUserRole(scope.row)">设置角色</a>
            <a class="t-cell-btn" @click="remove(scope.row)">删除</a>
          </template>
        </GridColumn>

      </DataGrid>

      <Pagination :total="total" :pageSize="pageSize" :pageNumber="pageNumber" @pageChange="changePage($event)"></Pagination>
    </div>

    <!-- 编辑窗口 -->
    <Dialog
      ref="dlg"
      bodyCls="f-column"
      borderType="none"
      :title="conf.title"
      :modal="true"
      :draggable="true"
      closed
      :dialogStyle="{ width: '800px', height: '500px' }"
      >
      <Edit :record="record" @cancelEdit="cancelEdit" @load="load" />

    </Dialog>

    <!-- 设置角色 -->
    <Dialog
      ref="userRoleDlg"
      bodyCls="f-column t-popup-window"
      borderType="none"
      :title="conf.title"
      :modal="true"
      :draggable="true"
      closed
      :dialogStyle="{ width: '800px', height: '500px' }"
      >
      <UserRole :record="record" @cancelUserRole="cancelUserRole" @load="load" />

    </Dialog>


  </div>
</template>

<script>
import http from "@/utils/http";
import Edit from "./Edit";
import UserRole from "./UserRole";
import { user_get, user_delete } from "@/utils/urls";

export default {
  name: "User",
  components: {
    Edit,
    UserRole
  },
  data() {
    return {
      conf: {
        title: "编辑"
      },
      query: {
        userName: ""
      },
      record: {},     // 选中行数据
      data: [],       // 列表数据
      pageNumber: 1,  // 当前页
      pageSize: 20,   // 每页显示x条记录
      total: 50       // 总记录数
    };
  },
  props: {},
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

      http.get(user_get, param, response => {
        this.data = response.data;
        this.total = response.total;
      });
    },
    refresh(){
      this.query = {};
      this.load();
    },
    cancelEdit(args) {
      this.$refs.dlg.close();
    },
    cancelUserRole(args) {
      this.$refs.userRoleDlg.close();
      s.msg({msg: "操作成功", second: 300});
    },
    add(){
      this.record = {};
      this.conf.title = "新增";
      this.$refs.dlg.open();
    },
    edit(record) {
      this.record = record;
      this.conf.title = "编辑";
      this.$refs.dlg.open();
    },
    setUserRole(record){
      // 设置角色
      this.record = record;
      this.conf.title = "设置角色";
      this.$refs.userRoleDlg.open();
    },
    remove(record) {
      s.confirm({
        msg: "确定删除选中数据吗?",
        confirm: () => {
          http.delete(user_delete + "/" + record.id, {}, response => {
            this.load();
          })
        }
      })
    },
    changePage(page) {
      this.pageNumber = page.pageNumber;
      this.pageSize = page.pageSize;
      this.load();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
