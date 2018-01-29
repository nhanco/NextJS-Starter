import React, { Component, PropTypes } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { translate } from 'react-i18next'

const FormItem = Form.Item
class Login extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault()
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
    render() {
      const { getFieldDecorator } = this.props.form
      return (
        <Form
          onSubmit={this.handleSubmit}
          className="login-form"
        >

          <FormItem>
            {getFieldDecorator('email', {
                rules: [ {
                    type: 'email',
                    message: this.props.t('invalidEmail'),
                }, {
                    required: true,
                    message: this.props.t('emptyEmail'),
                } ],
            })(<Input
              prefix={<Icon
                type="mail"
                style={{ color: 'rgba(0,0,0,.25)' }}
              />}
              placeholder={this.props.t('email')}
            />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
                rules: [ {
                    required: true,
                    message: this.props.t('emptyPassword'),
                } ],
            })(<Input
              prefix={<Icon
                type="lock"
                style={{ color: 'rgba(0,0,0,.25)' }}
              />}
              type="password"
              placeholder={this.props.t('passsword')}
              autoComplete="on"
            />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
            })(<Checkbox>{this.props.t('rememberMe')}</Checkbox>)}
            <Button type="primary" htmlType="submit" className="fluid">
              {this.props.t('login')}
            </Button>

          </FormItem>
        </Form>
      )
    }
}
const LoginForm = Form.create()(Login)
export default translate([ 'common' ])(LoginForm)
