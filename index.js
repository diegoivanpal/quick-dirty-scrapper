import  fs from 'fs-extra'
import  axios from 'axios' 
import { getImageSize } from './getImageSize.js'
import { log, time } from './log.js'
const endTime = time()


const INITIAL_ID_COMIC = 2500
const MAX_ID_COMIC = 2588

const indexFileContent =[]

for(let id = INITIAL_ID_COMIC; id < MAX_ID_COMIC; id++) {
    const url = `http://xkcd.com/${id}/info.0.json`
    log(`Fetching ${url}...`)
    const {data} = await axios.get(url)
    const {num, news, transcript, img, ...restOfComic} = data
    log(`Fetched comic #${num}. Getting image dimension ...`)
    const {height, width} = await getImageSize({url: img})
    log(`Got image dimension: ${width}x${height}`)
    const comicToStore = {
        id,
        img,
        height,
        width,
        ...restOfComic
    }
    indexFileContent.push(comicToStore)
    const jsonFIle = `./comic/${id}.json`
    await fs.writeJSON(jsonFIle, comicToStore, {spaces: 2})
log(`Wrote: ${jsonFIle}!`)
}
await fs.writeJSON('./comic/index.json',indexFileContent)
log(`Wrote index content`)
endTime()