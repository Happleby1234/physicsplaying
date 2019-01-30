var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                y: 0.8
            },
            debug: true,
            debugBodyColor: 0xffffff
        }
    },
    scene: {
        create: create
    }
}


var game = new Phaser.Game(config)
function create() {
    this.matter.world.setBounds();
    this.matter.add.mouseSpring();

    this.matter.add.rectangle(770, 490, 220, 380, {
        isStatic: true,
        chamfer: { radius: 20 }
    });

    this.matter.add.rectangle(30, 490, 220, 380, {
        isStatic: true,
        chamfer: { radius: 20 }
    });


    var rect1 = Phaser.Physics.Matter.Matter.Bodies.rectangle(400, 400, 50, 50)
    this.matter.world.add(rect1);


    var bods = Phaser.Physics.Matter.Matter.Bodies;
    var rect = bods.rectangle(200, 200, 50, 50);
    var circ1 = bods.circle(250, 200, 25);
    var circ2 = bods.circle(150, 200, 25);

    var compoundBody = Phaser.Physics.Matter.Matter.Body.create({
        parts: [rect, circ1, circ2]
    });

    this.matter.add.worldConstraint(compoundBody, 200, 0.8, {
        pointA:{ x: 150, y: 200 },
        pointB: { x: -50, y: 0 }
    });
    this.matter.add.worldConstraint(compoundBody, 200, 0.8, {
        pointA: { x: 400, y: 200 },
        pointB: { x: 50, y: 0 }
    });
    this.matter.world.add(compoundBody);
    /*************************Cool Functions*********************************/
    var stack = this.matter.add.pyramid(250, 50, 6, 10, 0, 0, function (x, y) {
        return Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y, 50, 50, Phaser.Math.Between(20, 40))
    });


    var group = this.matter.world.nextGroup(true);
    var chain = this.matter.add.stack(450, 100, 4, 1, 0, 0, function (x, y) {
        return Phaser.Physics.Matter.Matter.Bodies.rectangle(x - 20, y, 53, 20, {
            collisionFilter: { group: group },
            chamfer: 5,
            density: 0.05,
            frictionAir: 0.05
        });
    });

    this.matter.add.chain(chain, 0.3, 0, -0.3, 0,{
        stiffness: 1,
        length: 0,
        render: {
            visible: true
        }
    });

    this.matter.add.worldConstraint(chain.bodies[0], 2, 0.9, {
        pointA: { x: 450, y: 100 },
        pointB: { x: -25, y: 0 }
    });
    var rect1 = Phaser.Physics.Matter.Matter.Bodies.rectangle(400, 400, 50, 50)
    this.matter.world.add(rect1);

    this.matter.add.joint(chain.bodies[chain.bodies.length - 1], rect1, 80, 0.1);
}

