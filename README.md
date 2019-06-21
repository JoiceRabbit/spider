## 入参

| key  | require  | type  | defaultValue  | comment  |
|------|----------|-------|---------------|----------|
| urls  | yes  | array  | []  | 获取数据的请求url数组  |
| limit  | no  | number  | 1  | 请求并发数  |
| operate  | yes  | function  |  () => {} | 爬取数据的规则，返回目标数据  |

