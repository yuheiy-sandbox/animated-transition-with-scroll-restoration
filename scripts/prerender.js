import path from 'path'
import fs from 'fs'
import React from 'react'
import ReactDOM from 'react-dom/server'
import {Helmet} from 'react-helmet'
import cheerio from 'cheerio'
import routes from '../src/routes'
import router from '../src/router'
import App from '../src/components/App'

const baseHtml = fs.readFileSync('build/index.html', 'utf8')

routes.map(route => route.path).forEach(async (pathname) => {
  const $ = cheerio.load(baseHtml)
  const {component} = await router.resolve({
    path: pathname,
  })
  $('#root').html(ReactDOM.renderToString(<App isSsr={true}>{component}</App>))
  const helmet = Helmet.renderStatic()
  $('title').replaceWith(helmet.title.toString())
  $('head')
  .append(helmet.meta.toString())
  .append(helmet.link.toString())

  const filePath = `${pathname}${pathname.endsWith('/') ? 'index' : ''}.html`
  const outputPath = path.join(__dirname, '../build', filePath)
  fs.writeFileSync(outputPath, $.html())
})
