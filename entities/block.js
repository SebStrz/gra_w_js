export default function block(position,size){
    return [
        rect(size.x, size.y),
        pos(position),
        area({friction: 1}),
        body({isStatic: true})
    ]
}
