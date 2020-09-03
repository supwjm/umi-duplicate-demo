###
复现umi componentDidMount 执行多次最小demo

### 安装并启动
```
npm i
npm run dev
```

1. 访问 localhost:9191/ 
2. 点击跳转preview 跳转到preview页，发现componentDidMount执行了多次

事实上getInitialProps也执行了多次，不过在这个最小demo里面没复现