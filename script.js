//document.addEventListener("DOMContentLoaded", () => {
//    kaplay();
//
//    scene("game", () => {
//        const rect = add([
//            rect(32,32),
//        ])
//    })
//})
import kaplay from  "https://unpkg.com/kaplay@4000.0.0-alpha.18/dist/kaplay.mjs";
import LoadScenes from "./scenes/sceneLoader.js"
import mainWorld from "./scenes/mainWorld.js";
const k = kaplay({
    debugKey: "escape",
    buttons: {
        jump:{
            keyboard: ["space", "z"]
        },
        dash:{
            keyboard: ["x"]
        },
        left:{
            keyboard: ["left"]
        },
        right:{
            keyboard: ["right"]
        },
        up:{
            keyboard: ["up"]
        },
        down:{
            keyboard: ["down"]
        },
    }
})

loadFont("moje", "./assets/font/Round9x13.ttf")

//scene("mainWorld",mainWorld)
await LoadScenes()
setGravity(300)
// await go("mainWorld")
go("mainWorld")
console.log(getCamPos());
console.log(getCamScale());

