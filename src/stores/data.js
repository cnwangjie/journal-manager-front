import { observable, action, runInAction } from 'mobx'
import { getAllJournals } from '../service'

class DataStore {
  @observable
  journals = []

  @action
  async getAllJournals () {
    const { data: journals } = await getAllJournals()
    console.log(journals)
    runInAction(() => {
      this.journals = journals
    })
  }
}

export default new DataStore()
