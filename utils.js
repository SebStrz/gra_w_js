export function playIfNotPlaying(obj, animation){
    if (obj.curAnim() != animation) obj.play(animation)
}

export function jumpInterpolationFunction(x){
  return -0.831908831908841 * Math.pow(x, 4)
         + 2.23977207977208 * Math.pow(x, 3)
         - 2.43580056980056 * Math.pow(x, 2)
         + 1.86192877492877 * x
         + 0.166008547008547;
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
export function makeBlinkingMsg(msg, position){
   const message = make([
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
