import axios from 'axios'
const config = {
  withCredentials: true
}

class Fetcher {
  constructor(queryTool) {
    this._http = queryTool.create(config)
    this._createConfig()
  }

  async reqWrapper(req, ...reqArgs) {
    const res = await req(...reqArgs).catch(async (err) => {
      if (err.status === 498) {
        await this.baseRefreshReq()
        const reqData = await req(...reqArgs)
        return reqData
      }
      return Promise.reject(err)
    })
    return res
  }

  async get(url) {
    return await this.reqWrapper(this._http.get, url)
  }

  async post(url, body, opt = {}) {
    return await this.reqWrapper(this._http.post, url, body, opt)
  }

  async put(url, body) {
    return await this.reqWrapper(this._http.put, url, body)
  }

  async delete(url) {
    return await this.reqWrapper(this._http.delete, url)
  }

  setToken(token) {
    this._http.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  removeToken() {
    this._http.defaults.headers.common['Authorization'] = null
  }

  async baseRefreshReq() {
    try {
      const data = await this._http.get('/user/refresh')
      this.setToken(data.accessToken)

      return data
    } catch (error) {
      this.removeToken()
      throw Error
    }
  }

  _createConfig() {
    this._http.interceptors.response.use(
      (res) => res.data,
      (err) => Promise.reject(err.response.data)
    )
  }

  _configBaseUrl(service = 'base') {
    const services = {
      base: import.meta.env.VITE_APP_API_URL,
      richHtml: import.meta.env.VITE_APP_API_RICH_HTML_URL
    }
    this._http.defaults.baseURL = services[service]
  }
}

const instance = new Fetcher(axios)

export default (service) => {
  instance._configBaseUrl(service)
  return instance
}
