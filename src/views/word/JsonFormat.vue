<template>
  <el-tabs :tab-position="tabPosition">
    <div class="app-container">
      <div class="statistics-layout">
        <div class="layout-title">JSON格式化</div>
        <el-alert
          type="success"
          title="JSON是一种使用特定的符合标注元素的字符串。对象一般使用双括号{}表示,数组使用[]表示，'' ''内代表属性或值，:冒号表示字段值。若是字符串,不管是键或值最好都用双引号引起来，否则会报错。"
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
                v-model="message">
              </el-input>
            </div>
          </el-col>
          <el-col :span="4">
            <div style="margin-top: 20px;">
              <el-button style="width: 80%;margin-left: 20px" type="primary" @click="checkJson()">
                校验
              </el-button>
            </div>
<!--            <div style="margin-top: 20px;">-->
<!--              <el-button style="width: 60%;margin-left: 20px" type="primary" @click="jsonZip(2)">-->
<!--                转义-->
<!--              </el-button>-->
<!--            </div>-->
            <div style="margin-top: 20px;">
              <el-button style="width: 80%;margin-left: 20px" type="primary" @click="zipJson()">
                压缩
              </el-button>
            </div>
            <div style="margin-top: 20px;">
              <el-button style="width: 80%;margin-left: 20px" type="primary" @click="jsonZip(3)">
                压缩并转义
              </el-button>
            </div>
            <div style="margin-top: 20px;">
              <el-button style="width: 80%;margin-left: 20px" type="primary" @click="jsonZip(4)">
                去除转义
              </el-button>
            </div>
            <div style="margin-top: 20px;">
              <el-button style="width: 80%;margin-left: 20px" type="primary" @click="c2u()">
                中文转Unicode
              </el-button>
            </div>
            <div style="margin-top: 20px;">
              <el-button style="width: 80%;margin-left: 20px" type="primary" @click="u2c()">
                Unicode转中文
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
            message: ''
        }
    },
    created() {
    },
    methods: {
        checkJson() {
            if ( this.message === ""){
                this.$message.warning('请输入内容');
            }else {
                try{
                    let  jsonString= this.message.replace(/\\\\/g, "\\").replace(/\\\"/g, '\"');
                    let  jsonObj=JSON.parse(jsonString);
                    this.message=JSON.stringify(jsonObj,null,6);
                    //this.$message.success("JSON格式正确！");
                    this.$notify({
                        title: '成功',
                        message: 'JSON格式正确',
                        type: 'success'
                    })
                }catch (error) {
                    console.log("error ->>>>"+error);
                    let errorCode=error.toString().split(" ");
                    console.log("errorCode ->>>>"+errorCode);
                    let errorCodeNum = errorCode[errorCode.length-1];
                    console.log("errorCodeNum ->>>>"+errorCodeNum);
                    console.log(parseInt(errorCodeNum)+1);
                    if (errorCodeNum ==="input"){
                        //this.$message.error("JSON格式错误！"+"  "+ error.toString())
                        this.$notify({
                            title: '错误',
                            message: 'JSON格式错误！'+"  "+ error.toString(),
                            type: 'error'
                        })
                    }else {
                        // this.$message.error("JSON格式错误,请检查！" + "  " + this.message.substring(parseInt(errorCodeNum) - 15, parseInt(errorCodeNum) + 30));
                        this.$notify({
                            title: '错误',
                            message: 'JSON格式错误！'+ "\n" + this.message.substring(parseInt(errorCodeNum) - 15, parseInt(errorCodeNum) + 30),
                            type: 'error'
                        })
                    }
                    //+ error.toString()
                }
            }
        },
        //压缩json
        zipJson() {
            if ( this.message === ""){
                this.$message.warning('请输入内容');
            }else {
                try{
                    let  jsonString= this.message.replace(/\\\\/g, "\\").replace(/\\\"/g, '\"');
                    let  jsonObj=JSON.parse(jsonString);
                    this.message=JSON.stringify(jsonObj,null,0);
                    // this.$message.success("JSON压缩成功！");
                    this.$notify({
                        title: '成功',
                        message: 'JSON压缩成功',
                        type: 'success'
                    })

                }catch (error) {
                    let errorCode=error.toString().split(" ");
                    let errorCodeNum = errorCode[errorCode.length-1];
                    if (errorCodeNum ==="input"){
                        // this.$message.error("JSON压缩失败！"+"  "+ error.toString())
                        this.$notify({
                            title: '错误',
                            message: 'JSON压缩失败！'+"  "+ error.toString(),
                            type: 'error'
                        })
                    }else {
                        // this.$message.error("JSON压缩失败！" + "  " + this.message.substring(parseInt(errorCodeNum) - 15, parseInt(errorCodeNum) + 30));
                        this.$notify({
                            title: '错误',
                            message: 'JSON压缩失败！'+ "\n" + this.message.substring(parseInt(errorCodeNum) - 15, parseInt(errorCodeNum) + 30),
                            type: 'error'
                        })
                    }
                    //+ error.toString()
                }
            }
        },
        //综合
        jsonZip(ii) {
            try {
                if ( this.message === ""){
                    this.$message.warning('请输入内容');
                }else {
                    let jsonString = this.message;
                    jsonString = jsonString.split("\n").join(" ");
                    if (ii === 1 || ii === 3) {
                        let t = [];
                        let inString = false;
                        let strLen = jsonString.length;
                        for (let i = 0; i < strLen; i++) {
                            let c = jsonString.charAt(i);
                            if (inString && c === inString) {
                                if (jsonString.charAt(i - 1) !== '\\') {
                                    inString = false;
                                }
                            } else if (!inString && (c === '"' || c === "'")) {
                                inString = c;
                            } else if (!inString && (c === ' ' || c === "\t")) {
                                c = '';
                            }
                            t.push(c);
                        }
                        jsonString = t.join('');
                    }
                    if ((ii === 2 ||ii === 3)) {
                        jsonString = jsonString.replace(/\\/g, "\\\\").replace(/\"/g, "\\\"");
                    }
                    if (ii === 4) {
                        jsonString = jsonString.replace(/\\\\/g, "\\").replace(/\\\"/g, '\"');
                    }
                    this.message = jsonString;
                    // this.$message.success("成功！");
                    this.$notify({
                        title: '成功',
                        message: '',
                        type: 'success'
                    })
                }
            }catch (e) {
                // this.$message.error("出错了！"+e);
                this.$notify({
                    title: '错误',
                    message: "出错了！"+e,
                    type: 'success'
                })
            }
        },
        //中文转Unicode
        c2u() {
            if ( this.message === ""){
                this.$message.warning('请输入内容');
            }else {
                try{
                    let jsonString= this.message.trim().replace(/\\\\/g, "\\").replace(/\\\"/g, '\"');
                    let jsonS1= escape(jsonString).toLocaleLowerCase().replace(/%u/gi, '\\u');
                    this.message=jsonS1.replace(/%7b/gi, '{').replace(/%7d/gi, '}').replace(/%3a/gi, ':').replace(/%2c/gi, ',').replace(/%27/gi, '\'').replace(/%22/gi, '"').replace(/%5b/gi, '[').replace(/%5d/gi, ']');
                    // this.$message.success("转换成功！");
                    this.$notify({
                        title: '成功',
                        message: '',
                        type: 'success'
                    })

                }catch (error) {
                    // this.$message.error("转换失败！"+"  "+ error.toString())
                    this.$notify({
                        title: '错误',
                        message: "出错了！"+error,
                        type: 'success'
                    })
                }
            }
        },
        //Unicode转中文
        u2c() {
            if ( this.message === ""){
                this.$message.warning('请输入内容');
            }else {
                try{
                    let jsonString= this.message.trim().replace(/\\\\/g, "\\").replace(/\\\"/g, '\"');
                    this.message=unescape(jsonString.replace(/\\u/gi, '%u'));
                    // this.$message.success("转换成功！");
                    this.$notify({
                        title: '成功',
                        message: '',
                        type: 'success'
                    })
                }catch (error) {
                    // this.$message.error("转换失败！"+"  "+ error.toString())
                    this.$notify({
                        title: '错误',
                        message: "出错了！"+error,
                        type: 'success'
                    })
                }
            }
        },
        clearConfirm() {
            Object.assign(this.$data, this.$options.data())
        }
    }
}
</script>

<style scoped>
  .app-container {
    margin-left: 1px;
    margin-right: 1px;
  }

  .layout-title {
    color: #606266;
    padding: 15px 20px;
    background: #F2F6FC;
    font-weight: bold;
  }

  .statistics-layout {
    border: 1px solid #DCDFE6;
  }

</style>
