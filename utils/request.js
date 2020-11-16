import axios from 'axios'
import parser from 'fast-xml-parser'

const zy = {
  xmlConfig: {
    trimValues: true,
    textNodeName: '_t',
    ignoreAttributes: false,
    attributeNamePrefix: '_',
    parseAttributeValue: true
  }
}

export default zy
