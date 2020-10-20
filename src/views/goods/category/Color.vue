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
        <Label for="categoryName">分类名称:</Label>
        <TextBox
          inputId="categoryName"
          name="categoryName"
          v-model="query.categoryName"
        ></TextBox>
        <LinkButton iconCls="icon-search" @click="load()"></LinkButton>
        <LinkButton iconCls="fa fa-refresh" @click="refresh()"></LinkButton>
      </div>
    </div>

    <!-- 列表组件 -->
    <div class="t-grid">
      <TreeGrid 
        style="height: 100%;"
        :data="data" 
        idField="id" 
        treeField="categoryName"
        >

        <GridColumn field="categoryName" title="分类名称" width="130"></GridColumn>
        <GridColumn field="categoryCode" title="分类编码" width="130"></GridColumn>

        <GridColumn field="remark" title="备注" width="200"></GridColumn>

        <GridColumn field="sort" title="排序" width="100"></GridColumn>
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

      </TreeGrid>

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
      <Edit :record="record" @cancelEdit="cancelEdit" @load="load" :categoryData="data" />

    </Dialog>
  </div>
</template>

<script>
import http from "@/utils/http";
import Edit from "./Edit";
import { category_get, category_delete } from "@/utils/urls";

export default {
  name: "Category",
  components: {
    Edit
  },
  data() {
    return {
      conf: {
        title: "编辑"
      },
      query: {
        menuName: ""
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

      http.get(category_get, param, response => {
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
          http.delete(category_delete + "/" + record.id, {}, response => {
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
