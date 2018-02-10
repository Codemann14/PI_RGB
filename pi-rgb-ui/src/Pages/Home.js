import React, { Component } from "react"
import Lights from "../Components/Lights";

class Home extends Component {
    render() {
        return (
            <div>
                <h1 className="text-center">PI RGB</h1>
                <Lights />
            </div>
        )
    }
}

export default Home
