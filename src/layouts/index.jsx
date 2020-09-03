/*
 * @Author: pengzhiyang
 * @Date: 2020-08-04 18:57:12
 * @Description: 所有页面组件会由 Layout 包裹
 */

import React, { Component } from 'react';

class Layout extends Component {
  render() {
    const { children } = this.props;

    return children
  }
}
export default Layout;
