import React, { Component } from "react"
import { I18nextProvider } from "react-i18next"
import startI18n from "../tools/startI18n"
import { getTranslation } from "../tools/translationHelpers"
import Heading from "../components/Frontend/Layout/Heading"

export default class Index extends Component {
  static async getInitialProps() {
    const translations = await getTranslation([ "common" ])
    return { translations }
  }
  constructor(props) {
    super(props)
    this.i18n = startI18n(props.translations)
  }

  render() {
    return (
      <I18nextProvider i18n={this.i18n}>
        <Heading activeMenu="home" />
      </I18nextProvider>
    )
  }
}
