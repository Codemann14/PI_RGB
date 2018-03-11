import React from "react"
import BrightnessChanger from "../Components/BrightnessChanger"
import Lights from "../Components/Lights"


const Home = () => (
    <div>
        <h1 className="text-center">PI RGB</h1>
        <BrightnessChanger />
        <Lights />        
    </div>
)

export default Home
