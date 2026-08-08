// ==========================================
// 💕 ROMANTIC TREE OF LOVE
// ==========================================

const canvas = document.getElementById("treeCanvas");
const ctx = canvas.getContext("2d");

let branches = [];
let flowers = [];
let petals = [];

let started = false;

// ==========================================
// Canvas
// ==========================================

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", () => {
    resizeCanvas();

    if (started) {
        branches = [];
        flowers = [];
        petals = [];

        createTree();
        createPetals();
    }
});


// ==========================================
// 🌳 Branch
// ==========================================

class Branch {

    constructor(x, y, length, angle, width, depth) {

        this.x = x;
        this.y = y;

        this.length = length;
        this.angle = angle;

        this.width = width;
        this.depth = depth;

        this.progress = 0;
        this.curve = (Math.random() - 0.5) * 35;

        this.childrenCreated = false;
    }

    draw() {

        const endX =
            this.x +
            Math.cos(this.angle) *
            this.length *
            this.progress;

        const endY =
            this.y +
            Math.sin(this.angle) *
            this.length *
            this.progress;

        ctx.beginPath();

        ctx.moveTo(this.x, this.y);

        const midX =
            (this.x + endX) / 2 + this.curve;

        const midY =
            (this.y + endY) / 2;

        ctx.quadraticCurveTo(
            midX,
            midY,
            endX,
            endY
        );

        ctx.strokeStyle = "#5b3026";
        ctx.lineWidth = this.width;
        ctx.lineCap = "round";

        ctx.shadowColor = "rgba(70,20,20,0.25)";
        ctx.shadowBlur = 4;

        ctx.stroke();

        ctx.shadowBlur = 0;


        // Grow branch
        if (this.progress < 1) {

            this.progress += 0.065;

        } else {

            if (!this.childrenCreated) {

                this.childrenCreated = true;

                this.createChildren(endX, endY);
            }
        }
    }


    createChildren(x, y) {

        // 🌸 End of branch
        if (this.depth <= 0) {

            for (let i = 0; i < 20; i++) {

                flowers.push(
                    new Flower(
                        x + (Math.random() - 0.5) * 18,
                        y + (Math.random() - 0.5) * 18
                    )
                );

            }

            return;
        }


        const newLength = this.length * 0.70;
        const newWidth = this.width * 0.70;


        // Left branch
        branches.push(
            new Branch(
                x,
                y,
                newLength,
                this.angle - 0.42,
                newWidth,
                this.depth - 1
            )
        );


        // Right branch
        branches.push(
            new Branch(
                x,
                y,
                newLength,
                this.angle + 0.42,
                newWidth,
                this.depth - 1
            )
        );


        // Middle branch
        if (Math.random() > 0.25) {

            branches.push(
                new Branch(
                    x,
                    y,
                    newLength * 0.85,
                    this.angle,
                    newWidth,
                    this.depth - 1
                )
            );
        }
    }
}


// ==========================================
// ❤️ Heart Flower
// ==========================================

class Flower {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.size = 0;

        this.maxSize =
            5 + Math.random() * 7;

        this.color = randomHeartColor();

        this.delay =
            Math.random() * 100;
    }


    draw() {

        if (this.delay > 0) {

            this.delay--;

            return;
        }


        if (this.size < this.maxSize) {

            this.size += 0.18;
        }


        ctx.save();

        ctx.translate(this.x, this.y);

        ctx.globalAlpha = 0.95;

        ctx.shadowColor = this.color;
        ctx.shadowBlur = 12;

        ctx.fillStyle = this.color;


        const s = this.size;


        // ❤️ Heart
        ctx.beginPath();

        ctx.moveTo(0, s * 0.8);

        ctx.bezierCurveTo(
            -s * 1.8,
            -s * 0.4,
            -s * 1.5,
            -s * 1.4,
            -s * 0.7,
            -s * 1.4
        );

        ctx.bezierCurveTo(
            -s * 0.25,
            -s * 1.4,
            0,
            -s * 0.9,
            0,
            -s * 0.5
        );

        ctx.bezierCurveTo(
            0,
            -s * 0.9,
            s * 0.25,
            -s * 1.4,
            s * 0.7,
            -s * 1.4
        );

        ctx.bezierCurveTo(
            s * 1.5,
            -s * 1.4,
            s * 1.8,
            -s * 0.4,
            0,
            s * 0.8
        );

        ctx.fill();

        ctx.restore();
    }
}


