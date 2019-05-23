import _ from 'lodash'
import { observable, action, runInAction } from 'mobx'
import { getAllJournals, getAllKeywords, getAllPapers } from '../service'

class DataStore {
  @observable
  journals = []

  @observable
  papers = []

  @observable
  keywords = []

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
    const keywordsMap = _.mapValues(_.keyBy(this.keywords, '_id'), 'name')

    papers.forEach((paper) => {
      paper.keywords = paper.keywords.map(id => keywordsMap[id]).join(', ')
    })

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
}

export default new DataStore()
