import React from 'react'
import './App.css'
import {Switch, Route} from 'react-router-dom'
import {Header} from "./components/Header"
import {Main} from "./pages/main/Main"
import {Drink} from "./pages/drink/Drink"
import {Sleep} from "./pages/sleep/Sleep"
import {Location} from "./pages/location page/Location"
import {FundQuery} from "./pages/sleep/FundQuery"
import {Alcalculator} from "./pages/drink/alcalculator/Alcalculator"

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
                    <Location location={'eten'}/>
                </Route>
                <Route path='/alcoholocator'>
                    <Location location={'drinken'}/>
                </Route>
                <Route path='/alcocalculator'>
                    <Alcalculator/>
                </Route>
                <Route path='/is-er-geld'>
                    <FundQuery/>
                </Route>
                <Route path='/platte-pet'>
                    <Location location={'politiebureau'}/>
                </Route>
                <Route path='/slaaphuis'>
                    <Location location={'daklozenopvang'}/>
                </Route>
                <Route path='/blote-hemel'>
                    <Location location={'park'}/>
                </Route>
                <Route path='/overdekt'>
                    <Location location={'brug of parkeergarage'}/>
                </Route>
            </Switch>
        </>
    )
}

export default App
