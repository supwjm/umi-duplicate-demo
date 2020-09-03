/*
 * @Author: 未知
 * @Date: 2020-08-03 10:42:14
 * @LastEditTime: 2020-09-01 17:57:00
 * @LastEditors: your name
 * @Description: 新增 iconfont 处理方案
 */

import { defineConfig } from 'umi';
import routes from './src/router';
const path = require('path');
const address = require('address');

const ip = address.ip();

const srcPathResolve = relativePath => path.resolve('src', relativePath);
const outputPath = '/dist/';
const publicPath = process.env.UMI_ENV === 'local' ? `http://${ip}:8000/` : outputPath;

export default defineConfig({
  hash: true,
  define: {
    'process.env.UMI_ENV': process.env.UMI_ENV,
    'process.env.IS_LOG': process.env.IS_LOG,
  },
  publicPath: publicPath,
  outputPath: outputPath,
  nodeModulesTransform: {
    type: 'none',
  },
  // favicon: '/assets/icons/favicon.ico',
  dynamicImport: {
    
  },
  ssr: {
    // forceInitial: true
  },
  dva: {
    immer: true,
    hmr: true,
  },
  title: false,
  targets: false,
  autoprefixer: false, // 去除一些warning
  routes,
  lessLoader: {
    modifyVars: {
      hd: '2px',
      'brand-primary': '#F34F64',
      'brand-primary-tap': '#F34F64',
      'color-text-base': '#333',
    },
  },
});
