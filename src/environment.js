const apiUrl = process.env.API_URL
const version = process.env.VERSION
const commitHash = process.env.COMMIT_HASH
const branch = process.env.BRANCH
const development = process.env.DEVELOPMENT

export const environment = Object.freeze({
  apiUrl,
  version,
  commitHash,
  branch,
  development: development === 'true'
})

if (development) {
  console.log('ENVIRONMENT')
  console.log(JSON.stringify(environment, undefined, 4))
}
