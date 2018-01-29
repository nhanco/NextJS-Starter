import React, { Component, PropTypes } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { translate } from 'react-i18next'

const FormItem = Form.Item

class ForgotPassword extends React.Component {
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
        <Form className="login-form" id="forgotPassword">
          <FormItem>
            {getFieldDecorator('email', {
                        rules: [ {
                            type: 'email',
                            message: this.props.t('invalidEmail'),
                        } ],
                    })(<Input
                      type="email"
                      prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder={this.props.t('email')}
                    />)}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="fluid">
              {this.props.t('submitForgotPassword')}
            </Button>
          </FormItem>
        </Form>
      )
    }
}

const WrappedNormalForgotPasswordForm = Form.create()(ForgotPassword)

export default translate([ 'common' ])(WrappedNormalForgotPasswordForm)
