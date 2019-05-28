import _ from 'lodash'
import { observable, action, runInAction, computed } from 'mobx'
import {
  getAllJournals,
  getAllInventories,
  changeOrCreateJournal,
  deleteInventory,
  borrowInventory,
  returnInventory,
  getAllKeywords,
  getAllPapers,
  deletePaper,
  changeOrCreatePaper,
  getAllSubscriptions,
  addSubscription,
  stockSubscription,
  deleteSubscription,
  getAllUsers
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

  @observable
  users = []

  @computed get keywordsMap () {
    return _.mapValues(_.keyBy(this.keywords, '_id'), 'name')
  }

  @computed get journalsMap () {
    return _.keyBy(this.journals, '_id')
  }

  @computed get usersMap () {
    return _.mapValues(_.keyBy(this.users, '_id'), 'name')
  }

  @computed get mappedInventories () {
    return this.inventories.map(({ _id, journal_id: id, year, phase, season, borrower_id: bid }) => ({
      _id,
      journal_id: id,
      name: this.journalsMap[id].name,
      year,
      phase,
      season,
      borrower_id: bid,
      borrower: this.usersMap[bid]
    }))
  }

  @computed get mappedPapers () {
    return this.papers.map(({ _id, inventory_id: id, title, author, page, keywords }) => {
      const inventory = this.mappedInventories.find((i) => i._id === id)
      return {
        _id,
        title,
        author,
        page,
        inventory_id: id,
        journal_id: inventory.journal_id,
        name: inventory.name,
        year: inventory.year,
        season: inventory.season,
        keywords: keywords.map(id => this.keywordsMap[id]).join(', ')
      }
    })
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
  async changeOrCreateJournal (data) {
    const { data: journal } = await changeOrCreateJournal(data)
    runInAction(() => {
      const index = this.journals.findIndex(({ _id }) => _id === journal._id)
      if (index === -1) this.journals.push(journal)
      else this.journals[index] = journal
    })
  }

  @action
  async getAllInventories () {
    const { data: inventories } = await getAllInventories()
    await Promise.all([
      this.getAllJournals(),
      this.getAllUsers()
    ])
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
  async borrowInventory (_id, userId) {
    await borrowInventory(_id, userId)
    runInAction(() => {
      this.inventories.find((i) => i._id === _id).borrower_id = userId
    })
  }

  @action
  async returnInventory (_id) {
    await returnInventory(_id)
    runInAction(() => {
      this.inventories.find((i) => i._id === _id).borrower_id = null
    })
  }

  @action
  async getAllPapers () {
    const { data: papers } = await getAllPapers()
    await Promise.all([
      this.getAllKeywords(),
      this.getAllInventories()
    ])
    runInAction(() => {
      this.papers = papers
    })
  }

  @action
  async deletePaper (_id) {
    await deletePaper(_id)
    runInAction(() => {
      this.papers = this.papers.filter((i) => i._id !== _id)
    })
  }

  @action
  async changeOrCreatePaper (data) {
    const { data: paper } = await changeOrCreatePaper(data)
    await this.getAllKeywords()
    runInAction(() => {
      const index = this.papers.findIndex((p) => p._id === paper._id)
      if (index === -1) this.papers.push(paper)
      else this.papers[index] = paper
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

  @action
  async getAllUsers () {
    const { data: users } = await getAllUsers()
    runInAction(() => {
      this.users = users
    })
  }
}

export default new DataStore()
