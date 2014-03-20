/*\ 
|*| ============================================================================
|*| Engine constructor
|*| Takes a canvas element and has an optional fps parameter
|*| ============================================================================
\*/ 
var Engine = function(canvas, fps, width, height) {
    this.canvas = canvas;
    this.width = this.canvas.width || 640;
    this.height = this.canvas.height || 360;
    this.context = this.canvas.getContext('2d');
    this.fps = fps || 60;
};

/*\
|*| ============================================================================
|*| Runs the game loop and draws the entities
|*| ============================================================================
\*/
Engine.prototype.run = function() {
    this.loop = setInterval(this.update, 1000/this.fps, this);
    return this;
};

/*\
|*| Update function for canvas
\*/
Engine.prototype.update = function(n) {
    n.clear().draw();
};

/*\
|*| Stops the game loop
\*/
Engine.prototype.stop = function() {
    clearInterval(this.loop);
    return this;
};
/*\
|*| Draws the canvas
\*/
Engine.prototype.draw = function() {
    // Loops through entities and calls their draw methods with thier properties
    for (var en in this.entities) {
        var entity = this.entities[en];
        entity.draw(this.context, entity.prop);
    }
    return this;
};

/*\
|*| Clears the canvas
\*/
Engine.prototype.clear = function() {
    this.context.clearRect(0, 0, this.width, this.height);
    return this;
};

/*\
|*| ============================================================================
|*| Objects for the entities and thier bases(types)
|*| ============================================================================
\*/
Engine.prototype.entities = {};
Engine.prototype.bases = {};

/*\
|*| ============================================================================
|*| Entities creator
|*| Takes the name of the entity, it's type(defined in bases), and an object
|*| with the paramers of its type
|*| ============================================================================
\*/
Engine.prototype.e = function(name, type, prop) {
    this.entities[name] = {
        type: type,
        prop: prop,
        draw: this.bases[type]
    };
    return this.entities[name];
};

/*\
|*| ============================================================================
|*| Entity base creator
|*| Takes the name(type) and a function that draws the entity
|*| ============================================================================
\*/
Engine.prototype.b = function(name, base) {
    this.bases[name] = base;
    return this.bases[name];
};
