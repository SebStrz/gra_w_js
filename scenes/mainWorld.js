import { spawnPlayer, bindPlayerMovement, initStateMachine} from "../entities/player.js"
import block from "../entities/block.js"
import { displayBlinkingMsg } from "../utils.js"
export default async function mainWorld(){

    loadSprite("up", "assets/sprites/up.png")
    loadSprite("down", "assets/sprites/down.png")
    loadSprite("left", "assets/sprites/left.png")
    loadSprite("right", "assets/sprites/right.png")
    loadSprite("x", "assets/sprites/X.png")
    loadSprite("z", "assets/sprites/Z.png")

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

    const arrows = add([
        pos(-40,-40),
        area({
            shape: new Rect(vec2(0,0),45,40)
        }),
    ])

    arrows.add([
        sprite("left"),
        pos(1,15),
    ])
    arrows.add([
        sprite("down"),
        pos(15,15),
    ])
    arrows.add([
        sprite("right"),
        pos(29,15),
    ])
    arrows.add([
        sprite("up"),
        pos(15,2),
    ])
    arrows.add([
        text("poruszanie sie",{
            size: 8,
            font: "moje",
            align: "center"

        }),
        anchor("center"),
        pos(24,33)
    ])

    const jumpTutorial = add([
        pos(62,-40),
        area({
            shape: new Rect(vec2(0,0),15,40)
        })
    ])
    jumpTutorial.add([
        text("przytrzymaj", {
            size: 8,
            font: "moje",
            align: "center"
        }),
        anchor("center"),
        pos(7,12)
    ])
    jumpTutorial.add([
        sprite("z"),
        pos(0,15)
    ])
    jumpTutorial.add([
        text("aby skoczyć",{
            size: 8,
            font: "moje",
            align: "center"
        }),
        anchor("center"),
        pos(7,33),
    ])

    debug.inspect = true
    add([
        rect(600,1),
        pos(-300,30),
        //outline(2),
        area({ friction: 1}),
        body({isStatic: true})

    ])

    add([
        rect(10,10),
        pos(0,0),
        area()
    ])

    add(block(vec2(150,-28),vec2(100,3)))

    add(block(vec2(-21,-90),vec2(100,3)))

    displayBlinkingMsg("up!", vec2(26,-100))
    /*add([
        sprite("kbrd")
    ])*/

    let v = vec2(0,0)

    onUpdate(() => {
        if( !player.vel.eq(v) ){
            debug.log(player.vel)
        }
        Vec2.copy(player.vel, v)
    })

    setCamPos(10,10);
    setCamScale(3)
}
