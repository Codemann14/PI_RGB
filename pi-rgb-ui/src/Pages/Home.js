import React from "react"
import BrightnessChanger from "../Components/BrightnessChanger"
import Lights from "../Components/Lights"
import ChangeAllLEDsBtn from "../Components/ChangeAllLEDsBtn"


const Home = () => (
    <div>
        <h1 className="text-center">PI RGB</h1>
        <div className="row">
            <div className="col-6">
                <BrightnessChanger />
            </div>
            <div className="col-6">
                <ChangeAllLEDsBtn />
            </div>
        </div>        
        <Lights />        
    </div>
)

export default Home
