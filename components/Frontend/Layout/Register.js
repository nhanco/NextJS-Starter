import React, { Component, PropTypes } from "react"
import { translate } from "react-i18next"
import { Form, Input, Icon, Checkbox, Button } from "antd"
import getData from "../../../tools/getData"

const FormItem = Form.Item

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values)
        getData.post("register", values, (data) => {
          console.log(data.data)
        })
      }
    })
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue("password")) {
      callback(this.props.t("emptyConfirmPassword"))
    } else {
      callback()
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields([ "confirm" ], { force: true })
    }
    callback()
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator("email", {
            rules: [ {
              type: "email",
              message: "The input is not valid E-mail!",
            }, {
              required: true,
              message: "Please input your E-mail!",
            } ],
          })(<Input
            prefix={<Icon
              type="mail"
              style={{ color: "rgba(0,0,0,.25)" }}
            />}
            placeholder={this.props.t("email")}
          />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("displayName", {
            rules: [ {
              required: true,
              message: this.props.t("emptydisplayName"),
            } ],
          })(<Input
            type="text"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder={this.props.t("displayName")}
          />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [ {
              required: true,
              message: this.props.t("emptyPassword"),
            }, {
              validator: this.checkConfirm,
            } ],
          })(<Input
            type="password"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder={this.props.t("passsword")}
            autoComplete="on"
          />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("confirm", {
            rules: [ {
              required: true, message: "Please confirm your password!",
            }, {
              validator: this.checkPassword,
            } ],
          })(<Input
            type="password"
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder={this.props.t("confirmPassword")}
            onBlur={this.handleConfirmBlur}
            autoComplete="on"
          />)}
        </FormItem>

        <FormItem>
          <i>By continuing, you agree to Our's <a href="" target="_blank">Terms of Service, Privacy Policy</a></i>
          <Button
            type="primary"
            htmlType="submit"
            className="fluid"
          >
            {this.props.t("register")}
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedNormalRegisterForm = Form.create()(RegistrationForm)
export default translate([ "common" ])(WrappedNormalRegisterForm)

