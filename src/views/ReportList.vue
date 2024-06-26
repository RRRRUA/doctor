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
            <el-container >
                <el-aside width="250px" style="flex-grow: 1;">
                    <h4>体检用户查询</h4>
                    <el-form :model="form" label-width="auto" style="max-width: 600px;">
                        <el-form-item label="手机号码">
                            <el-input v-model="form.phone" placeholder="请输入手机号码"/>
                        </el-form-item>
                        <el-form-item label="姓名">
                            <el-input v-model="form.name" placeholder="请输入姓名" />
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-radio-group v-model="form.gender">
                                <el-radio value="1">男</el-radio>
                                <el-radio value="0">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="套餐类型">
                            <el-select v-model="form.type" placeholder="请选择套餐">
                                <!-- <el-option label="男士套餐" value="1" />
                                <el-option label="女士套餐" value="0" /> -->
                                <!-- 写一个循环遍历套餐列表，然后用v-for渲染出来 -->
                                    <el-option v-for="item in mealList" :key="item.smId" :label="item.name" :value="item.smId">

                                    </el-option>
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
                                <el-radio value="1" border>未归档</el-radio>
                                <el-radio value="2" border>已归档</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="find()">查询</el-button>
                            <el-button @click="resize()">重置</el-button>
                        </el-form-item>
                    </el-form>
                    <el-form-item>
                        <el-button @click="openOrderChart" type="primary" >订单销量图</el-button>
                       <el-button @click="openMealChart" type="primary">套餐销量图</el-button>
                        </el-form-item>     
                </el-aside>


                <el-main >
                    <el-table :data="tableData" stripe style="width: 100%;height: 75vh">
                        <el-table-column prop="orderId" label="预约编号" width="150" />
                        <el-table-column prop="userId" label="手机号码" width="150" />
                        <el-table-column prop="realName" label="真实姓名" width="120" />
                        <el-table-column prop="sex" label="性别" width="150" />
                        <el-table-column prop="smName" label="体检套餐类型" width="150" />
                        <el-table-column prop="hpName" label="体检医院" width="160" />
                        <el-table-column prop="orderDate" label="体检时间" width="150" />
                        <el-table-column fixed="right" label="操作">
                            <template #default="scope">
                                <el-button link type="primary" size="small" @click="handle(scope.row)">
                                    编辑体检报告
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <br>
                    <el-pagination  
                     background
      layout="prev, pager, next, sizes, total, jumper"
      :total="page1.total"
      :page-size="page1.pageSize"
      :current-page="currentPage"
      @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick" />
                </el-main>
                
            </el-container>
        </el-container>
    </div>  
<!--     <div style="display: flex; justify-content: center;">
    <v-chart v-if="chart" id="orderChart" :option="orderTable" style="width: 500px;height: 400px;"></v-chart>
    <v-chart v-if="chart" :option="mealTable" style="width: 500px;height: 400px;"></v-chart>
</div>
 -->
<el-dialog
    v-model="chart"
    title="Tips"
    width="500"
    @close="closeChart"
  >
  <v-chart v-if="chart1" id="orderChart" :option="orderTable" style="width: 400px;height: 400px;"></v-chart>
  <v-chart v-if="chart2" id="mealChart" :option="mealTable" style="width: 400px;height: 400px;"></v-chart>
  <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeChart">Cancel</el-button>
  
      </div>
    </template>
  </el-dialog>
  
</template>

<script setup>
import * as echarts from 'echarts';
import axios from 'axios';
import { getSessionStorage, setSessionStorage } from '../common.js';
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router/index.js';

const orderData = ref([])
const mealData = ref([])
const chart = ref(false)
const chart1 = ref(false)
const chart2 = ref(false)
const openOrderChart=()=>
{
    chart1.value=true
    getOrderData()
  
    chart.value=true
  
}
const openMealChart=()=>
{
    chart2.value=true
    getMealData()
    chart.value=true
    
}
const closeChart=()=>
{
    chart1.value=false
    chart2.value=false
    chart.value=false
   if(myChart.value!=null){
    myChart.value.dispose()
    myChart.value=null
}
    if(myChart1.value!=null){
        myChart1.value.dispose()
        myChart1.value=null
    }
    
  
   
}
const getOrderData = () => {
    axios(
        {
            method: 'get',
            url: '/api/orders/getOrdersData'
        }
    ).then(res => {
        if(res.data.code == 1)
        {
            orderData.value = res.data.data
            initOrderChart()
            ElMessage({message: '获取订单数据成功', type:'success'})
        }
        else{
            ElMessage({message: '获取订单数据失败', type:'error'})
        }
    }).catch(err => {
        ElMessage({message: err, type:'error'})
    })
}
const getMealData = () => {
    axios(
        {
            method: 'get',
            url: '/api/setMeal/getMealData'
        }
    ).then(res => {
        if(res.data.code == 1)
        {
            mealData.value = res.data.data
            initMealChart()
            ElMessage({message: '获取套餐数据成功', type:'success'})
        }
        else{
            ElMessage({message: '获取套餐数据失败', type:'error'})
        }
    }).catch(err => {
        ElMessage({message: err, type:'error'})
    })
}

