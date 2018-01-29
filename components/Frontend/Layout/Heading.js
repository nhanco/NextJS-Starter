import React from 'react'
import Head from 'next/head'
import { Layout, Menu, Breadcrumb, Button, Icon, Row, Col } from 'antd'
import TopMenu from './TopMenu'

const { Header, Content, Footer } = Layout

export default class Heading extends React.Component {
  render() {
    return (
      <Layout>
        <Header style={{ position: 'fixed', width: '100%', zIndex: '2' }} >
          <div className="logo" />
          <TopMenu activeMenu={this.props.activeMenu} />
        </Header>
      </Layout>
    )
  }
}
