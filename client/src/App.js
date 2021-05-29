import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [songs, setSongs] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/songs')
      setShows(data)
    }
    getData()
  }, [])

  return (
    <div>Hello World!</div>
  )
}
export default App
