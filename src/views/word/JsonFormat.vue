<template>
  <el-tabs :tab-position="tabPosition">
    <div class="app-container">
      <div class="statistics-layout">
        <div class="layout-title">JSON格式化</div>
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
            <div style="margin-top: 20px;">
              <el-button style="width: 80%;margin-left: 20px" type="primary" @click="clearConfirm()">
                校验
              </el-button>
            </div>
            <div style="margin-top: 20px;">
              <el-button style="width: 80%;margin-left: 20px" type="primary" @click="clearConfirm()">
                压缩
              </el-button>
            </div>
            <div style="margin-top: 20px;">
              <el-button style="width: 80%;margin-left: 20px" type="danger" @click="clearConfirm()">
                清空
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-tabs>
</template>

<script>

export default {
    name: 'JsonFormat',
    data() {
        return {
            tabPosition: 'left',
            message: '',
            zifu: 0,
            zishu: 0,
            hanzi: 0,
            zimu: 0,
            shuzi: 0,
            biaodian: 0
        }
    },
    created() {
        this.initOrderCountDate()
        this.getData()
    },
    methods: {
        handleDateChange() {
            this.getData()
        },
        getData() {

        },
        changeEvent() {
            let words = this.message
            let w = new Object()
            let result = new Array()
            let iNumwords = 0
            let sNumwords = 0
            let sTotal = 0
            let iTotal = 0
            let eTotal = 0
            let otherTotal = 0
            let bTotal = 0
            let inum = 0
            for (let i = 0; i < words.length; i++) {
                let c = words.charAt(i)
                if (c.match(/[\u4e00-\u9fa5]/)) {
                    if (isNaN(w[c])) {
                        iNumwords++
                        w[c] = 1
                    }
                    iTotal++
                }
            }
            for (let i = 0; i < words.length; i++) {
                let c = words.charAt(i)
                if (c.match(/[^\x00-\xff]/)) {
                    if (isNaN(w[c])) {
                        sNumwords++
                    }
                    sTotal++
                } else {
                    eTotal++
                }
                if (c.match(/[0-9]/)) {
                    inum++
                }
            }
            this.zifu = iTotal * 2 + (sTotal - iTotal) * 2 + eTotal
            this.zishu = inum + iTotal
            this.hanzi = iTotal
            this.biaodian = sTotal - iTotal
            this.zimu = eTotal - inum
            this.shuzi = inum
            console.log(this.hanzi)
            console.log(this.zishu)
            console.log(this.message)
        },
        clearConfirm() {
            Object.assign(this.$data, this.$options.data())
        }
    }
}
</script>

<style scoped>
  .app-container {
    margin-top: 40px;
    margin-left: 120px;
    margin-right: 120px;
  }

  .layout-title {
    color: #606266;
    padding: 15px 20px;
    background: #F2F6FC;
    font-weight: bold;
  }

</style>
