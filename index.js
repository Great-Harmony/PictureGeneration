const puppeteer = require('puppeteer')

async function implement (params) {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://jd.com')
  await page.screenshot({ path: 'jd.png' })
  // fullPage: true
  await browser.close()
}

implement()