import mainWorld from "./mainWorld.js"
import mainMenu from "./mainMenu.js"
export default async function LoadScenes(){
    const scenes = {
        mainWorld,
        mainMenu,
    }

    for (const sceneName in scenes){
        scene(sceneName, () => scenes[sceneName]())
    }
}
