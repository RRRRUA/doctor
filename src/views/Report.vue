<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <h1>健康体检报告管理系统</h1>
                <div>
                    <p>医生：{{ doctorName }}</p>
                    <el-button type="primary" size="mini" color="success" @click="handleLoginOut()">退出登录</el-button>
                </div>
            </el-header>

            <el-container>
                <el-aside width="300px">
                    <el-descriptions v-model="data.order" class="margin-top" title="预约客户信息" :column="1" :size="large"
                        border>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon :style="iconStyle">
                                        <user />
                                    </el-icon>
                                    预约编号
                                </div>
                            </template>
                            {{ data.order.orderId }}
                        </el-descriptions-item>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon :style="iconStyle">
                                        <user />
                                    </el-icon>
                                    手机号码
                                </div>
                            </template>
                            {{ data.order.userId }}
                        </el-descriptions-item>

                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon :style="iconStyle">
                                        <user />
                                    </el-icon>
                                    真实姓名
                                </div>
                            </template>
                            {{ data.order.realName }}
                        </el-descriptions-item>

                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon :style="iconStyle">
                                        <user />
                                    </el-icon>
                                    性别
                                </div>
                            </template>
                            {{ data.order.sex }}
                        </el-descriptions-item>


                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon :style="iconStyle">
                                        <user />
                                    </el-icon>
                                    套餐类型
                                </div>
                            </template>
                            {{ data.order.smName }}
                        </el-descriptions-item>

                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon :style="iconStyle">
                                        <user />
                                    </el-icon>
                                    体检时间
                                </div>
                            </template>
                            {{ data.order.orderDate }}
                        </el-descriptions-item>
                    </el-descriptions>
                    <br>
                    <el-button type="primary" @click="router.push('/reportList')">查询体检用户</el-button>
                </el-aside>



                <el-main style="height: 90vh; overflow-y: auto;">
                    <div class="demo-collapse" >
                        <el-collapse v-model="activeNames" @change="handleChange()">

                            <el-collapse-item v-for="(item, index) in cireportList" :key="index" :title="item.ciName"
                                :name="index">

                                <div style="display: flex; flex-wrap: wrap; width: 100%;">
                                    <el-form :inline="true"
                                        v-for="(item1, index1) in cireportDetaileList.data[index].value"
                                        class="demo-form-inline" style="width:auto; display: flex; flex-wrap: nowrap;">
                                        <span v-if="item1.isError == 1" :class="'yi-icon'">异</span>
                                        <el-form-item :label=item1.name style="width: auto;">
                                            <el-input style="max-width: 150px" :class="{ 'disabled-input': rescourse }"
                                                v-model="item1.value" clearable />
                                            {{ item1.unit }} 正常值范围:{{ item1.normalValueString }}
                                        </el-form-item>

                                    </el-form>
                                </div>

                                <el-button v-if="!rescourse" type="primary" @click="handleClick(index)">{{ item.ciName
                                    }}项保存</el-button>
                            </el-collapse-item>
                        </el-collapse>
                    </div>

                    <span style="display: flex;align-items:center;justify-content:space-between;">
                        <h2>总检结论</h2>
                        <el-button v-if="!rescourse" type="danger" plain
                            @click="handleClickOverall()">体检套餐总检结果报告归档</el-button>
                        <el-button v-if="rescourse" type="primary" plain>已归档</el-button>
                    </span>

                    <el-main>
                        <el-table :data="overall" stripe style="width: 100%;">
                            <el-table-column type='index' label="编号" width="180" />
                            <el-table-column prop="title" label="总检结论项标题" width="180" />
                            <el-table-column prop="content" label="总检结论项内容" width="600" />
                            <el-table-column v-if="!rescourse" fixed="right" prop="address" label="操作" width="100">
                                <template #default="scope">
                                    <el-button link type="primary" size="small" @click="overAllUpdate(scope.$index)">
                                        更新
                                    </el-button>
                                    <el-button link type="primary" size="small" @click="overAllDelete(scope.$index)">
                                        删除
                                    </el-button>
                                    
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-main>

                    <el-form v-if="!rescourse" :model="form1" label-width="auto" style="max-width: 600px">
                        <el-form-item label="总检结论项标题">
                            <el-input v-model="form1.title" />
                        </el-form-item>
                        <el-form-item label="总检结论项内容">
                            <el-input v-model="form1.content" />
                        </el-form-item>
                    </el-form>

                    <el-button v-if="!rescourse" type="primary" @click="overAllAdd">添加</el-button>
                    <el-button v-if="!rescourse" type="warning" @click="overAllReset">清空</el-button>

                </el-main>
            </el-container>
        </el-container>
    </div>
    <el-dialog v-model="dialogVisible" title="编辑总检结论项" width="30%" @closed="resetForm">
                                        <el-form :model="editFormData" label-width="80px">
                                            <el-form-item label="标题">
                                                <el-input v-model="editFormData.title"></el-input>
                                            </el-form-item>
                                            <el-form-item label="内容">
                                                <el-input v-model="editFormData.content"></el-input>
                                            </el-form-item>
                                        </el-form>
                                        <span slot="footer" class="dialog-footer">
                                            <el-button @click="dialogVisible = false">取消</el-button>
                                            <el-button type="primary" @click="saveEdit">保存</el-button>
                                        </span>
                                    </el-dialog>
