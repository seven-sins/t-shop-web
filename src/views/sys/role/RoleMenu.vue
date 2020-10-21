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
        <Label for="menuName">菜单名称:</Label>
        <TextBox
          inputId="menuName"
          name="menuName"
          v-model="query.menuName"
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
        treeField="menuName"
        >

        <GridColumn width="60" align="center">
          <template slot="body" slot-scope="scope">
            <input type="checkbox" :checked="scope.row.isSelect==true?'checked':''" @change="selectChange($event, scope.row)" />
          </template>
        </GridColumn>
        <GridColumn field="menuName" title="菜单名称" width="130"></GridColumn>
        <GridColumn field="url" title="URL" width="130"></GridColumn>
        <GridColumn field="icon" title="图标" width="130">
          <template slot="body" slot-scope="scope">
            <span :class="scope.row.icon"></span>
          </template>
        </GridColumn>
        <GridColumn field="isMenu" title="是否菜单" width="130">
          <template slot="body" slot-scope="scope">
            {{ scope.row.isMenu == 1 ? '是': '否' }}
          </template>
        </GridColumn>
        <GridColumn field="isBtn" title="是否功能" width="130">
          <template slot="body" slot-scope="scope">
            {{ scope.row.isBtn == 1 ? '是': '否' }}
          </template>
        </GridColumn>
        <GridColumn field="authCode" title="权限编码" width="130"></GridColumn>
        <GridColumn field="sort" title="排序" width="100"></GridColumn>
        <GridColumn field="isDisabled" title="是否停用" width="130">
          <template slot="body" slot-scope="scope">
            {{ scope.row.isDisabled == 1 ? '是': '否' }}
          </template>
        </GridColumn>

      </TreeGrid>

      <Pagination :total="total" :pageSize="pageSize" :pageNumber="pageNumber" @pageChange="changePage($event)"></Pagination>
    </div>

  </div>
</template>

<script>
import http from "@/utils/http";
import { role_menu_get, role_menu_post } from "@/utils/urls";

export default {
  name: "RoleMenu",
  components: {},
  data() {
    return {
      conf: {
        title: "编辑",
        selectData: []
      },
      query: {
        menuName: ""
      },
      data: [],       // 列表数据
      pageNumber: 1,  // 当前页
      pageSize: 200,  // 每页显示x条记录
      total: 200      // 总记录数
    };
  },
  props: ["record"],
  created() {},
  mounted() {
    this.load();
  },
  methods: {
    load() {
      let param = {
        pageNum: this.pageNumber,
        pageSize: this.pageSize
      };
      param = Object.assign(param, this.query);
      //
      http.get(role_menu_get + "/" + this.record.id + "/menuList", param, response => {
        this.data = response.data;
        this.total = response.total;
      });
    },
    refresh() {
      this.query = {};
      this.load();
    },
    // 保存
    save() {
      this.conf.selectData = [];
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].isSelect) {
          this.conf.selectData.push({
            roleId: this.record.id,
            menuId: this.data[i].id
          });
        }
        this.getSelectData(this.data[i].children);
      }

      http.post(role_menu_post + "/" + this.record.id, this.conf.selectData, response => {
        this.$emit("cancelRoleMenu");
      });
    },
    getSelectData(list) {
      if (!list) {
        return;
      }
      for (let i = 0; i < list.length; i++) {
        if (list[i].isSelect) {
          this.conf.selectData.push({
            roleId: this.record.id,
            menuId: list[i].id
          });
        }
        this.getSelectData(list[i].children);
      }
    },
    // checkbox选中状态变更
    selectChange(e, row) {
      let checked = e.target.checked;
      for (let i = 0; i < this.data.length; i++) {
        if (row.id == this.data[i].id) {
          this.data[i].isSelect = checked;
        }
        this.updateCheckStatus(row.id, checked, this.data[i].children);
      }
    },
    // 递归更新状态
    updateCheckStatus(id, checked, list) {
      if (!list) {
        return;
      }
      for (let i = 0; i < list.length; i++) {
        if (id == list[i].id) {
          list[i].isSelect = checked;
        }
        if (list[i].children) {
          this.updateCheckStatus(id, checked, list[i].children);
        }
      }
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
