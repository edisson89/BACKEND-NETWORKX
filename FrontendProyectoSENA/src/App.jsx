import './App.css'
import {  useEffect, useState } from 'react'
import { BiAperture } from 'react-icons/bi'
import FeedCard from './components/FeedCard'
import TraceabilitySearch from './components/TraceabilityCard'
import ProductManagement from './components/ProductManagement'
import Login from './components/Login'
import Register from './components/Register'
import { useProducts } from './hooks/useProducts'

function App() {
  const { products, fetchProducts } = useProducts()
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))
  const [isRegistering, setIsRegistering] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    fetchProducts() // Recargar productos al autenticarse
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
  }

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={BiAperture} className="framework" alt="icons" />
        </div>
        <div className='buttonLogin'>
          <h1 className="title">NetworkX</h1>
          {isAuthenticated && (
            <button onClick={handleLogout} style={{ marginTop: '10px',marginLeft:'160px', cursor: 'pointer', padding: '5px 10px' }}>Cerrar Sesión</button>
          )}
        </div>
      </section>

      {!isAuthenticated ? (
        isRegistering ? (
          <Register 
            onRegisterSuccess={handleLoginSuccess} 
            onSwitchToLogin={() => setIsRegistering(false)} 
          />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => setIsRegistering(true)} />
        )
      ) : (
        /* Sección de Gestión de Productos (Formulario de Creación) */
        <section className="management-section" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mxWidth: '1200px', margin: '5% auto' }}>
          <ProductManagement />
        </section>
      )}

      <div className="cards">
        {products.map((prod) => (
          <FeedCard key={prod._id} product={prod} />
        ))}

          <TraceabilitySearch />
        </div>

    
    </>
  )
}

export default App
