import { spawnPlayer, bindPlayerMovement, initStateMachine} from "../entities/player.js"
export default async function mainWorld(){

    loadSprite("player","assets/sprites/player.png", {
        sliceX: 10,
        sliceY: 8,
        anims: {
            idle: { from: 0, to: 5, loop: true},
            run: {from: 10, to: 17, loop: true},
            stop: {from: 20, to: 23 },
            jump: {from: 30, to: 35 },
            fall: {from: 40, to: 45 },
            dead: {from: 50, to: 59 },
            damage: {from:60, to:63 },
            dash: {frames: [70,71,72,73,75] },

        },
    })
    const player = add(spawnPlayer(10,0))
    initStateMachine(player)
    bindPlayerMovement(player)
    // grounder(player)
    debug.inspect = true
    const floor = add([
        rect(300,1),
        pos(vec2(10,30)),
        //outline(2),
        area({ friction: 1}),
        body({isStatic: true})

    ])
    setCamPos(10,10);
    setCamScale(3)
}
