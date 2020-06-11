
// DICTIONARY
const API_URL = 'https://api.maas2.apollorion.com'
const SOL_OFFSET = 4
const Units = {
  Celsius: 'C'
}

// API
function API(url) {
  const fullUrl = `${API_URL}/${url}`
  const options = {
    method: 'GET',
  }

  return fetch(fullUrl, options)
    .then(res => {
      return res
        .text()
        .then(text => {
          try {
            return JSON.parse(text);
          } catch (e) {
            return text;
          }
        })
    })
    .catch(e => {
      // Error handling is above in stack
      printErrorInConsole(e)
      throw new Error('Cannot parse the response')
    });
}

function fetchLatestSol() {
  return API('')
}

function fetchSol(solOrder) {
  return API(solOrder)
}

// HELPERS
function getSolOrder({ sol }) {
  return sol
}

function getSolMinTemp({ min_temp }) {
  return min_temp
}

function getSolMaxTemp({ max_temp }) {
  return max_temp
}

function getSolUnit({ unitOfMeasure }) {
  return Units[unitOfMeasure]
}

// APP
document.addEventListener('DOMContentLoaded', () => {
  printLoadingInConsole()
  getSols().catch(printErrorInConsole)
})

async function getSols() {
  const latestSol = await fetchLatestSol()
  const solHistory = await getSolHistory(
    getSolOrder(latestSol)
  )
  printHistoryInConsole(solHistory)
}

function printHistoryInConsole(solHistory) {
  solHistory.forEach(sol => {
    const order = getSolOrder(sol)
    const min = getSolMinTemp(sol)
    const max = getSolMaxTemp(sol)
    const unit = getSolUnit(sol)

    console.log(`Sol #${order}: ${min}..${max} ${unit}`)
  })
}

function printErrorInConsole(e) {
  console.log('--> ERROR:', e)
}

function printLoadingInConsole() {
  console.log('Loading...')
}

async function getSolHistory(solOrder) {
  let oldestSol = solOrder - SOL_OFFSET
  if (oldestSol < 0) {
    oldestSol = solOrder
  }

  const solsRequests = []
  for (let i = solOrder; i >= oldestSol; i--) {
    solsRequests.push(fetchSol(i))
  }

  return await Promise.all(solsRequests)
}