import axios from 'axios'

const BASE_URL = 'https://uoyvbz-30000-cxgdsc.dev.ide.live'

const fetchData = (method, uri, query, body) => axios({
  url: uri,
  baseURL: BASE_URL,
  method,
  params: query,
  data: body
})

export const getAllJournals = () => fetchData('GET', '/journal')
export const getAllKeywords = () => fetchData('GET', '/keyword')
export const getAllPapers = () => fetchData('GET', '/paper')
export const getAllSubscriptions = () => fetchData('GET', '/subscription')
export const addSubscription = (data) => fetchData('PUT', '/subscription', null, data)
export const stockSubscription = (_id, data) => fetchData('PUT', `/subscription/${_id}/stock`, null, data)
export const deleteSubscription = (_id) => fetchData('DELETE', `/subscription/${_id}`)
