import React, { Component } from 'react';

export default class Preview extends Component {
  static getInitialProps = ctx => {
    console.log('preview getInitialProps')
  };

  componentDidMount() {
    console.log('preview componentDidMount')
  }

  render() {
    return <div>page preview</div>
  }
}
