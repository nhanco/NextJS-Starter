import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import NProgress from 'nprogress'
import Router from 'next/router'

Router.onRouteChangeStart = (url) => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const {
      html, head, errorHtml, chunks,
    } = renderPage()
    const styles = flush()
    return {
      html, head, errorHtml, chunks, styles,
    }
  }

  render() {
    return (
          <html>
              <Head>
                  <meta name="viewport" content="width=device-width, initial-scale=1" />
                  <meta charSet="utf-8" />
                  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/antd/3.0.1/antd.min.css" />
                  <link rel="stylesheet" type="text/css" href="/static/frontend.css" />
                </Head>
              <body>
                  <div style={{ lineHeight: '63px' }}>
                      {this.props.customValue}
                      <Main />
                      <NextScript />
                    </div>
                </body>
            </html>
    )
  }
}
