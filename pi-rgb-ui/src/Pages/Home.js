import React, { Component } from "react"
import PropTypes from "prop-types"
import BrightnessChanger from "../Components/BrightnessChanger"
import ChangeAllLEDsBtn from "../Components/ChangeAllLEDsBtn"
import Lights from "../Components/Lights"
import WebSocketFailed from "../Components/WebSocketFailed"
import WebSocketStore from "../Stores/WebSocketStore"


const SocketConnectedDisplay = () => (
    <div>
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


const BodyContent = ({ loading, websocketConnected }) => {
    if (!loading) {
        return websocketConnected ? <SocketConnectedDisplay /> : <WebSocketFailed />  
    }
    
    return null  
}

BodyContent.propTypes = {
    loading: PropTypes.bool.isRequired,
    websocketConnected: PropTypes.bool.isRequired,
}


class Home extends Component {
    constructor() {
        super()

        this.state = {
            loading: true,
            websocketConnected: WebSocketStore.getWebSocketConnection(),
        }

        this.handleWebSocketChange = this.handleWebSocketChange.bind(this)
    }

    componentWillMount() {
        WebSocketStore.on("websocket-connection-changed", this.handleWebSocketChange)   
    }

    componentWillUnmount() {
        WebSocketStore.removeListener("websocket-connection-changed", this.handleWebSocketChange) 
    }   
    
    handleWebSocketChange() {
        this.setState({
            loading: false,
            websocketConnected: WebSocketStore.getWebSocketConnection(),
        })
    }

    render() {
        const { loading, websocketConnected } = this.state

        return (
            <div>
                <h1 className="text-center">PI RGB</h1>

                <BodyContent websocketConnected={websocketConnected} loading={loading} />
                   
            </div>
        )
    }
}

export default Home
