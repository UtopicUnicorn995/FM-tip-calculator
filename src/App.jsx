import Calculator from "./components/Calculator"
import h1Icon from '../src/assets/SPLITTER.svg'

function App() {

  return (
    <>
        <header>
      <h1><img src={h1Icon} alt="Splitter text"/></h1>
    </header>
    <Calculator/>
    </>

  )
}

export default App