</template>

<script setup>
import { getSessionStorage, setSessionStorage } from '@/common';
import router from '@/router';
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const doctorName = ref(getSessionStorage('doctor').realName)
const dialogVisible = ref(false)
const editFormData = reactive({
    orId: '',
    title: '',
    content: ''
})
const data = reactive({ order: null })
const orderId = getSessionStorage('reportData').orderId
data.order = getSessionStorage('reportData')
const activeNames = ref([])
const activeNamesLength = ref(0)
const rescourse = ref(true)
const changeRescourse = () => {
    if (getSessionStorage('reportData').state == 1)
        rescourse.value = !rescourse.value
    else
        rescourse.value = true
}
changeRescourse()
const handleChange = () => {
    // 获取当前展开的最后一个面板的 name
    if (activeNames.value.length >= activeNamesLength.value) {

        const lastExpandedId = activeNames.value[activeNames.value.length - 1];

      getCheckDetailItem(lastExpandedId);


    }
    activeNamesLength.value = activeNames.value.length;

};
const getCheckDetailItem=(lastExpandedId)=>
{
    axios
            (
                {
                    method: 'post',
                    url: 'api/cidetailedReport/getCidetailedReport',

                    data: {
                        ciId: cireportDetaileList.data[lastExpandedId].ciId,
                        orderId: orderId
                    }
                }
            ).then(res => {
                if (res.data.code == 1) {
                    cireportDetaileList.data[lastExpandedId].value = res.data.data;
                 
                }
                else {
                    ElMessage(
                        {
                            message: res.data.message,
                            type: "error"

                        })
                }
            }
            ).catch(err => {
                console.log(err)
            })
}
const overAllReset = () => {
    form1.content = '';
    form1.title = '';
}
const overAllAdd = () => {
    if (form1.title == '' || form1.content == '')
        return ElMessage({
            message: '请先填写总检结论项标题和内容',
            type: "error"
        });

    axios(
        {
            method: 'post',
            url: 'api/overallResult/creatOverallResult',
            data: {
                orderId: orderId,
                title: form1.title,
                content: form1.content
            }
        }
    ).then(res => {
        if (res.data.code == 1) {
            ElMessage(
                {
                    message: '提交成功',
                    type: "success"
                })
            overall.value.push(
                res.data.data
            )

            overAllReset();
        } else {
            ElMessage(
                {
                    message: res.data.message,
                    type: "error"
                })
        }
    }
    ).catch(err => {
        ElMessage(
            {
                message: err,
                type: "error"
            })
    }
    )
}
// do not use same name with ref
const handleLoginOut = () => {
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = '/'
}

const cireportList = ref([])
const cireportDetaileList = reactive(

    {
        data: {
            ciId: '',
            value: {}
        }
    }
)
const overall = ref([])
const handleClickOverall = () => {
    axios
        (
            {
                method: 'get',
                url: 'api/orders/updateState/' + orderId
            }
        ).then(res => {
            if (res.data.code == 1) {
                changeRescourse();
                const changeData = getSessionStorage('reportData');
                changeData.state = 2;
                setSessionStorage('reportData', changeData);
                ElMessage(
                    {
                        message: '归档成功',
                        type: "success"
                    }
                )
            } else {
                ElMessage(
                    {
                        message: res.data.message,
                        type: "error"
                    }
                )
            }

        }).catch(err => {
            ElMessage
                (
                    {
                        message: err,
                        type: "error"
                    }
                )
        })
}
const overAllUpdate = (index) => {
    editFormData.title = overall.value[index].title;
    editFormData.content = overall.value[index].content;
    editFormData.orId = overall.value[index].orId;
    dialogVisible.value = true;
}
const resetForm = () => {
    dialogVisible.value = false;
    editFormData.title = '';
    editFormData.content = '';
    editFormData.orId = '';
}
const saveEdit = () => {
    if (editFormData.title == '' || editFormData.content == '') {
     ElMessage({
            message: '请先填写总检结论项标题和内容',
            type: "error"
        })
      return ;
    }
    axios(
            {
                method: 'post',
                url: 'api/overallResult/updateOverallResult',
                data: editFormData
            }
        ).then(res => {
            if (res.data.code == 1) {
            /*     alert(JSON.stringify(overall.value))
                alert(JSON.stringify(editFormData)) */
  
                let index = overall.value.findIndex(item => item.orId == editFormData.orId);
              
                overall.value[index].title = editFormData.title
                overall.value[index].content = editFormData.content;
                resetForm();
                ElMessage(
                    {
                        message: '更新成功',
                        type: "success"
                    }
                )
           
           
            } else {
                ElMessage(
                    {
                        message: res.data.message,
                        type: "error"
                    }
                )
            }}
        ).catch(err => {
            ElMessage(
                {
                    message: err,
                    type: "error"
                }
            )
        })
   
    }
