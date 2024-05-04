import axios from 'axios'
const config = (service = 'base') => {
  const services = {
    base: import.meta.env.VITE_APP_API_URL,
    richHtml: import.meta.env.VITE_APP_API_RICH_HTML_URL
  }
  return {
    withCredentials: true,
    baseURL: services[service]
  }
}

class Fetcher {
  constructor(queryTool, service) {
    this._http = queryTool.create(config(service))
    this.createConfig()
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

  createConfig() {
    this._http.interceptors.response.use(
      (res) => res.data,
      (err) => Promise.reject(err.response.data)
    )
  }
}

export default (service) => new Fetcher(axios, service)
