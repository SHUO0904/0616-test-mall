<template>
  <!--  <el-aside width="200px">-->
  <el-menu  mode="horizontal" router>
    <div style="display: flex;padding-left: 10px">
      <navigation-item v-for="(menu,i) in userList" :key="i" :item="menu"/>
    </div>
  </el-menu>
  <!--  </el-aside>-->
</template>

<script>
import navigationItem from './navigationItem'
import axios from 'axios'

export default {
    name:'navigation',
    components: { navigationItem },
    data() {
        return{
           // userList:[]
            userList: [
              {
                "id": 1,
                "path": "/index/tool ",
                "name": "Content",
                "nameZh": "常用工具",
                "iconCls": "el-icon-tickets",
                "component": "AdminIndex",
                "parentId": 0,
                "children": [{
                  "id": 9,
                  "path": "/index/tool/one",
                  "name": "Department",
                  "nameZh": "办公工具",
                  "iconCls": null,
                  "component": "content/student",
                  "parentId": 3,
                  "children": null
                },
                  {
                    "id": 10,
                    "path": "/index/tool/two",
                    "name": "Student",
                    "nameZh": "办公文档",
                    "iconCls": null,
                    "component": "content/student",
                    "parentId": 3,
                    "children": null
                  },
                  {
                    "id": 11,
                    "path": "/admin/content/enterprise",
                    "name": "Enterprise",
                    "nameZh": "Host3",
                    "iconCls": null,
                    "component": "content/enterprise",
                    "parentId": 3,
                    "children": null
                  }
                ]
              },
              {
                "id": 2,
                "path": "/admin",
                "name": "System",
                "nameZh": "物理机能耗分解",
                "iconCls": "el-icon-s-tools",
                "component": "AdminIndex",
                "parentId": 0,
                "children": [{
                  "id": 12,
                  "path": "",
                  "name": "Run",
                  "nameZh": "虚拟机分解",
                  "iconCls": null,
                  "component": "system/run",
                  "parentId": 4,
                  "children": [{
                    "id": 9,
                    "path": "/index/two",
                    "name": "Department",
                    "nameZh": "Host1",
                    "iconCls": null,
                    "component": "content/department",
                    "parentId": 3,
                    "children": null
                  },
                    {
                      "id": 10,
                      "path": "/admin/content/student",
                      "name": "Student",
                      "nameZh": "Host2",
                      "iconCls": null,
                      "component": "content/student",
                      "parentId": 3,
                      "children": [{
                        "id": 20,
                        "path": "/admin/content/student/graduateInfo",
                        "name": "graduateInfo",
                        "nameZh": "VM1",
                        "iconCls": null,
                        "component": "content/student/graduateInfo",
                        "parentId": 10,
                        "children": [{
                          "id": 200,
                          "path": "/admin/content/student/graduateInfo",
                          "name": "graduateInfo",
                          "nameZh": "Docker1",
                          "iconCls": null,
                          "component": "content/student/graduateInfo",
                          "parentId": 10,
                          "children": {}
                        }]
                      },{
                        "id": 201,
                        "path": "/admin/content/student/graduateInfo",
                        "name": "graduateInfo",
                        "nameZh": "VM2",
                        "iconCls": null,
                        "component": "content/student/graduateInfo",
                        "parentId": 10,
                        "children": null
                      }]
                    },
                    {
                      "id": 11,
                      "path": "/admin/content/enterprise",
                      "name": "Enterprise",
                      "nameZh": "Host3",
                      "iconCls": null,
                      "component": "content/enterprise",
                      "parentId": 3,
                      "children": [{
                        "id": 11,
                        "path": "/admin/content/enterprise",
                        "name": "Enterprise",
                        "nameZh": "VM4",
                        "iconCls": null,
                        "component": "content/enterprise",
                        "parentId": 3,
                        "children": null
                      }]
                    }
                  ]
                },
                  {
                    "id": 13,
                    "path": "/admin/system/data",
                    "name": "Data",
                    "nameZh": "Docker分解",
                    "iconCls": null,
                    "component": "system/data",
                    "parentId": 4,
                    "children": null
                  },
                  {
                    "id": 14,
                    "path": "/admin/system/log",
                    "name": "Log",
                    "nameZh": "硬件分解",
                    "iconCls": null,
                    "component": "system/log",
                    "parentId": 4,
                    "children": null
                  }
                ]
              },
                {
                    "id": 0,
                    "path": "/login ",
                    "name": "Content",
                    "nameZh": "登录",
                    "iconCls": "el-icon-tickets",
                    "component": "AdminIndex",
                    "parentId": 5
                },
            ],
        }
    },
    created(){
        // this.getList();
    },
    methods:{
        // getList(){
        //     axios.get('/getUserList').then((res) => {
        //         this.userList = res.data.data.rows;
        //         console.log("userList \n",this.userList)
        //     })
        // }
    },
    props:{
      menuList: {
        type: Array,
        required: true
      }
    }
}
</script>
