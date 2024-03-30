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
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    sprites.destroy(statusbar.spriteAttachedTo())
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -15
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite, effects.disintegrate, 500)
    scene.cameraShake(4, 500)
})
let ship: Sprite = null
let statusbar: StatusBarSprite = null
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
controller.moveSprite(mySprite, 200, 200)
mySprite.setStayInScreen(true)
info.setLife(1000000)
let enemySpeed = 20
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
    ship.vx = 0 - enemySpeed
    ship.y = randint(0, scene.screenHeight() - 0)
    statusbar = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    statusbar.setColor(5, 10)
    statusbar.attachToSprite(ship)
})
