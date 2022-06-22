<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
    <i class="el-icon-search"></i>
      <span> 筛选搜索</span>
      <el-button
        style="float:right"
        type="primary"
        @click="handleSearchList()"
        size="small">
        查询搜索
      </el-button>
      <el-button
        style="float:right;margin-right: 15px"
        @click="handleResetSearch()"
        size="small">
        重置
      </el-button>
    </div>
    <div style="margin-top: 15px">
      <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
        <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.keyword" class="input-width" placheholder="账号/姓名" clearable></el-input>
        </el-form-item>
      </el-form>
    </div>
    </el-card>
  <el-card class="operate-container" shadow="never">
    <i class="el-icon-tickets"></i>
    <span>数据列表</span>
    <el-button size="mini" class="btn-add" @click="handleAdd()"  style="margin-left: 20px">添加</el-button>
  </el-card>
    <div class="table-container">
      <el-table ref="adminTable"
                :data="list"
                style="width:100%;"
                v-loading="listLoading" border>
      <el-table-column  label="编号" width="100"  align="center">
        <template slot-scope="scope">{{scope.row.id}}}</template>
      </el-table-column>
        <el-table-column label="帐号" align="center">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{scope.row.nickName}}</template>
        </el-table-column>
        <el-table-column label="邮箱" align="center">
          <template slot-scope="scope">{{scope.row.email}}</template>
        </el-table-column>
        <el-table-column label="添加时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="最后登录" width="160" align="center">
          <template slot-scope="scope">{{scope.row.loginTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="是否启用" width="140"  align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index,scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
    import {fetchList,createAdmin,updateAdmin,updateStatus,deleteAdmin,getRoleByAdmin,allocRole} from '@/api/login';
    import {fetchAllRoleList} from '@/api/role';
    import {formatDate} from '@/utils/date';

    const  defaultListQuery ={
        pageNum:1,
        pageSize:10,
        keyword:null
    };
    const defaultAdmin ={
        id: null,
        username: null,
        password: null,
        nickName: null,
        email: null,
        note: null,
        status: 1
    };
export default {
    name: 'adminList',
    data(){
      return{
          listQuery: Object.assign({}, defaultListQuery),
          list: null,
          total: null,
          listLoading: false,
          dialogVisible: false,
          admin: Object.assign({}, defaultAdmin),
          isEdit: false,
          allocDialogVisible: false,
          allocRoleIds:[],
          allRoleList:[],
          allocAdminId:null
      }
    },
    created() {
        this.getList();
        this.getAllRoleList();
    },
    filters:{
        formatDateTime(time) {
            if (time == null || time === '') {
                return 'N/A';
            }
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
        }
    },
    methods:{
        handleResetSearch(){
            this.listQuery= Object.assign({},defaultListQuery);
        },
        handleAdd() {
            this.dialogVisible = true;
            this.isEdit = false;
            this.admin = Object.assign({},defaultAdmin);
        },
        getList(){
            this.listLoading=true;
            fetchList(this.listQuery).then(response =>{
                this.listLoading=false;
                this.list=response.data.list;
                this.total= response.data.total;
            });
        },
        getAllRoleList(){
            fetchAllRoleList().then(response =>{
                this.allRoleList = response.data;
            });
        }
    }
}
</script>

<style scoped>

</style>
