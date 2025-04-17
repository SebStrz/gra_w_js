import { playIfNotPlaying } from "../utils.js"

/*
Błędy:
    -przy szybkim klikaniu spacji gracz może wystrzelić z dużą prędkością
     oraz/lub zablokować możliwość chodzenia i skakania najprawdopodobiej ten
     błąd dotyczy wykrywania czy gracz stoi na czymś

*/

const JUMP_Y = -150
var startTime, timerCtrl, jumped, leftB, rightB, upB, downB

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
            dashDirection: vec2(0,0),
        },
        timer(),
        "player",
    ]
}
export function bindPlayerMovement(player){

    bindDash(player)

    bindRun(player)

    bindJump(player)

   player.onGround(() => {
        player.canRun = true
        player.canJump = true
        player.canDash = true
   })
}

export function initStateMachine(player){
    onUpdate(() => {
        if ( player.state === "run"){
            playIfNotPlaying(player, "run")
            //debug.log("run")
        } else if ( player.state === "idle"){
            playIfNotPlaying(player, "idle")
        }
    })
}

function bindDash(player) {
    return [
        onButtonDown(["left","right","up","down"], (btn) => {
            switch (btn) {
                case "left":
                    leftB = true
                    break;
                case "right":
                    rightB = true
                    break;
                case "up":
                    upB = true
                    break;
                case "down":
                    downB = true
                    break;
            }

            let cathetus = 353.55
            if ( leftB && upB ) {
                debug.log("l u")
                player.dashDirection = vec2(-cathetus,-cathetus)
            }
            else if ( rightB && upB ) {
                debug.log("r u")
                player.dashDirection = vec2(cathetus,-cathetus)
            }
            else if ( rightB && downB ) {
                debug.log("r d")
                player.dashDirection = vec2(cathetus,cathetus)
            }
            else if ( leftB && downB ) {
                debug.log("l d")
                player.dashDirection = vec2(-cathetus,cathetus)
            }
            else if ( leftB ) {
                debug.log("l")
                player.dashDirection = vec2(-500,0)
            }
            else if ( rightB ) {
                debug.log("r")
                player.dashDirection = vec2(500,0)
            }
            else if ( upB ) {
                debug.log("u")
                player.dashDirection = vec2(0,-500)
            }
            else if ( downB ) {
                debug.log("d")
                player.dashDirection = vec2(0,500)
            }
        }),
        onButtonPress("dash", () => {
            if( player.canDash ) {

                player.canDash = false
                player.gravityScale = 0
                player.vel = player.dashDirection

                player.wait(0.15, () => {
                    player.vel = vec2(0,0)
                    player.gravityScale = 1
                    player.applyImpulse(vec2(player.dashDirection.x/5,player.dashDirection.y/5))
                })

            }
        }),
        onButtonRelease(["left","right","up","down"], (btn) => {
            switch (btn) {
                case "left":
                    leftB = false
                    break;
                case "right":
                    rightB = false
                    break;
                case "up":
                    upB = false
                    break;
                case "down":
                    downB = false
                    break;
            }
        })
    ]
}

function bindRun(player) {
    return [
        onButtonDown(["left","right"], (btn) => {
            if ( player.canRun ) {
                btn == "left" ? player.move(-100,0) : player.move(100,0)
            }
            player.direction = btn
            btn == "left" ? player.flipX = true : player.flipX = false

            player.state = "run"
        }),
        onButtonRelease(["left", "right"],() => {
            player.state = "idle"
            player.direction = "none"
        })
    ]
}

function bindJump(player) {
    return [
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
        }),
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
    ]
}
