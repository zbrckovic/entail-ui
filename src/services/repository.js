import { of } from 'rxjs'

export const Repository = () => ({
  getProjects () {
    // Find projects in database
    return of([])
  },
  getProject (id) {
    // Find project in database
    throw new Error('not implemented')
  },
  createProject ({ name, description, isFirstOrder, propositionalRulesSet }) {
    // TODO: Save project to database
    throw new Error('not implemented')
  }
})
