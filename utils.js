export function playIfNotPlaying(obj, animation){
    if (obj.curAnim() != animation) obj.play(animation)
}
