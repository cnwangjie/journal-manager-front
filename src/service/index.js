import axios from 'axios'

const BASE_URL = 'https://uoyvbz-30000-jzbknw.dev.ide.live'

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
