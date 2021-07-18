// Extracts data from all required environment variables and exports it as `environment` object.
// Rest of the application will access this data only through exported `environment`, never directly
// through `process.env`.

const parseBoolean = (value, defaultValue) => value === undefined ? defaultValue : JSON.parse(value)

const development = parseBoolean(process.env.DEVELOPMENT)
const locale = process.env.LOCALE
const version = process.env.VERSION
const commitHash = process.env.COMMIT_HASH
const branch = process.env.BRANCH

export const environment = {
  development,
  locale,
  version,
  commitHash,
  branch
}

if (development) {
  console.log('ENVIRONMENT')
  console.log(JSON.stringify(environment, undefined, 4))
}
