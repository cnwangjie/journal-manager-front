import _ from 'lodash'
import { observable, action, runInAction, computed } from 'mobx'
import {
  getAllJournals,
  getAllInventories,
  deleteInventory,
  getAllKeywords,
  getAllPapers,
  getAllSubscriptions,
  addSubscription,
  stockSubscription,
  deleteSubscription
} from '../service'

class DataStore {
  @observable
  journals = []

  @observable
  inventories = []

  @observable
  papers = []

  @observable
  keywords = []

  @observable
  subscriptions = []

  @computed get keywordsMap () {
    return _.mapValues(_.keyBy(this.keywords, '_id'), 'name')
  }

  @computed get journalsMap () {
    return _.keyBy(this.journals, '_id')
  }

  @computed get mappedInventories () {
    return this.inventories.map(({ _id, journal_id: id, year, phase, season, borrower_id: bid }) => ({
      _id,
      name: this.journalsMap[id].name,
      year,
      phase,
      season,
      borrower_id: bid
    }))
  }

  @computed get mappedPapers () {
    return this.papers.map(({ _id, title, author, page, keywords }) => ({
      _id,
      title,
      author,
      page,
      keywords: keywords.map(id => this.keywordsMap[id]).join(', ')
    }))
  }

  @computed get mappedSubscriptions () {
    return this.subscriptions.map(({ _id, journal_id: id, year }) => ({
      _id,
      name: this.journalsMap[id].name,
      code: this.journalsMap[id].code,
      year
    }))
  }

  @action
  async getAllJournals () {
    const { data: journals } = await getAllJournals()
    runInAction(() => {
      this.journals = journals
    })
  }

  @action
  async getAllInventories () {
    const { data: inventories } = await getAllInventories()
    await this.getAllJournals()
    runInAction(() => {
      this.inventories = inventories
    })
  }

  @action
  async deleteInventory (_id) {
    await deleteInventory(_id)
    runInAction(() => {
      this.inventories = this.inventories.filter((inventory) => inventory._id !== _id)
    })
  }

  @action
  async getAllPapers () {
    const { data: papers } = await getAllPapers()
    await this.getAllKeywords()
    runInAction(() => {
      this.papers = papers
    })
  }

  @action
  async getAllKeywords () {
    const { data: keywords } = await getAllKeywords()
    runInAction(() => {
      this.keywords = keywords
    })
  }

  @action
  async getAllSubscriptions () {
    const { data: subscriptions } = await getAllSubscriptions()
    await this.getAllJournals()
    runInAction(() => {
      this.subscriptions = subscriptions
    })
  }

  @action
  async addSubscription (data) {
    const { data: subscription } = await addSubscription(data)
    runInAction(() => {
      this.subscriptions.push(subscription)
    })
  }

  @action
  async stockSubscription (_id, data) {
    const { data: inventory } = await stockSubscription(_id, data)
    runInAction(() => {
      this.inventories.push(inventory)
    })
  }

  @action
  async deleteSubscription (_id) {
    await deleteSubscription(_id)
    runInAction(() => {
      this.subscriptions = this.subscriptions.filter((subscription) => subscription._id !== _id)
    })
  }
}

export default new DataStore()
