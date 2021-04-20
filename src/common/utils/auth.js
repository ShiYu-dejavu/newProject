import Cookies from 'js-cookie'

let TokenKey = 'token-project'
let formArr = []
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token,{ expires: 15})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setPHPSESSION(sessionName, sessionValue) {
  return Cookies.set(sessionName, sessionValue, { expires: 15 })
}

export function getPHPSESSION(sessionName) {
  return Cookies.get(sessionName)
}



//存储form表单
export function setSearchFrom(formName,formValue) {
  formArr.push(formName)
  return Cookies.set(formName, formValue)
}
//取值form表单
export function getSearchFrom(formName) {
  return Cookies.get(formName)
}
//退出删除当前账号的搜索cookie
export function removeForm(val) {
  if(val){
    Cookies.remove(val)
  }
  for (let i = 0; i < formArr.length; i++) {
    Cookies.remove(formArr[i])
  }
  //return Cookies.remove(cookieStr)
}