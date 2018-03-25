import React from "react"
import BrightnessChanger from "../Components/BrightnessChanger"
import Lights from "../Components/Lights"
import ChangeAllLEDsBtn from "../Components/ChangeAllLEDsBtn"


const Home = () => (
    <div>
        <h1 className="text-center">PI RGB</h1>
        <div className="row">
            <div className="col-6-lg col-6-md col-6-sm col-12-xs">
                <BrightnessChanger />
            </div>
            <div className="col-6-lg col-6-md col-6-sm col-12-xs">
                <ChangeAllLEDsBtn />
            </div>
        </div>        
        <Lights />        
    </div>
)

export default Home
