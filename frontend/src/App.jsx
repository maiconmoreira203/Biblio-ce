import React, {useState} from 'react'
import Clocks from './pages/Clocks'

function App(){
  const [tab, setTab] = useState('clocks')
  return (
    <div className="app">
      <header>
        <h1>biblio-ce (PT-BR)</h1>
        <nav>
          <button onClick={()=>setTab('clocks')} className={tab==='clocks'? 'active':''}>Relógios</button>
          <button onClick={()=>setTab('books')} className={tab==='books'? 'active':''}>Livros</button>
          <button onClick={()=>setTab('auth')} className={tab==='auth'? 'active':''}>Autenticação</button>
        </nav>
      </header>
      <main>
        {tab==='clocks' && <Clocks />}
        {tab==='books' && <div style={{padding:20}}>Tela de Livros (em breve) — conecta com /books</div>}
        {tab==='auth' && <div style={{padding:20}}>Tela de Autenticação (em breve)</div>}
      </main>
    </div>
  )
}

export default App
