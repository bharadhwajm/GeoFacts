import { useState } from 'react'
import FactsPanel from './components/FactsPanel'
import Map from './components/Map'

function App() {
  const [country,setCountry]=useState<String|null>(null)

  return (
    <>
      <Map country={country} setCountry={setCountry}/>
      <FactsPanel country={country}/>
    </>
  )
}
export default App
