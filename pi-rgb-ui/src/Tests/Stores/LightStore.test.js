import LightsStore from "../../Stores/LightsStore"
import LightActions from "../../Actions/LightActions"

describe("LightsStore", () => {
    const LEDsObject = {
        Type: "",
        Data: [
            {
                LEDPosition: 1,
                R: 255,
                G: 255,
                B: 255,
            },
            {
                LEDPosition: 2,
                R: 255,
                G: 255,
                B: 255,
            },
            {
                LEDPosition: 3,
                R: 255,
                G: 255,
                B: 255,
            },
            {
                LEDPosition: 4,
                R: 255,
                G: 255,
                B: 255,
            },
            {
                LEDPosition: 5,
                R: 255,
                G: 255,
                B: 255,
            },
            {
                LEDPosition: 6,
                R: 255,
                G: 255,
                B: 255,
            }, 
            {
                LEDPosition: 7,
                R: 255,
                G: 255,
                B: 255,
            }, 
            {
                LEDPosition: 8,
                R: 255,
                G: 255,
                B: 255,
            }, 
            {
                LEDPosition: 9,
                R: 255,
                G: 0,
                B: 0,
            }, 
            {
                LEDPosition: 10,
                R: 255,
                G: 0,
                B: 0,
            },
        ],
    }

    beforeEach(() => {
        LightsStore.lights = LEDsObject.Data
    })

    it("Updates LED color 1", () => {
        LightActions.ChangeLEDColor(1, 122, 122, 122)

        const changedObj = {
            LEDPosition: 1,
            R: 122,
            G: 122,
            B: 122, 
        }

        expect(LightsStore.lights[0]).toEqual(changedObj)
    })

    it("Updates LED color 2", () => {
        LightActions.ChangeLEDColor(4, 150, 150, 150)

        const changedObj = {
            LEDPosition: 4,
            R: 150,
            G: 150,
            B: 150, 
        }

        expect(LightsStore.lights[3]).toEqual(changedObj)
    })
})
