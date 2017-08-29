import Vue from 'vue'

function buildResourceUrl (base, resource) {
  return base[base.length - 1] === '/'
    ? base + resource
    : base + '/' + resource
}

function createRestfulApi (url) {
  return {
    list: function (headers) {
      return testData
    },
    get: function (id, headers) {
      return testData[id - 1]
    },
    create: function (data, headers) {
      return {}
    },
    update: function (id, data, headers) {
      return {}
    },
    delete: function (id, headers) {
      return {}
    }
  }
}

export default {
  reports: createRestfulApi(buildResourceUrl('/', 'reports'))
}

const testData = [
  {
    id: 1,
    title: '员工学历分布情况',
    template: {
      component: 'linear-layout',
      children: [
        {
          component: 'report-paragraph',
          // datasource: 0,
          data: {
            context: {
              total: 5000,
              bachelorPercent: '80%'
            },
            content: '目前公司员工{{total}}人，其中本科以上学历的占比{{bachelorPercent}}。'
          }
        },
        {
          component: 'chart',
          data: {
            title: {
              text: '员工学历分布图',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['高中', '专科', '本科', '硕士', '博士']
            },
            series: [
              {
                name: '学历',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                  {value: 335, name: '高中'},
                  {value: 310, name: '专科'},
                  {value: 234, name: '本科'},
                  {value: 135, name: '硕士'},
                  {value: 1548, name: '博士'}
                ],
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
          // datasource: 1,
          // title: '员工学历分布图',
          // axises: {
          //   x: {
          //     title: '学历'
          //   },
          //   y: {
          //     title: '人数'
          //   }
          // }
        }
      ]
    },
    datasources: [
      {
        total: 5000,
        bachelorPercent: '80%'
      },
      {
        x: ['初中', '高中', '专科', '本科', '硕士', '博士'],
        series: [
          [0, 200, 800, 2800, 800, 400]
        ]
      }
    ]
  },
  {
    id: 2,
    title: '月度产销情况汇总',
    template: {
      component: 'linear-layout',
      children: [
        {
          component: 'b-table',
          data: {
            items: [
              { month: '1月份', produced: 1, saled: 12 },
              { month: '2月份', produced: 2, saled: 11 },
              { month: '3月份', produced: 3, saled: 10 },
              { month: '4月份', produced: 4, saled: 9 },
              { month: '5月份', produced: 5, saled: 8 },
              { month: '6月份', produced: 6, saled: 7 }
            ],
            fields: {
              month: { label: '月份', sortable: true, class: 'text-center' },
              produced: { label: '产量（万大箱）', sortable: true },
              saled: { label: '销量（万大箱）' }
            }
          }
          // datasource: 0,
          // title: '月度产销量表',
          // row: [
          //   '1月份', '2月份', '3月份', '4月份',
          //   '5月份', '6月份', '7月份', '8月份',
          //   '9月份', '10月份', '11月份', '12月份'
          // ],
          // headers: [
          //   '产量', '销量'
          // ],
          // columns: [
          //   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          //   [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
          // ]
        }
      ]
    }
  }
]
