namespace SpriteKind {
    export const PowerUP = SpriteKind.create()
}
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
        `, mySprite, 1000, 0)
    if (doubleFireMode && doubleFireMode.lifespan > 0) {
        projectile.y += -5
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
            `, mySprite, 1000, 0)
        projectile.y += 5
    }
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    enemyDeath(statusbar.spriteAttachedTo())
})
function enemyDeath (enemy: Sprite) {
    sprites.destroy(enemy, effects.disintegrate, 500)
    if (Math.percentChance(40)) {
        powerUp = sprites.create(img`
            . . . 8 8 8 8 8 8 8 8 8 . . . . 
            . . 8 8 7 7 7 7 7 7 7 7 8 . . . 
            . 8 8 8 7 7 7 7 7 7 7 7 8 8 . . 
            8 8 8 8 7 7 7 8 8 8 7 7 8 8 8 . 
            8 8 8 8 7 7 7 8 8 8 7 7 8 8 8 . 
            8 8 8 8 7 7 7 8 8 8 7 7 8 8 8 . 
            8 8 8 8 7 7 7 8 8 8 7 7 8 8 8 . 
            8 8 8 8 7 7 7 7 7 7 7 7 8 8 8 . 
            8 8 8 8 7 7 7 7 7 7 7 7 8 8 8 . 
            8 8 8 8 7 7 7 7 7 7 7 7 8 8 8 . 
            8 8 8 8 7 7 8 8 8 8 8 8 8 8 8 . 
            8 8 8 8 7 7 8 8 8 8 8 8 8 8 8 . 
            . 8 8 8 7 7 8 8 8 8 8 8 8 8 . . 
            . . 8 8 7 7 8 8 8 8 8 8 8 . . . 
            . . . 8 7 7 8 8 8 8 8 8 . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.PowerUP)
        powerUp.x = enemy.x
        powerUp.y = enemy.y
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUP, function (sprite, otherSprite) {
    doubleFireMode = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 9 9 9 9 9 9 9 . . . 
        . . . . . 9 9 9 9 9 9 5 9 9 . . 
        . 9 9 9 9 9 9 9 5 5 5 9 9 9 . . 
        . . . . . 9 9 9 9 9 9 9 9 9 . . 
        . . . . . . . 9 9 9 9 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . 9 9 9 9 9 . . 
        . . . . . . 9 9 9 9 9 9 9 5 9 . 
        . 9 9 9 9 9 9 9 9 5 5 5 5 5 9 . 
        . 9 . . . 9 9 9 9 9 9 9 9 9 9 . 
        . . . . . . 9 9 9 9 9 9 9 9 9 . 
        . . . . . . . . . 9 9 9 9 9 . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    doubleFireMode.setPosition(28, 5)
    doubleFireMode.lifespan = 9000
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -15
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
    enemyDeath(otherSprite)
})
let ship: Sprite = null
let powerUp: Sprite = null
let statusbar: StatusBarSprite = null
let doubleFireMode: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
effects.smiles.startScreenEffect()
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
controller.moveSprite(mySprite, 100, 100)
mySprite.setStayInScreen(true)
info.setLife(10000)
let enemySpeed = 30
let enemySpawnTime = 2000
game.onUpdateInterval(5000, function () {
    enemySpeed += 10
    enemySpeed = Math.min(enemySpeed, 45)
    enemySpawnTime += -200
    enemySpeed = Math.min(enemySpawnTime, 500)
})
forever(function () {
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
    ship.vx = 1 - enemySpeed
    ship.y = randint(0, scene.screenHeight() - 0)
    statusbar = statusbars.create(20, 4, StatusBarKind.EnemyHealth)
    statusbar.setColor(5, 10)
    statusbar.attachToSprite(ship)
    pause(enemySpawnTime)
})
