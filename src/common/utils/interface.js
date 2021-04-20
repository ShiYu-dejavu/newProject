import md5 from 'js-md5'
import qs from 'qs'
export function processingData(data){
    if(!data)data={}
    let timestamp = new Date().getTime()
    data.timestamp = timestamp
    let newData = JSON.parse(JSON.stringify(data))
    newData.sign='123456789ABCDEF'
    let keysList = Object.keys(newData)
    let m5str = md5(qs.stringify(newData))
    data.keysList = keysList
    data.m5str = m5str
    return data
}