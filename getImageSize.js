//const url = require('url')
//const http = require('http')

import { get } from 'https'
import sizeOf from 'image-size'

//const sizeOf = require('image-size')

export const getImageSize = ({url}) => {
    return new Promise((resolve) => {
        //const options = url.parse(url)
        
        get(url, (response) =>  {
          const chunks = []
          response.on('data', (chunk) => {
            chunks.push(chunk)
          }).on('end', () => {
            const buffer = Buffer.concat(chunks)
            const {height, width} = sizeOf(buffer)
            //console.log(imgSize)
            resolve({height, width})
          })
        })
    })
}
