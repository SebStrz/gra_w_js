export function playIfNotPlaying(obj, animation){
    if (obj.curAnim() != animation) obj.play(animation)
}

export function displayBlinkingMsg(msg, position){
   const message = add([
      text(msg, { size: 24, font: "moje" }),
      area(),
      anchor("center"),
      pos(position),
      opacity(),
      state("up", ["up", "down"]),
    ])
    message.onStateEnter("up", async () => {
        await tween(
            message.opacity,
            0,
            0.5,
            (opacity) => (message.opacity = opacity),
            easings.linear
        )
        message.enterState("down")
    })

    message.onStateEnter("down", async () => {
        await tween(
            message.opacity,
            1,
            0.5,
            (opacity) => (message.opacity = opacity),
            easings.linear
        )
        message.enterState("up")
    })

    return message
}
