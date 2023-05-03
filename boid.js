class Boid {

    constructor(dimension, orientation, type, alignmentfactor, separationfactor) {
        this.position = createVector(random(width), random(height));    //shape center
        this.velocity = p5.Vector.random2D();                           //direction Vector
        this.maxSpeed = 7;                                              //shape max speed
        this.velocity.setMag(random(this.minSpeed, this.maxSpeed));     //shape speed
        this.acceleration = createVector();                             //shape acceleration (force)
        this.maxForce = 0.5;                                            //shape max force
        this.dimension = dimension;                                     //shape size
        this.orientation = orientation;                                 //shape direction (rad)
        this.type = type;                                               //shape type [1 = circle; 2 = square; 3 = triangle]
        this.perceptionRadius = this.dimension * 2;
    
        // Daten Parameter
        this.AlignmentStrangerFactor = alignmentfactor;                                   //factor 0-1 (0 no alignment; 1 alignment)
        this.SeparationStrangerFactor = separationfactor;
    
    }

    edges() {
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        } else if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        } 
    }

    align(boids) {
        let steering = createVector();
        let stranger = createVector();
        let resultingVector = createVector();
        let totalSame = 0;
        let totalStranger = 0;
        for (let other of boids) {
            let d = dist(
                this.position.x, 
                this.position.y, 
                other.position.x, 
                other.position.y
            );        
            if (other != this && d < this.perceptionRadius) {
                if (this.type == other.type) {
                    steering.add(other.velocity);
                    totalSame++;
                }
                else {
                    stranger.add(other.velocity);
                    totalStranger++;
                }
            }
        }
        if (totalSame > 0 ) {
            steering.div(totalSame);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        } 
        if (totalStranger > 0 ) {
            stranger.div(totalStranger);
            stranger.setMag(this.maxSpeed);
            stranger.sub(this.velocity);
            stranger.limit(this.maxForce);
        }
        if (totalStranger == 0 && totalSame == 0) {
            return this.velocity;
        }  
        resultingVector = steering.add(stranger.mult(this.AlignmentStrangerFactor));
        return resultingVector;
    }

    separation(boids) {
        let steering = createVector();
        let stranger = createVector();
        let returnVector = createVector();
        let totalSame = 0;
        let totalStranger = 0;
        for (let other of boids) {
            let d = dist(
                this.position.x, 
                this.position.y, 
                other.position.x, 
                other.position.y
            );
            if (other != this && d < this.perceptionRadius) {
                if (this.type == other.type) {
                    let diff = p5.Vector.sub(this.position, other.position);
                    diff.div(d);
                    steering.add(diff);
                    totalSame++;
                } else {
                    let diff = p5.Vector.sub(this.position, other.position);
                    diff.div(d);
                    stranger.add(diff);
                    totalStranger++;
                }
            }
        }
        if (totalSame > 0) {
            steering.div(totalSame);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        if (totalStranger > 0) {
            stranger.div(totalStranger);
            stranger.setMag(this.maxSpeed * 10);
            stranger.sub(this.velocity);
        }
        if (totalSame == 0 && totalStranger == 0) {
            return this.velocity;
        }
        returnVector = steering.add(stranger.mult(this.SeparationStrangerFactor));
        return returnVector;
    }

    cohesion(boids) {
        let steering = createVector();
        let total = 0;
        for (let other of boids) {
            let d = dist(
                this.position.x, 
                this.position.y, 
                other.position.x, 
                other.position.y
            );
            if (other != this && d < this.perceptionRadius && this.type == other.type) {
                steering.add(other.position);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    flock(boids) {
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);

        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }

    update() {
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.acceleration.mult(0);
    }

    show() {
        if (this.type == 1) {
            square(this.position.x, this.position.y, this.dimension * sqrt(2));
        }
        if (this.type == 2) {
            circle(this.position.x, this.position.y, 1.5 * this.dimension);
        }
        if (this.type == 3) {
            triangle(this.position.x + this.dimension * cos(PI/2 + this.orientation), this.position.y + this.dimension * sin(PI/2 + this.orientation),
                this.position.x + this.dimension * cos(2*PI/3 + PI/2 + this.orientation), this.position.y + this.dimension * sin(2*PI/3 + PI/2 + this.orientation),
                this.position.x + this.dimension * cos(2*PI - PI/6 + this.orientation), this.position.y + this.dimension * sin(2*PI - PI/6 + this.orientation))
        }
        noStroke();
    }
}