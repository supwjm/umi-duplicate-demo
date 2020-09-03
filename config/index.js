module.exports = function() {
  const port = 9191;
  const config = {
    local: {
      host: `http://localhost:${port}`, // 前端地址
      backEndHost: 'http://testservicebl.9zhenge.com/', // 后端api地址
      isShowLog: process.env.IS_LOG, // 服务端请求是否显示log
    },
  };
  return {
    ...config[process.env.UMI_ENV],
    port,
  };
};
