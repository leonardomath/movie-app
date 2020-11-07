import React from 'react'
import { parseISO, isDate } from 'date-fns'
import Bulma from '../node_modules/bulma/css/bulma.min.css'
import './App.css'

function App() {

  const [movieTitle, setMovieTitle] = React.useState(null)
  const [Released, setReleased] = React.useState(null)
  const [posterUrl, setPosterUrl] = React.useState(null)
  const [name, setName] = React.useState(null)
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  async function searchMovie() {
    setLoading(true)
    setError(false)
    const response = await fetch(`http://www.omdbapi.com/?t=${name}&apikey=ec9c2bae`)
    const data = await response.json()
    if (data.Error) {
      setError(true)
    } else {
      setMovieTitle(data.Title)
      setPosterUrl(data.Poster)
      setReleased(data.Released)
    }

    setLoading(false)
  }

  return (
    <div className="App">
      <div className="container">
        <div className="box-movie">
          <h1 class="title">Digite o nome do filme</h1>
          <input class={`input ${loading ? 'is-loading' : ''}`} type="text" placeholder="Text input" onChange={e => setName(e.target.value)} value={name}></input>
          <button onClick={searchMovie} class="button is-link">Encontrar</button>
        </div>
        { loading ? <div class="loading"><button class="button is-loading">Loading</button></div> : ''}
        { error ? 
        <div class="notification is-danger">
          Filme não encontrado.
        </div> 
        : 
        <div className="movie">
          <h1>{movieTitle}</h1>
          <p>{Released}</p>
          <img src={posterUrl} alt={movieTitle}/>
        </div>  }
        
      </div>
    </div>
  );
}

export default App;
