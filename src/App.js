import React from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import {Header} from "./components/Header"
import {Main} from "./pages/main/Main";
import {Drink} from "./pages/drink/Drink";
import {Sleep} from "./pages/sleep/Sleep";
import {Eat} from "./pages/eat/Eat";

function App() {
  return (
   <>
       <Header/>
       <Switch>
           <Route exact path='/'>
               <Main/>
           </Route>
           <Route path='/drinken'>
               <Drink/>
           </Route>
           <Route path='/slapen'>
               <Sleep/>
           </Route>
           <Route path='/eten'>
               <Eat/>
           </Route>
       </Switch>
   </>
  )
}

export default App
