import _ from 'lodash'
import { observable, action, runInAction, computed } from 'mobx'
import {
  getAllJournals,
  getAllKeywords,
  getAllPapers,
  getAllSubscriptions
} from '../service'

class DataStore {
  @observable
  journals = []

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
}

export default new DataStore()
