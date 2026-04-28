import './App.css'
import { BiAperture } from 'react-icons/bi'
import FeedCard from './components/FeedCard'
import TraceabilitySearch from './components/TraceabilityCard'


function App() {
 
  return (
    <>
      <section id="center">
        <div className="hero">
         
          <img src={BiAperture} className="framework" alt="icons" />
         
        </div>
        <div>
          <h1>RED X</h1>
         
        </div>
       
       
      </section>

      
      <div className="cards">
        <FeedCard product={{
  name: "Café de Origen Directo",
  price: "25.000",
  provider: "Finca La Esperanza",
  location: "Antioquia, Colombia",
  badges: ["Orgánico", "Comercio Justo"]
}}/>
 <FeedCard product={{
  name: "Café de Origen Directo",
  price: "298.000",
  provider: "Finca La Amalia",
  location: "Ibague, Colombia",
  badges: ["Orgánico", "Comercio Justo"]
}}/>
 

          <TraceabilitySearch />
        </div>

    
    </>
  )
}

export default App
