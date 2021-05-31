import React, { useState, useEffect } from 'react' // step 61 import state and effect
import axios from 'axios' //step 62.4

const App = () => { // step 60 change to be const app, return hello world
  const [songs, setSongs] = useState([]) // step 61.1

  useEffect(() => { // step 62.2
    const getData = async () => {
      const { data } = await axios.get('/api/songs') // step 62.3 plus yarn add axios, step 62.5 get '/api/songs' - never in an axios request will we write localhost otherwise it will break, this makes a request to my api for me
      setSongs(data) // step 62.6
    }
    getData() // step 62.7

  }, [])

  return (
    <>
      {songs.map(song => {
        return <h1 key={song._id}>{song.name} - {song.artists} </h1>
      })}
    </>

  )
}

export default App


// step 63 add nodemon.json in client folder in frontend, so when frontend server is refreshing with changes, we dont want to update backend so the servers run independently from one another
// step 64 yarn seed in back end. yarn serve after, yarn start in front end, go to show.js in models folder