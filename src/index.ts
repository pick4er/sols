
// TYPES
interface Units {
  Celsius: 'C';
}

interface SuccessSol {
  status: 200;
  sol: number;
  season: string;
  min_temp: number;
  max_temp: number;
  unitOfMeasure: keyof Units;
  // some other non-used props
}
interface ErrorSol {
  status: 404 | 500;
  errorMessage: string;
}

type SolResponse = SuccessSol | ErrorSol;

function isErrorSol(sol: SolResponse): sol is ErrorSol {
  return sol.status === 404 || sol.status === 500
}

// DICTIONARY
const API_URL = 'https://api.maas2.apollorion.com'
const SOL_OFFSET = 4
const Units: Units = {
  Celsius: 'C',
}

// API
function API(url: string): Promise<SolResponse> {
  return fetch(`${API_URL}/${url}`, { method: 'GET' })
    .then(res => res.text().then(JSON.parse))
    .catch(console.error);
}

function fetchLatestSol() {
  return API('')
}

function fetchSol(solOrder: number) {
  return API(`${solOrder}`)
}

// APP
getSols().catch(console.error)

async function getSols() {
  const latestSol = await fetchLatestSol()
  if (isErrorSol(latestSol)) {
    throw new Error(latestSol.errorMessage)
  }

  const solHistory = await getSolHistory(latestSol.sol)
  solHistory.forEach((sol: SuccessSol) => {
    console.log(
`Sol #${sol.sol}: \
${sol.min_temp}..${sol.max_temp} \
${Units[sol.unitOfMeasure]}`
    )
  })
}

async function getSolHistory(solOrder: number) {
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