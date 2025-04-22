import { displayBlinkingMsg } from "../utils.js"
export default function mainMenu(){


    setBackground(0,0,0)

    const msg = displayBlinkingMsg(
        "press [ enter ]",
        center()
    )

    msg.onKeyPress("enter", () => {
        go("mainWorld")
    })
}
