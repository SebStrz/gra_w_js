import { playIfNotPlaying } from "../utils.js"

/*
Błędy:
    -przy szybkim klikaniu spacji gracz może wystrzelić z dużą prędkością
     oraz/lub zablokować możliwość chodzenia i skakania najprawdopodobiej ten
     błąd dotyczy wykrywania czy gracz stoi na czymś

*/


export function spawnPlayer(position){

    return [
        sprite("player", {
            anim: "idle"
        }),
        pos(position),
        anchor("center"),
        area({
            shape: new Rect( vec2(0,0), 11, 20),
            friction: 0.10,
            restitution: 0
        }),
        body({
            damping: 1
        }),
        {
            state: "idle",
            canRun: true,
            canJump: true,
            canDash: true,
            direction: "none",
        },
        timer(),
        "player",
    ]
}
export function bindPlayerMovement(player){
    const JUMP_Y = -150
    let startTime, timerCtrl, jumped
    onButtonDown(["left","right"], (btn) => {
        if ( player.canRun ) {
            btn == "left" ? player.move(-100,0) : player.move(100,0)
        }
        player.direction = btn
        btn == "left" ? player.flipX = true : player.flipX = false
        player.state = "run"
    })
    onButtonPress("jump",() => {
        if (player.canJump) {
            startTime = Date.now()
            player.canRun = false
            jumped = false
            timerCtrl = player.wait(1, () => {
                switch (player.direction) {
                    case "left":
                        player.applyImpulse(vec2(-100,JUMP_Y))

                        break;
                    case "right":
                        player.applyImpulse(vec2(100,JUMP_Y))

                        break
                    default:
                        player.applyImpulse(vec2(0,JUMP_Y))

                        break;
                }

                player.canJump = false
            //    player.canRun = true
                jumped = true
            })

            player.state = "jumping"
        }
    })
    onButtonPress("dash", () => {
        player.gravityScale = 0
        player.vel = vec2(500,0)
        player.wait(0.15, () => {
            player.vel = vec2(0,0)
            player.gravityScale = 1
            player.applyImpulse(vec2(100,0))
        })
    })
    onButtonRelease(["left", "right"],() => {
            player.state = "idle"
            player.direction = "none"
        })
    onButtonRelease("jump", () => {
        if ( player.canJump && !jumped) {
            let factor = (Date.now() - startTime)/1000
            timerCtrl.cancel()
            switch (player.direction) {
                case "left":
                    player.applyImpulse(vec2(-100,JUMP_Y*factor))

                    break;
                case "right":
                    player.applyImpulse(vec2(100,JUMP_Y*factor))

                    break
                default:
                    player.applyImpulse(vec2(0,JUMP_Y*factor))

                    break;
            }

            player.canJump = false

            console.log(factor * JUMP_Y, factor)
        }


    })
   player.onGround(() => {
       debug.log("ziemia")
       player.canRun = true
       player.canJump = true
//       player.vel.x = 0
   })
}

export function initStateMachine(player){
    onUpdate(() => {
        if ( player.state === "run"){
            playIfNotPlaying(player, "run")
            debug.log("run")
        } else if ( player.state === "idle"){
            playIfNotPlaying(player, "idle")

        }
        debug.log(player.friction)


    })

}
//
// export function grounder(player) {
//     onUpdate(() => {
//         if ( player.isGrounded() ){
//             debug.log("grounded")
//             player.canRun = true
//             player.canJump = true
//             player.vel = vec2(0,0)
//         }
//     })
// }
