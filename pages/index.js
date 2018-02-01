import React, { Component } from "react"
import { I18nextProvider } from "react-i18next"
import startI18n from "../tools/startI18n"
import Heading from "../components/Frontend/Layout/Heading"
import HeadTags from "../components/Frontend/Layout/HeadTags"
import { getTranslation } from "../tools/translationHelpers"

export default class Index extends Component {
  static async getInitialProps({ req, urlPath }) {
    const translations = await getTranslation([ "common" ])
    return { translations, urlPath }
  }
  constructor(props) {
    super(props)
    this.i18n = startI18n(props.translations)
    this.urlPath = props.urlPath
  }

  render() {
    return (
      <div>
        <HeadTags
          title="Home"
          lang={this.i18n}
          description="abc"
          urlPath={this.urlPath}
        />
        <I18nextProvider i18n={this.i18n}>
          <Heading activeMenu="home" />
        </I18nextProvider>
      </div>
    )
  }
}
