import mainWorld from "./mainWorld.js"
import test from "./test.js"
export default async function LoadScenes(){
    const scenes = {
        mainWorld,
        test
    }

    for (const sceneName in scenes){
        scene(sceneName, () => scenes[sceneName]())
    }
}
