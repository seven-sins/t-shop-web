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
        <Label for="shopName">店铺名称:</Label>
        <TextBox
          inputId="shopName"
          name="shopName"
          v-model="query.shopName"
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

        <GridColumn field="shopName" title="店铺" width="230"></GridColumn>
        <GridColumn field="shopCode" title="编码" width="130"></GridColumn>
        <GridColumn field="manager" title="掌柜" width="130"></GridColumn>
        <GridColumn field="managerQrcode" title="二维码" width="300"></GridColumn>
        <GridColumn field="customerService" title="客服" width="130"></GridColumn>
        <GridColumn field="customerServiceQrcode" title="客服二维码" width="300"></GridColumn>
        <GridColumn field="logoImg" title="店铺logo" width="130"></GridColumn>

        <GridColumn field="phone" title="联系电话" width="130"></GridColumn>
        <GridColumn field="fax" title="传真" width="130"></GridColumn>
        <GridColumn field="themeName" title="主题名称" width="130"></GridColumn>

        <GridColumn field="saleQty" title="总销量" width="130"></GridColumn>
        <GridColumn field="grade" title="评分" width="130"></GridColumn>
        <GridColumn field="level" title="等级" width="130"></GridColumn>

        <GridColumn field="province" title="省份" width="130"></GridColumn>
        <GridColumn field="city" title="城市" width="130"></GridColumn>
        <GridColumn field="address" title="店铺地址" width="300"></GridColumn>

        <GridColumn field="isDisabled" title="是否停用" width="130">
            <template slot="body" slot-scope="scope">
              {{ scope.row.isDisabled == 1 ? '是': '否' }}
            </template>
        </GridColumn>
        <GridColumn field="createdBy" title="创建人" width="130"></GridColumn>
        <GridColumn field="createdTime" title="创建时间" width="160"></GridColumn>
        <GridColumn field="updatedBy" title="修改人" width="130"></GridColumn>
        <GridColumn field="updatedTime" title="修改时间" width="160"></GridColumn>
        <!-- 操作栏 -->
        <GridColumn align="center" width="100">
          <template slot="body" slot-scope="scope">
            <a class="t-cell-btn" @click="edit(scope.row)">编辑</a>
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
  </div>
</template>

<script>
import http from "@/utils/http";
import Edit from "./Edit";
import { shop_get, shop_delete } from "@/utils/urls";

export default {
  name: "Shop",
  components: {
    Edit
  },
  data() {
    return {
      conf: {
        title: "编辑"
      },
      query: {
        shopName: ""
      },
      record: {},     // 选中行数据
      data: [],       // 列表数据
      pageNumber: 1,  // 当前页
      pageSize: 20,   // 每页显示x条记录
      total: 0        // 总记录数
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
        pageSize: this.pageSize,
      }
      param = Object.assign(param, this.query);

      http.get(shop_get, param, response => {
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
    remove(record) {
      s.confirm({
        msg: "确定删除选中数据吗?",
        confirm: () => {
          http.delete(shop_delete + "/" + record.id, {}, response => {
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