const myChart1 = ref(null)
const initMealChart=()=>
{
    myChart1.value = echarts.init(document.getElementById('mealChart')); // 假设你的图表容器ID是main
    const mealTable={
        legend: {
    data: mealData.value.map(item => item.name), // 设置图例名称
  },
  xAxis: {
    data: mealData.value[0].data.map(item => item.date), // 设置x轴数据
  },
  yAxis: {},
  series: mealData.value.map((outerItem, index) => ({
    name: outerItem.name, // 系列名称，显示在图例中
    data: outerItem.data.map(data => data.count), // 假设outerItem.details是一个数组，每个对象有count属性
    type: 'line', // 图表类型，折线图
    stack: 'x' // 堆叠类型，x轴方向堆叠
}))
    
   /* [
    {
        name: '系列1', // 系列名称，显示在图例中
      data: [10, 22, 28, 43, 49],
      type: 'line',
      stack: 'x'
    },
    {
        name: '系列2', // 系列名称，显示在图例中
      data: [5, 4, 3, 5, 10],
      type: 'line',
      stack: 'x'
    }
  ] */
};
    myChart1.value.setOption(mealTable);
}
const myChart = ref(null)
   // 初始化ECharts图表
const initOrderChart = () => {
  // 确保orderData已经加载
  myChart.value = echarts.init(document.getElementById('orderChart')); // 假设你的图表容器ID是main
 const orderTable = {
    title: { text: "30天内订单预约趋势" },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: orderData.value.map(item => item.date),
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: "销量",
        type: "bar",
        data: orderData.value.map(item => item.count),
      },
    ],
  };
  myChart.value.setOption(orderTable);
};
// do not use same name with ref
const form = reactive({
    phone:'',
    name:'',
    gender:'',
    type:'',
    date:'',
    resource:'',
   
}
)
const mealList = ref()
const getMealList = () => {
    axios
    (
        {
           method: 'get',
           url: '/api/setMeal/checkSetMeal'
           
        }
    ).then(res => {
        if(res.data.code == 1)
        {
            mealList.value = res.data.data
            console.log( mealList.value)
        }
        else{

            ElMessage(
                {
                    message: '获取套餐列表失败',
                    type: 'error'
                }
            )
        }
    }).catch(err => {
        ElMessage(
            {
                message: err,
                type: 'error'}
        )
     }
    )
}
getMealList()
const page1 = reactive(
    {
        currentPage: 1,
        pageSize:8,
        total:0,
        totalPage:0
    }
)
const handleSizeChange=(newSize)=> {
      page1.pageSize = newSize;
   
    }
const handleCurrentChange=(newPage)=> {
    page1.currentPage = newPage;
  find()
    }
 const handlePrevClick=() =>{
      if (currentPage > 1) {
       page1.currentPage--; 
  
      }
    }
  const  handleNextClick=()=> {
      if (page1.currentPage < Math.ceil(this.page1.total / this.page1.pageSize)) {
        page1.currentPage++;
  
      }
    }

const handleLoginOut=()=>
{
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = '/'
}
const doctorName = ref(getSessionStorage('doctor').realName)
//表格数据，属性跟着访问第三方接口获取到的数据的key来调整
const tableData =ref(
    [ /*  {
     orderId: 1,
    userId: '12345678901',
    realName: '叶文洁',
    sex: '女',
    smName: '女士套餐',
    hpName: '北京协和医院',
    orderDate: '2021-09-01'
}
    */

]
 
)

const getRealTime=()=>
{
    if(form.date!='')
    {
        return form.date.getTime()
    }
    else return form.date
}

const find = () => {
   axios
   (
    {
     url: '/api/orders/checkOrder',
     method: 'post',
     data: 
     {
        userId:form.phone,
        realName:form.name,
        sex:form.gender,
        smId:form.type,
        orderDate:getRealTime(),
        state:form.resource,
        page:page1.currentPage,
        pageSize:page1.pageSize
     }
    }
   ).then(res => {
        tableData.value = []

        page1.total = 0

        page1.totalPage = 0

      if(res.data.code === 1)
      {
      
        tableData.value = res.data.data.list
        
        page1.total = res.data.data.total
        // page1.currentPage = res.data.data.currentPage
        page1.totalPage = res.data.data.totalPage

        ElMessage(
            {
                message: '查询成功',
                type: 'success'
            }
        )
      }
      else 
      {
        ElMessage(
            {
                message: res.data.message,
                type: 'error'
            }
        )
      }
   
    }
   ).catch(err => {
    ElMessage(
            {
                message: err,
                type: 'error'
            }
        )
   })
}
const resize = () => {
    form.phone = ''
    form.name = ''
    form.gender = ''
    form.type = ''
    form.date = ''
    form.resource = ''
}
const handle = (data) => {
    // const jsonData = JSON.stringify(data);

// // 将 JSON 字符串作为查询参数传递
// router.push({
//   path: '/report',
//   params: { data: data }
// });
    setSessionStorage('reportData',data)
    router.push('/report')
}
find()
</script>

<style scoped>
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
    padding: 20px;
    width: 20%;
    height: 90vh;
}

</style>