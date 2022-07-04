<template>
  <el-tabs :tab-position="tabPosition">
      <div class="app-container">
        <div class="statistics-layout">
          <div class="layout-title">在线字数统计</div>
          <el-alert
            type="success"
            title="一个字代表两个字符，数字，字母，标点符号均等同为一个"
            description=" "
          >
          </el-alert>
          <el-row>
            <el-col :span="20">
              <div style="padding: 10px;border-left:1px solid #DCDFE6">
                <el-input
                  type="textarea"
                  :rows="20"
                  placeholder="请输入内容"
                  @input="changeEvent()"
                  v-model="message">
                </el-input>
              </div>
            </el-col>
            <el-col :span="4">
              <div style="padding: 20px">
                <div>
                  <div style="color: #1890ff;font-size: 14px; font-weight:bold ">字数合计总数(个)</div>
                  <div style="color: #606266;font-size: 24px;padding: 10px 0">{{zishu}}</div>
                </div>
                <div style="margin-top: 20px;">
                  <div style="color: #1890ff;font-size: 14px; font-weight:bold ">字符合计总数(个)</div>
                  <div style="color: #606266;font-size: 24px;padding: 10px 0">{{zifu}}</div>
                </div>
                <div style="margin-top: 20px;">
                  <div style="color: #909399;font-size: 10px">其中包含：</div>
                </div>
                <div style="margin-top: 20px;">
                  <div>
                    <span class="color-danger" style="font-size: 14px;padding: 10px 0">{{hanzi}}</span>
                    <span style="color: #C0C4CC;font-size: 14px">个汉字</span>
                  </div>
                </div>
                <div style="margin-top: 20px;">
                  <div>
                    <span class="color-danger" style="font-size: 14px;padding: 10px 0">{{zimu}}</span>
                    <span style="color: #C0C4CC;font-size: 14px">个字母</span>
                  </div>
                </div>
                <div style="margin-top: 20px;">
                  <div>
                    <span class="color-danger" style="font-size: 14px;padding: 10px 0">{{shuzi}}</span>
                    <span style="color: #C0C4CC;font-size: 14px">个数字</span>
                  </div>
                </div>
                <div style="margin-top: 20px;">
                  <div>
                    <span class="color-danger" style="font-size: 14px;padding: 10px 0">{{biaodian}}</span>
                    <span style="color: #C0C4CC;font-size: 14px">个标点(全角)</span>
                  </div>
                </div>
                <div style="margin-top: 20px;">
                  <!--              <button  type="button" class="clear-button" @click="clearConfirm()">-->
                  <!--                <span style= "color:#fff; font-size: 20px">全部清除</span>-->
                  <!--              </button>-->
                  <el-button style="width: 80%;margin-top: 10px" type="danger"  @click="clearConfirm()">
                    清空
                  </el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
  </el-tabs>
</template>

<script>

export default {
    name: 'WordStatistics',
    data() {
        return {
            tabPosition: 'left',
            message: '',
            zifu:0,
            zishu:0,
            hanzi:0,
            zimu:0,
            shuzi:0,
            biaodian:0
        }
    },
    created(){
    },
    methods:{
        changeEvent(){
            let words = this.message;
            let w = new Object();
            let result =new Array();
            let iNumwords =0;
            let sNumwords =0;
            let sTotal=0;
            let iTotal=0;
            let eTotal=0;
            let otherTotal=0;
            let bTotal=0;
            let inum=0;
            for (let i=0;i<words.length;i++) {
                let c = words.charAt(i);
                if (c.match(/[\u4e00-\u9fa5]/)) {
                    if (isNaN(w[c])) {
                        iNumwords++;
                        w[c] = 1;
                    }
                    iTotal++;
                }
            }
            for (let i=0;i<words.length;i++){
                let c = words.charAt(i);
                if (c.match(/[^\x00-\xff]/)) {
                    if (isNaN(w[c])) {
                        sNumwords++;
                    }
                    sTotal++;
                } else {
                    eTotal++;
                }
                if (c.match(/[0-9]/)) {
                    inum++;
                }
            }
            this.zifu =  iTotal * 2 + (sTotal - iTotal) * 2 + eTotal;
            this.zishu =inum + iTotal;
            this.hanzi =iTotal;
            this.biaodian =sTotal - iTotal;
            this.zimu =eTotal - inum;
            this.shuzi =inum;
            console.log(this.hanzi)
            console.log(this.zishu)
            console.log(this.message)
        },
        clearConfirm(){
            Object.assign(this.$data, this.$options.data());
        }
    }
}
</script>

<style scoped>
  .app-container {
    margin-top: 10px;
    margin-left: 70px;
    margin-right: 120px;
  }

  .layout-title {
    color: #606266;
    padding: 15px 20px;
    background: #F2F6FC;
    font-weight: bold;
  }

  .statistics-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }

</style>