const overAllDelete = (index) => {
    const temp = overall.value[index]


    axios(
        {
            method: 'post',
            url: 'api/overallResult/deleteOverallResult/' + temp.orId
        }
    ).then(res => {
        if (res.data.code == 1) {


            overall.value.splice(index, 1)
            ElMessage(
                {
                    message: '删除成功',
                    type: "success"
                }


            )
        } else {
            ElMessage(
                {
                    message: res.data.message,
                    type: "error"
                }
            )
        }

    }).catch(err => {
        ElMessage
            (
                {
                    message: err,
                    type: "error"
                }
            )
    })
}
const init = () => {
    axios({
        url: 'api/checkItem/getCheckItem/' + orderId,
        method: 'get'
    }).then(res => {
        if (res.data.code == 1) {
            cireportList.value = res.data.data.cireportList;
            cireportDetaileList.data = res.data.data.cireportList.map(item =>
            ({
                ciId: item.ciId,
                value: {}
            }));
            // alert( cireportDetaileList.data[0].ciId)
            overall.value = res.data.data.overall;

        } else {
            ElMessage(
                {
                    message: err.message,
                    type: "error"
                }
            )
        }
    }).catch(err => {
        console.log(err)
    })
}
const handleClick = (index) => {
    const values = cireportDetaileList.data[index].value;
    for (const item of values) {
        if (item.value == '' || item.value == null) {
            ElMessage({
                message: '请先填写所有项',
                type: "error"
            });
            return false; // 发现null则中断循环并返回
        }
    }

    const dto = cireportDetaileList.data[index].value.map(item => ({
        orderId: orderId,
        ciId: item.ciId,
        value: item.value,
        name: item.name,
    }))

    // alert(JSON.stringify(dto))
    axios({
        method: 'post',
        url: 'api/cidetailedReport/updateCidetailedReport',
        data:
            dto

    }).then(res => {
        if (res.data.code == 1) {
            getCheckDetailItem(index);
            ElMessage(
                {
                    message: '保存成功',
                    type: "success"
                }
            )
        }
        else {
            ElMessage(
                {
                    message: res.data.message,
                    type: "error"
                }
            )
        }
    }
    ).catch(err => {

        ElMessage(
            {
                message: err,
                type: "error"
            }
        )
    }
    )

}
init();

const form1 = reactive({
    title: '',
    content: ''
})

</script>

<style scoped>
.yi-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;

    background-color: #b05656;
    /* 红色背景 */
    color: white;
    /* 文字颜色为白色 */
    font-weight: bold;
    border-radius: 4px;
    /* 可选：给图标边缘添加一点圆角 */
    padding: 0 5px;
    /* 控制文字与边界的间距 */
}

.el-container {
    height: 100%;
    width: 100%
}

.common-layout {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.el-header {
    height: 10vh;
    /* 弹性布局 */
    display: flex;
    /* 水平方向分局两侧 */
    justify-content: space-between;

    background-color: #409EFF;
    color: #fff;
    text-align: center;
    line-height: center;
    font-size: 25px;
}


.el-aside {
    background-color: #d4dae2;
    box-sizing: border-box;
    width: 20%;
    height: 90vh;
}

.el-descriptions {
    margin-top: 20px;
}

.cell-item {
    display: flex;
    align-items: center;
}

.margin-top {
    margin-top: 20px;
}

.demo-collapse {
    width: 100%;
    /* 确保容器充分利用父元素宽度 */
 
}

/* CSS模拟禁用样式 */
.disabled-input {
    background-color: #FAFAFA;
    /* 浅灰色背景，模拟禁用效果 */
    color: #CCCCCC;
    /* 文字颜色变淡 */

    pointer-events: none;
    /* 禁止鼠标点击等交互 */
}
</style>