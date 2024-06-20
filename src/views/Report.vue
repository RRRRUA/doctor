<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <!-- <div id="header"> -->
                <h1>健康体检报告管理系统</h1>
                <p>医生：孙思邈</p>
                <!-- </div> -->
            </el-header>

            <el-container>
                <el-aside width="300px">
                    <el-descriptions :model="info" class="margin-top" title="预约客户信息" :column="1" :size="large" border>
                        <el-descriptions-item>
                            <template #label>
                                <div class="cell-item">
                                    <el-icon :style="iconStyle">
                                        <user />
                                    </el-icon>
                                    预约编号
                                </div>
                            </template>
                            {{ info.id }}
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
                            {{ info.phone }}
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
                            {{ info.name }}
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
                            {{ info.gender }}
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
                            {{ info.type }}
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
                            {{ info.date }}
                        </el-descriptions-item>
                    </el-descriptions>
                    <br>
                    <el-button type="primary">查询体检用户</el-button>
                </el-aside>


                <el-main>
                    <div class="demo-collapse">
                        <el-collapse v-model="activeNames" @change="handleChange">
                            <el-collapse-item title="血常规" name="1">

                                <el-form :inline="true" :model="form1" class="demo-form-inline" style="width: auto;">
                                    <el-form-item label="血小板计数">
                                        <el-input style="width: auto;" v-model="form1.name1" clearable />
                                        10^9/L 正常值范围:100-300


                                    </el-form-item>
                                    <el-form-item label="血红细胞计数">
                                        <el-input style="width: auto;" v-model="form1.name1" clearable />
                                        10^12/L 正常值范围:3.5-5.5
                                    </el-form-item>
                                </el-form>


                                <el-button type="primary">血常规项保存</el-button>
                            </el-collapse-item>


                            <el-collapse-item title="尿功能" name="2">
                                <el-form :inline="true" :model="form1" class="demo-form-inline" style="width: auto;">
                                    <el-form-item label="尿白细胞">
                                        <el-input style="width: auto;" v-model="form1.name1" clearable />
                                        /ul 正常值范围:-


                                    </el-form-item>
                                    <el-form-item label="尿亚硝酸盐">
                                        <el-input style="width: auto;" v-model="form1.name1" clearable />
                                        正常范围:-(阴性)
                                    </el-form-item>
                                </el-form>
                                <el-form :inline="true" :model="form1" class="demo-form-inline" style="width: auto;">
                                    <el-form-item label="尿液酸碱度">
                                        <el-input style="width: auto;" v-model="form1.name1" clearable />
                                        正常值范围:5.5-6.5


                                    </el-form-item>
                                    <el-form-item label="尿蛋白定性">
                                        <el-input style="width: auto;" v-model="form1.name1" clearable />
                                        g/L 正常值范围:-
                                    </el-form-item>
                                </el-form>
                                <el-form :inline="true" :model="form1" class="demo-form-inline" style="width: auto;">
                                    <el-form-item label="尿比重">
                                        <el-input style="width: auto;" v-model="form1.name1" clearable />
                                        正常值范围:1.015-1.025


                                    </el-form-item>
                                    <el-form-item label="尿维生素">
                                        <el-input style="width: auto;" v-model="form1.name1" clearable />
                                        mmol/L 正常值范围:0
                                    </el-form-item>
                                </el-form>
                                <el-button type="primary">尿常规项保存</el-button>


                            </el-collapse-item>
                            <el-collapse-item title="肾功能" name="3">
                                <el-form :inline="true" :model="form1" class="demo-form-inline" style="width: auto;">
                                    <el-form-item label="血清肌酐">
                                        <el-input style="width: auto;" v-model="form1.name1" clearable />
                                        umol/L 正常值范围:41-111


                                    </el-form-item>
                                    <el-form-item label="血尿素氮">
                                        <el-input style="width: auto;" v-model="form1.name1" clearable />
                                        mmol/L 正常值范围:2.85-7.14
                                    </el-form-item>
                                </el-form>
                                <el-form :inline="true" :model="form1" class="demo-form-inline" style="width: auto;">
                                    <el-form-item label="血尿酸">
                                        <el-input style="width: auto;" v-model="form1.name1" clearable />
                                        umol/L 正常值范围:208-428
                                    </el-form-item>
                                </el-form>
                                <el-button type="primary">肾功能项保存</el-button>
                            </el-collapse-item>
                            <el-collapse-item title="妇科检查" name="4">
                                <el-form :inline="true" :model="form1" class="demo-form-inline" style="width: auto;">
                                    <el-form-item label="盆腔检查">
                                        <el-input style="width: auto;" v-model="form1.name1" clearable />
  
                                    </el-form-item>
                                    <el-form-item label="乳腺检查">
                                        <el-input style="width: auto;" v-model="form1.name1" clearable />
                                    
                                    </el-form-item>
                                </el-form>
                                <el-form :inline="true" :model="form1" class="demo-form-inline" style="width: auto;">
                                    <el-form-item label="子宫检查">
                                        <el-input style="width: auto;" v-model="form1.name1" clearable />
                                      
                                    </el-form-item>
                                </el-form>
                                <el-button type="primary">妇科检查项保存</el-button>

                            </el-collapse-item>
                        </el-collapse>
                    </div>

                    <span style="display: flex;align-items:center;justify-content:space-between;">
                        <h2>总检结论</h2>
                        <el-button type="danger" plain>体检套餐总检结果报告归档</el-button>  
                    </span>

                    <el-main>
                        <el-table :data="tableData" stripe style="width: 100%;">
                            <el-table-column prop="date" label="编号" width="180" />
                            <el-table-column prop="name" label="总检结论项标题" width="180" />
                            <el-table-column prop="address" label="总检结论项内容" width="600" />
                            <el-table-column fixed="right" prop="address" label="操作" width="100">
                                <template #default>
                                    <el-button link type="primary" size="small" @click="handleClick">
                                        更新
                                    </el-button>
                                    <el-button link type="primary" size="small" @click="handleClick">
                                        删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-main>

                    <el-form :model="form1" label-width="auto" style="max-width: 600px">
                        <el-form-item label="总检结论项标题">
                            <el-input v-model="form1.name1" />
                        </el-form-item>
                        <el-form-item label="总检结论项内容">
                            <el-input v-model="form1.name1" />
                        </el-form-item>
                    </el-form>

                    <el-button type="primary">添加</el-button>
                    <el-button type="warning">清空</el-button>

                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// do not use same name with ref
const info = reactive({
    id: 1,
    phone: '12345678901',
    name: '东方',
    gender: '女',
    type: '女士套餐',
    date: '2021-1-01',
})
const form1 = reactive({
    name1: '',
    name2: '',
    name3: '',
})
const tableData = [{
    date: 1,
    name: '血常规',
    address: '血常规检查结果正常'
}, {
    date: 2,
    name: '尿常规',
    address: '尿常规检查结果正常'
}, {
    date: 3,
    name: '肾功能',
    address: '肾功能检查结果正常'
}, {
    date: 4,
    name: '妇科检查',
    address: '妇科检查结果正常'

}]
</script>

<style scoped>

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
    line-height: 5px;
    font-size: 25px;
}


.el-aside {
    background-color: #d4dae2;
    box-sizing: border-box;
    width: 20%;
    height: 100%;
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

</style>