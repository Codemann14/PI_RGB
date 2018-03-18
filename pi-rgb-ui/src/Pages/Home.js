import React from "react"
import BrightnessChanger from "../Components/BrightnessChanger"
import Lights from "../Components/Lights"
import ChangeAllLEDsBtn from "../Components/ChangeAllLEDsBtn"


const Home = () => (
    <div>
        <h1 className="text-center">PI RGB</h1>
        <BrightnessChanger />
        <ChangeAllLEDsBtn />
        <Lights />        
    </div>
)

export default Home
