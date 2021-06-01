import React from 'react' // step 61 import state and effect
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NavBar from './components/NavBar.js'


const App = () => { 



  return (
    <BrowserRouter>
      <Switch>
        <NavBar />
        <Route>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App


// step 63 add nodemon.json in client folder in frontend, so when frontend server is refreshing with changes, we dont want to update backend so the servers run independently from one another
// step 64 yarn seed in back end. yarn serve after, yarn start in front end, go to show.js in models folder