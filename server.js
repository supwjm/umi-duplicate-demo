/*
 * @Author: 未知
 * @Date: 2020-08-21 16:57:01
 * @LastEditTime: 2020-08-21 17:46:12
 * @LastEditors: your name
 * @Description: 新增本地开发访问链接二维码生成
 */

const Koa = require('koa');
const compress = require('koa-compress');
const { extname } = require('path');
const proxy = require('koa2-proxy-middleware');
const Cookies = require('universal-cookie');
const getConfig = require('./config');
const render = require('./dist/umi.server');

const LOCA_IDEN = 'BL_h5_userInfo';
const isDev = process.env.UMI_ENV === 'local';
const app = new Koa();
const { backEndHost, port } = getConfig();

if (!backEndHost) {
  throw new Error('找不到后端代理地址');
}
const proxyOptions = {
  targets: {
    '/api/(.*)': {
      target: backEndHost,
      changeOrigin: true,
    },
  },
};
const apiProxy = proxy(proxyOptions); // api前缀的请求都走代理
app.use(apiProxy); // 注册
app.use(
  compress({
    threshold: 2048,
    flush: require('zlib').Z_SYNC_FLUSH,
  })
);

// 从url中获取search参数
function getParam(url) {
  const i = url.indexOf('?');
  const oSearch = {};
  if (i !== -1) {
    const aSearch = url.slice(i + 1).split('&');
    aSearch.forEach(item => {
      const arr = item.split('=');
      oSearch[arr[0]] = arr[1];
    });
  }
  return oSearch;
}

// url中有uid、sid的情况，更新cookie中的uid、sid
app.use(async (ctx, next) => {
  const apiReg = /^\/api/;
  if (!apiReg.test(ctx.request.url)) {
    const search = getParam(ctx.request.url);
    if (search.uid && search.sid) {
      let userInfo = { uid: search.uid, sid: search.sid };
      const cookies = new Cookies(ctx.req.headers.cookie);
      const oldCookie = cookies.get(LOCA_IDEN);

      if (oldCookie) {
        userInfo = { ...oldCookie, ...userInfo };
      }
      // 这两行是参考了universal-cookie源码，为了确保其能正确的获取相关的值
      userInfo = JSON.stringify(userInfo);
      userInfo = encodeURIComponent(userInfo);

      ctx.cookies.set(LOCA_IDEN, userInfo, { path: '/', httpOnly: false });
    }
  }

  await next();
});

app.use(async (ctx, next) => {
  const ext = extname(ctx.request.path);

  // 符合要求的路由才进行服务端渲染，否则走静态文件逻辑
  if (!ext) {
    ctx.request.protocol = 'https';
    // 这里默认是流式渲染
    ctx.type = 'text/html';
    ctx.status = 200;
    const context = {};
    const { html, error } = await render({
      path: ctx.request.url,
      context,
      getInitialPropsCtx: {
        koaCtx: ctx,
        cookies: ctx.cookies,
      },
      mode: 'string', // 这里不能设置成stream,会造成meta渲染无效
    });
    if (error) {
      console.error('服务端报错:', error);
    }

    if (isDev) {
      delete require.cache[require.resolve('./dist/umi.server')];
    }
    ctx.body = html;
  } else {
    await next();
  }
});

const hostName = '0.0.0.0'; // 本地IP
app.listen(port, hostName, () => {
  console.log(`服务运行在http://${hostName}:${port}`);
});
console.log('服务启动成功');

module.exports = app.callback();
