const fs = require('fs')
const xlsx = require('node-xlsx')
const { create } = require('ipfs-http-client')
const gm = require('gm').subClass({ imageMagick: true })
const AnomalousItemsJSON = require('./AnomalousItems.json')
const ExtranormalEventsJSON = require('./ExtranormalEvents.json')
const UnexplainedLocationsJSON = require('./UnexplainedLocations.json')

const ratio = 1
const resizeX = 946
const resizeY = 1334
const IPFS_URL = 'http://ipfs.1boxnft.com:5001'
const client = create(new URL(IPFS_URL))

const drawInit = (anomalousItemsContent = '', extranormalEventsContent = '', unexplainedLocationsContent = '', outputName, i) => {
  gm('./main.png')
    .resize(resizeX * ratio, resizeY * ratio)
    .font("./font/DFKai-SB.ttf", 36 * ratio) // 标题字体  大小设置
    // 第一个标题
    .fill('#FF3D3A')
    .drawText(120 * ratio, (200 + 36) * ratio, "Anomalous Items")
    // 第二个标题
    .fill('#31559E')
    .drawText(120 * ratio, (492 + 36) * ratio, "Extranormal Events")
    // 第三个标题
    .fill('#787878')
    .drawText(120 * ratio, (784 + 36) * ratio, "Unexplained Locations")
    /**
     * 第一类文字内容
     */
    .fill('#FF3D3A')
    .fontSize(24 * ratio)
    .out('-size', '706x', 'caption:' + anomalousItemsContent)
    .geometry('+120+258')
    .out('-composite')
    /**
     * 第二类文字内容
     */
    .fill('#31559E')
    .fontSize(24 * ratio)
    .out('-size', '706x', 'caption:' + extranormalEventsContent)
    .geometry('+120+550')
    .out('-composite')
    /**
     * 第三类文字内容
     */
    .fill('#787878')
    .fontSize(24 * ratio)
    .out('-size', '706x', 'caption:' + unexplainedLocationsContent)
    .geometry('+120+842')
    .out('-composite')
    // 绘制完成   生成图片
    .write(`./output/${outputName}.png`, function(err) {
      if (err) {
        console.log(err, `[Error]-----num: ${i}-----`)
      } else {
        console.log(`[Success]-----num: ${i}-----${outputName}`)
      }
    })
}

const data = [
  ['AnomalousItems Num', 'ExtranormalEvents Num', 'UnexplainedLocations Num', 'Num', 'TokenID', 'Color']
]

const purityColor = (m, n, x) => {
  if (m <= 2 && n <= 2 && x <= 2) {
    return '红色'
  }
  if ((m > 2 && m <= 5) && (n > 2 && n <= 5) && (x > 2 && x <= 5)) {
    return '蓝色'
  }
  if ((m > 5 && m <= 10) && (n > 5 && n <= 10) && (x > 5 && x <= 10)) {
    return '黑色'
  }
  if ((m > 10 && m <= 20) && (n > 10 && n <= 20) && (x > 10 && x <= 20)) {
    return '灰色'
  }
  return '混色'
}

const init = () => {
  let i = 0
  AnomalousItemsJSON.forEach((x, i1) => {
    ExtranormalEventsJSON.forEach((m, i2) => {
      UnexplainedLocationsJSON.forEach((o, i3) => {
        i = i + 1
        const outputName = `${i1 + 1}_${i2 + 1}_${i3 + 1}_AI_${i}`

        /**
         * 颜色 规则
         */
        // const _purityColor = purityColor(i1 + 1, i2 + 1, i3 + 1)
        // data.push([i1 + 1, i2 + 1, i3 + 1, `${i1 + 1}_${i2 + 1}_${i3 + 1}`, i, _purityColor])
        /**
         * 颜色 规则 End
         */
        const a = x.value.substring(0, 500)
        const b = m.value.substring(0, 500)
        const c = o.value.substring(0, 500)

        /**
         * 生成图片
         */
        drawInit(a, b, c, outputName, i)
      })
    })
  })
}

init()

// const buffer = xlsx.build([{ name: 'Sheet1', data }], { fill: 'red' })

// fs.writeFileSync('./output/content.xlsx', buffer, { 'flag': 'w' })


// const uploadToIpfs = async (file) => {
//   const ttt = fs.readFileSync('./output/1_1_1_AI_1.png')
//   const { cid } = await client.add(ttt)
//   console.log(cid, '-----')
// }
// uploadToIpfs()