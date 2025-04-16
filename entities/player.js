import { playIfNotPlaying } from "../utils.js"

/*
Błędy:
    -przy szybkim klikaniu spacji gracz może wystrzelić z dużą prędkością
     oraz/lub zablokować możliwość chodzenia i skakania najprawdopodobiej ten
     błąd dotyczy wykrywania czy gracz stoi na czymś w lini 118

*/


export function spawnPlayer(position){

    return [
        sprite("player", {
            anim: "idle"
        }),
        pos(position),
        anchor("center"),
        area({
            shape: new Rect( vec2(0,0), 11, 20)
        }),
        body(),
        {
            state: "idle",
            canRun: true,
            canJump: true,
            direction: "none",
        },
        timer(),
        "player",
    ]
}
export function bindPlayerMovement(player){
    const JUMP_Y = -150
    let startTime, timerCtrl, jumped
    onKeyDown((key) => {
        if (key == "left" && player.canRun) {
            player.flipX = true

            player.move(-100,0)
            player.state = "run"
        }
        else if (key == "right" && player.canRun) {
            player.flipX = false

            player.move(100,0)
            player.state = "run"
        }
    })
    onKeyPress((key) => {
        if (key == "space" && player.canJump) {
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
            console.log(key)

            player.state = "jumping"
        }
        else if ( ["left", "right"].includes(key)) {
            player.direction = key
            key == "left" ? player.flipX = true : player.flipX = false
        }
        console.log(key)
    })
    onKeyRelease((key) => {
        if (key == "left") {
            player.state = "idle"
            player.direction = "none"
        }
        else if (key == "right") {
            player.state = "idle"
            player.direction = "none"
        }
        else if (key == "space" && player.canJump) {
            if ( !jumped ) {
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
        }
    })
    player.onGround(() => {
            debug.log("ziemia")
            player.canRun = true
            player.canJump = true
            player.vel = vec2(0,0)
    })
}

export function initStateMachine(player){
    onUpdate(() => {
        if ( player.state === "run"){
            playIfNotPlaying(player, "run")
        } else if ( player.state === "idle"){

            playIfNotPlaying(player, "idle")



        }
    })
}
