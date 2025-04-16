//document.addEventListener("DOMContentLoaded", () => {
//    kaplay();
//
//    scene("game", () => {
//        const rect = add([
//            rect(32,32),
//        ])
//    })
//})
import kaplay from  "https://unpkg.com/kaplay@3001/dist/kaplay.mjs";
import LoadScenes from "./scenes/sceneLoader.js"
import mainWorld from "./scenes/mainWorld.js";
const k = kaplay({ debugKey: "escape" })

//scene("mainWorld",mainWorld)
await LoadScenes()
setGravity(300)
await go("mainWorld")

setCamPos(10,10);
setCamScale(3)
console.log(getCamPos());
console.log(getCamScale());
