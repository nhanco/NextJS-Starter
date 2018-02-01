import React from "react"
import Head from "next/head"
import Router from "next/router"

export default class HeadTags extends React.Component {
  render() {
    let siteUrl = "vbo.local"
    return (
      <Head>
        <title>{`${this.props.title} | Next.JS starter`}</title>
        <meta property="og:type" content={this.props.type} />
        <meta property="og:title" content={this.props.title} />
        <meta property="og:description" content={this.props.description} />
        <meta property="og:url" content={"//" + `${siteUrl}/${this.props.urlPath}`} />
        <meta property="og:site_name" content="Smashing Magazine" />
        <meta property="article:publisher" content="https://www.facebook.com/smashmag" />
        <meta property="article:tag" content="" />
        <meta property="article:section" content="General" />
        <meta property="article:published_time" content="2017-12-31 11:22:10 &#43;0000 UTC" />
        <meta property="article:modified_time" content=" 2017-12-31 11:22:10 &#43;0000 UTC" />
        <meta property="og:updated_time" content="2017-12-31 11:22:10 &#43;0000 UTC" />
        <meta property="og:image" content="https://davidwalsh.name/wp-content/themes/klass/img/facebooklogo.png" />
        <meta name="description" content="Next.js Starter is a boilerplate for quickly deploy" />

      </Head>
    )
  }
}
