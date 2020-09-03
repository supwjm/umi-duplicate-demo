import React, { Component } from 'react';
import { Link } from 'umi';

export default class Index extends Component {
  static getInitialProps = ctx => {
    console.log('Index getInitialProps')
  };

  componentDidMount() {
    console.log('Index componentDidMount')
  }

  render() {
    return (
      <div>
        Index<br/>
        <Link to="/preview">go to preview</Link>
      </div>
    );
  }
}
