import axios from 'axios'

const BASE_URL = 'https://uoyvbz-30000-edumtf.dev.ide.live'

const fetchData = (method, uri, query, body) => axios({
  url: uri,
  baseURL: BASE_URL,
  method,
  params: query,
  data: body
})

export const getAllJournals = () => fetchData('GET', '/journal')
export const getJournal = (_id) => fetchData('GET', `/journal/${_id}`)
export const getAllInventories = () => fetchData('GET', '/inventory')
export const getInventoriesByJournalId = (journalId) => fetchData('GET', '/inventory', { journal_id: journalId })
export const deleteInventory = (_id) => fetchData('DELETE', `/inventory/${_id}`)
export const getAllKeywords = () => fetchData('GET', '/keyword')
export const getAllPapers = () => fetchData('GET', '/paper')
export const getPapersByInventoryId = (inventoryId) => fetchData('GET', '/paper', { journal_id: inventoryId })
export const getAllSubscriptions = () => fetchData('GET', '/subscription')
export const getSubscriptionsByJournalId = (journalId) => fetchData('GET', '/subscription', { journal_id: journalId })
export const addSubscription = (data) => fetchData('PUT', '/subscription', null, data)
export const stockSubscription = (_id, data) => fetchData('PUT', `/subscription/${_id}/stock`, null, data)
export const deleteSubscription = (_id) => fetchData('DELETE', `/subscription/${_id}`)
