<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <h1>健康体检报告管理系统</h1>
                <p>医生：孙思邈</p>
            </el-header>
            <el-container>
                <el-aside width="250px">
                    <h4>体检用户查询</h4>
                    <el-form :model="form" label-width="auto" style="max-width: 600px">
                        <el-form-item label="手机号码">
                            <el-input v-model="form.phone" placeholder="请输入手机号码"/>
                        </el-form-item>
                        <el-form-item label="姓名">
                            <el-input v-model="form.name" placeholder="请输入姓名" />
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-radio-group v-model="form.gender">
                                <el-radio value="male">男</el-radio>
                                <el-radio value="female">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="套餐类型">
                            <el-select v-model="form.type" placeholder="请选择套餐">
                                <el-option label="男士套餐" value="maletype" />
                                <el-option label="女士套餐" value="femaletype" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="体检日期">
                            <el-col :span="30">
                                <el-date-picker v-model="form.date" type="date" placeholder="请选择日期"
                                    style="width: 100%" />
                            </el-col>
                        </el-form-item>

                        <el-form-item label="是否归档">
                            <el-radio-group v-model="form.resource">
                                <el-radio value="未归档" border>未归档</el-radio>
                                <el-radio value="已归档" border>已归档</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="find()">查询</el-button>
                            <el-button @click="resize()">重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-aside>


                <el-main>
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="id" label="预约编号" width="150" />
                        <el-table-column prop="phone" label="手机号码" width="150" />
                        <el-table-column prop="name" label="真实姓名" width="120" />
                        <el-table-column prop="gender" label="性别" width="150" />
                        <el-table-column prop="type" label="体检套餐类型" width="150" />
                        <el-table-column prop="hospital" label="体检医院" width="160" />
                        <el-table-column prop="date" label="体检时间" width="150" />
                        <el-table-column fixed="right" label="操作">
                            <template #default>
                                <el-button link type="primary" size="small" @click="handle()">
                                    编辑体检报告
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <br>
                    <el-pagination background layout="prev, pager, next,total" :total=tableData.length :page-size="10" />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// do not use same name with ref
const form = reactive({
    phone:'',
    name:'',
    gender:'',
    type:'',
    date:'',
    resource:''
}
)
//表格数据，属性跟着访问第三方接口获取到的数据的key来调整
const tableData = [{
    id: 1,
    phone: '12345678901',
    name: '叶文洁',
    gender: '女',
    type: '女士套餐',
    hospital: '北京协和医院',
    date: '2021-09-01'
},
{
    id: 2,
    phone: '12345678902',
    name: '东方',
    gender: '男',
    type: '男士套餐',
    hospital: '北京协和医院',
    date: '2021-09-02'
},
{
    id: 3,
    phone: '12345678903',
    name: '郭伟南',
    gender: '男',
    type: '男士套餐',
    hospital: '北京协和医院',
    date: '2021-09-03'
},
]

const find = () => {
    console.log('NOT FIND!')
}
const resize = () => {
    form.phone = ''
    form.name = ''
    form.gender = ''
    form.type = ''
    form.date = ''
    form.resource = ''
}
const handle = () => {
    console.log('NOT HANDLE!')
}
</script>

<style scoped>
.el-header {
    height: 80px;
    /* 弹性布局 */
    display: flex;
    /* 水平方向分局两侧 */
    justify-content: space-between;

    background-color: #409EFF;
    color: #fff;
    text-align: center;
    line-height: 20px;
    font-size: 25px;
}

.el-aside {
    background-color: #d4dae2;
    box-sizing: border-box;
    padding: 20px;
    width: 20%;
    height: 100%;
}
</style>