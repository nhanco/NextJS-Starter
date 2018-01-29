import React, { Component, PropTypes } from 'react'
import Link from 'next/link'
import { translate } from 'react-i18next'
import { Menu, Button, Icon, Input } from 'antd'
import Auth from './Auth'

const Search = Input.Search

class TopMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggeSearch: 'tablet or lower hidden',
    }
    this.toggeSearch = this.toggeSearch.bind(this)
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    })
  }

  toggeSearch = (e) => {
    console.log(this.state.toggeSearch)
    let css = (this.state.toggeSearch === 'tablet or lower hidden forceShow') ? 'forceHide' : 'forceShow'
    css = `tablet or lower hidden ${css}`
    console.log(css)
    this.setState({ toggeSearch: css })
  }

  render() {
    return (
      <div style={{ lineHeight: '63px' }}>
        <Button icon="menu-fold" id="toggeMenu" />
        <Button
          icon="search"
          id="toggleSearch"
          onClick={this.toggeSearch}
        />
        <Button
          icon="close"
          id="closeSearch"
          className={this.state.toggeSearch}
          onClick={this.toggeSearch}
        />

        <div id="topSearch" className={this.state.toggeSearch}>
          <Search
            placeholder={this.props.t('search')}
            onSearch={value => console.log(value)}
          />
        </div>

        <div id="user">
          <Auth />
        </div>

        <Menu
          className="tablet or lower hidden"
          mode="horizontal"
          style={{ lineHeight: '62px' }}
          id="topNav"
          onClick={this.handleClick}
          selectedKeys={[ this.props.activeMenu ]}
        >
          <Menu.Item key="home">
            <Link href="/">
              <a>{this.props.t('home')}</a>
            </Link>
          </Menu.Item>

          <Menu.Item key="api">
            <Link href="/api">
              <a>
                {this.props.t('api')}
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link href="/about">
              <a>
                {this.props.t('about')}
              </a>
            </Link>
          </Menu.Item>
        </Menu>

      </div >
    )
  }
}

export default translate([ 'common' ])(TopMenu)
