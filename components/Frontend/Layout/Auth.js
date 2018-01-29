import { Modal, Button, Tabs } from 'antd'
import { translate } from 'react-i18next'
import React, { Component, PropTypes } from 'react'
import Login from './Login'
import Register from './Register'
import ForgotPassword from './ForgotPassword'

const TabPane = Tabs.TabPane

class Auth extends React.Component {
    state = {
      loading: false,
      visible: false,
    }
    showModal = () => {
      this.setState({
        visible: true,
      })
    }
    handleCancel = () => {
      this.setState({ visible: false })
    }
    render() {
      const { visible, loading } = this.state
      return (
        <div>
          <Button type="primary" ghost icon="user" className="tablet or lower hidden" onClick={this.showModal}>
            {this.props.t('loginRegister')}
          </Button>
          <Modal
            visible={visible}
            title={this.props.t('loginRegister')}
            footer={null}
            closable
            onCancel={this.handleCancel}
          >
            <Tabs defaultActiveKey="login" >
              <TabPane tab={this.props.t('login')} key="login"><Login /></TabPane>
              <TabPane tab={this.props.t('register')} key="register"><Register />
              </TabPane>
              <TabPane tab={this.props.t('forgotPass')} key="forgotPass">
                <ForgotPassword />
              </TabPane>
            </Tabs>

          </Modal>
        </div>
      )
    }
}

export default translate([ 'common' ])(Auth)
