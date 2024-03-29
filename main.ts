controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . 2 2 2 . . . . . . . . . . . 
        . . 2 2 2 . . . . . . . . . . . 
        . . 2 2 2 2 . . . . . . . 5 . . 
        . . 2 2 2 2 . . . . . . . 5 5 . 
        . . f f f f f f f f f f f f 5 5 
        . . 2 2 2 2 . . . . . . . 5 5 . 
        . . 2 2 2 2 . . . . . . . 5 . . 
        . . 2 2 2 2 . . . . . . . . . . 
        . . 2 2 2 . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 250, 0)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite, effects.disintegrate, 500)
})
let ship: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
effects.clouds.startScreenEffect()
scene.setBackgroundColor(9)
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . f f e 2 f f f f f f 2 e f f . 
    . f f f f f e e e e f f f f f . 
    . . f e f b f 4 4 f b f e f . . 
    . . f e 4 1 f d d f 1 4 e f . . 
    . . . f e 4 d d d d 4 e f e . . 
    . . f e f 2 2 2 2 e d d 4 e . . 
    . . e 4 f 2 2 2 2 e d d e . . . 
    . . . . f 4 4 5 5 f e e . . . . 
    . . . . f f f f f f f . . . . . 
    . . . . f f f . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 500, 500)
scene.cameraFollowSprite(mySprite)
info.setLife(60)
game.onUpdateInterval(5000, function () {
    ship = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 2 2 . . . . . 
        . . . . . . . 2 2 2 2 5 5 . . . 
        . . . . . 2 2 2 2 2 2 . . . . . 
        . . . . 2 2 2 2 2 2 2 . . . . . 
        . . . . 2 2 2 2 2 2 2 . . . . . 
        . . . . 6 6 6 6 6 6 6 . . . . . 
        . . . 2 2 2 2 2 2 2 2 . . . . . 
        . . 2 2 f f 2 2 2 2 2 . . . . . 
        . . . 2 2 2 2 2 2 2 2 . . . . . 
        . . . 2 2 2 2 2 2 2 2 . . . . . 
        . . . . 2 6 6 6 6 6 6 . . . . . 
        . . . . . 2 2 2 2 2 2 . . . . . 
        . . . . . . 2 2 2 2 2 5 5 . . . 
        . . . . . . . . 2 2 2 . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    ship.x = scene.screenWidth()
    ship.vx = -20
    ship.y = randint(0, scene.screenHeight() - 0)
})
