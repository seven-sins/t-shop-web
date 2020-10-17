<template>
  <div class="index-container">
    <!-- 工具栏 -->
    <div class="t-grid-toolbar">
      <!-- 操作栏 -->
      <div class="t-btn">
        <LinkButton iconCls="icon-add">Add</LinkButton>
        <LinkButton iconCls="icon-edit">Edit</LinkButton>
        <LinkButton iconCls="icon-remove">Remove</LinkButton>
      </div>
      <!-- 搜索栏 -->
      <div class="t-query">
        <TextBox
          inputId="userName"
          name="userName"
          v-model="queryConf.userName"
        ></TextBox>
        <LinkButton iconCls="icon-search"></LinkButton>
      </div>
    </div>

    <!-- 列表组件 -->
    <div class="t-grid">
      <DataGrid
        style="height: 100%;"
        pagePosition="bottom"
        :pagination="true"
        :data="data"
        :total="total"
        :pageNumber="pageNumber"
        :pageSize="pageSize"
        @pageChange="changePage($event)"
        >

        <GridColumn field="userName" title="用户名" width="130"></GridColumn>
        <GridColumn field="userCode" title="用户编码" width="130"></GridColumn>
        <GridColumn field="loginAccount" title="登录账号" width="130"></GridColumn>
        <GridColumn field="phone" title="手机号" width="130"></GridColumn>
        <GridColumn field="idCard" title="证件号码" width="130"></GridColumn>
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
        <GridColumn align="center" width="100">
          <template slot="body" slot-scope="scope">
            <a class="t-cell-btn" @click="edit(scope.row)">编辑</a>
            <a class="t-cell-btn" @click="remove(scope.row)">删除</a>
          </template>
        </GridColumn>

      </DataGrid>
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
      <Edit :record="record" @cancelEdit="cancelEdit" />

    </Dialog>
  </div>
</template>

<script>
import http from "@/utils/http";
import Edit from "./Edit";

export default {
  name: "User",
  components: {
    Edit
  },
  data() {
    return {
      conf: {
        title: "编辑"
      },
      queryConf: {
        userName: ""
      },
      record: {},     // 选中行数据
      data: [],       // 列表数据
      pageNumber: 1,  // 当前页
      pageSize: 20,   // 每页显示x条记录
      total: 200      // 总记录数
    };
  },
  props: {},
  created() {},
  mounted() {
    let data = [];
    for (let i = 1; i <= this.total; i++) {
      let amount = Math.floor(Math.random() * 1000);
      let price = Math.floor(Math.random() * 1000);
      data.push({
        inv: "Inv No " + i,
        userName: "Name " + i,
        amount: amount,
        price: price,
        sex: 1,
        isSysUser: 1,
        cost: amount * price,
        note: "Note " + i
      });
    }
    this.data = data;
  },
  methods: {
    cancelEdit(args) {
      this.$refs.dlg.close();
    },
    edit(record) {
      this.record = record;
      this.$refs.dlg.open();
    },
    remove(record) {
      console.log(record);
    },
    changePage(pageParam) {
      this.pageNumber = pageParam.pageNumber;
      this.pageSize = pageParam.pageSize;
    },
    handleOk() {}
  }
};
</script>
<style lang="scss" scoped>
</style>