// ==========================================
// ❤️ Heart Colours
// ==========================================

function randomHeartColor() {

    const colors = [
        "#ff1744",
        "#ff2d55",
        "#ff4d6d",
        "#ff6b81",
        "#ff85a1",
        "#f50057",
        "#e91e63",
        "#ff4081",
        "#ff9eb5"
    ];

    return colors[
        Math.floor(
            Math.random() * colors.length
        )
    ];
}


// ==========================================
// 🌳 Create Tree
// ==========================================

function createTree() {

    branches = [];
    flowers = [];


    // Tree on RIGHT side
    const treeX =
        canvas.width * 0.76;

    const treeY =
        canvas.height - 55;


    // Main trunk
    branches.push(

        new Branch(
            treeX,
            treeY,
            Math.min(
                210,
                canvas.height * 0.30
            ),
            -Math.PI / 2,
            18,
            7
        )

    );
}


// ==========================================
// 🌸 Floating Heart Petal
// ==========================================

class Petal {

    constructor() {

        this.reset(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        );
    }


    reset(x, y) {

        this.x = x;
        this.y = y;

        this.size =
            3 + Math.random() * 6;

        this.speed =
            0.4 + Math.random() * 1.2;

        this.swing =
            Math.random() * Math.PI * 2;

        this.swingSpeed =
            0.015 + Math.random() * 0.025;

        this.angle =
            Math.random() * Math.PI * 2;

        this.rotate =
            (Math.random() - 0.5) * 0.04;

        this.alpha =
            0.3 + Math.random() * 0.6;

        this.color =
            randomHeartColor();
    }


    update() {

        this.y += this.speed;

        this.swing += this.swingSpeed;

        this.x +=
            Math.sin(this.swing) * 0.35;

        this.angle += this.rotate;


        if (this.y > canvas.height + 30) {

            this.reset(
                Math.random() * canvas.width,
                -30
            );
        }
    }


    draw() {

        ctx.save();

        ctx.translate(
            this.x,
            this.y
        );

        ctx.rotate(this.angle);

        ctx.globalAlpha =
            this.alpha;

        ctx.fillStyle =
            this.color;

        ctx.shadowColor =
            this.color;

        ctx.shadowBlur = 10;


        const s = this.size;


        ctx.beginPath();

        ctx.moveTo(0, s);

        ctx.bezierCurveTo(
            -s * 1.5,
            -s * 0.2,
            -s * 1.3,
            -s,
            -s * 0.6,
            -s
        );

        ctx.bezierCurveTo(
            -s * 0.2,
            -s,
            0,
            -s * 0.5,
            0,
            -s * 0.2
        );

        ctx.bezierCurveTo(
            0,
            -s * 0.5,
            s * 0.2,
            -s,
            s * 0.6,
            -s
        );

        ctx.bezierCurveTo(
            s * 1.3,
            -s,
            s * 1.5,
            -s * 0.2,
            0,
            s
        );

        ctx.fill();

        ctx.restore();
    }
}


// ==========================================
// 🌸 Create Floating Petals
// ==========================================

function createPetals() {

    petals = [];

    for (let i = 0; i < 90; i++) {

        petals.push(
            new Petal()
        );
    }
}


// ==========================================
// 💕 Animation
// ==========================================

function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // 🌳 Branches
    branches.forEach(
        branch => branch.draw()
    );


    // ❤️ Hearts
    flowers.forEach(
        flower => flower.draw()
    );


    // 🌸 Falling hearts
    petals.forEach(
        petal => {

            petal.update();
            petal.draw();

        }
    );


    requestAnimationFrame(
        animate
    );
}


// ==========================================
// ❤️ START TREE
// ==========================================

function startTree() {

    if (started) return;

    started = true;

    createTree();

    createPetals();

    animate();
}