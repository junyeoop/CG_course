var gl;

function testGLError(functionLastCalled) {
    /*
		gl.getError returns the last error that occurred using WebGL, not necessarily the status of the last called function. The user
		has to check after every single WebGL call or at least once every frame. Usually this would be for debugging only, but for this
		example is is enabled always.
	*/

    var lastError = gl.getError();

    if (lastError != gl.NO_ERROR) {
        alert(functionLastCalled + " failed (" + lastError + ")");
        return false;
    }

    return true;
}

function initialiseGL(canvas) {
    try {
        // Try to grab the standard context. If it fails, fallback to experimental
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
    catch (e) {
    }

    if (!gl) {
        alert("Unable to initialise WebGL. Your browser may not support it");
        return false;
    }

    return true;
}

var shaderProgram;

function cube(sx, sy, sz)
{
    vertexData = [

        -sx/2.0, -sy/2.0, sz/2.0, 0.0, 0.0, 1.0, 1.0,
        sx/2.0, -sy/2.0, sz/2.0, 0.0, 0.0, 1.0, 1.0,
        sx/2.0,  sy/2.0, sz/2.0, 0.0, 0.0, 1.0, 1.0,
        -sx/2.0, -sy/2.0, sz/2.0, 0.5, 0.0, 1.0, 1.0,
        sx/2.0,  sy/2.0, sz/2.0, 0.5, 0.0, 1.0, 1.0,
        -sx/2.0,  sy/2.0, sz/2.0, 0.5, 0.0, 1.0, 1.0,

        -sx/2.0, -sy/2.0, -sz/2.0, 0.0, 1.0, 0.0, 1.0,
        sx/2.0, -sy/2.0, -sz/2.0, 0.0, 1.0, 0.0, 1.0,
        sx/2.0,  sy/2.0, -sz/2.0, 0.0, 1.0, 0.0, 1.0,
        -sx/2.0, -sy/2.0, -sz/2.0, 0.0, 1.0, 0.0, 1.0,
        sx/2.0,  sy/2.0, -sz/2.0, 0.0, 1.0, 0.0, 1.0,
        -sx/2.0,  sy/2.0, -sz/2.0, 0.0, 1.0, 0.0, 1.0,

        // top
        -sx/2.0, sy/2.0, sz/2.0, 1.0, 0.0, 0.0, 1.0,
        sx/2.0, sy/2.0, sz/2.0, 1.0, 0.0, 0.0, 1.0,
        sx/2.0,  sy/2.0, -sz/2.0, 1.0, 0.0, 0.0, 1.0,
        -sx/2.0, sy/2.0, sz/2.0, 1.0, 0.0, 0.0, 1.0,
        sx/2.0,  sy/2.0, -sz/2.0, 1.0, 0.0, 0.0, 1.0,
        -sx/2.0,  sy/2.0, -sz/2.0, 1.0, 0.0, 0.0, 1.0,

        // bottom
        -sx/2.0, -sy/2.0, sz/2.0, 1.0, 1.0, 0.0, 1.0,
        sx/2.0, -sy/2.0, sz/2.0, 1.0, 1.0, 0.0, 1.0,
        sx/2.0,  -sy/2.0, -sz/2.0, 1.0, 1.0, 0.0, 1.0,
        -sx/2.0, -sy/2.0, sz/2.0, 1.0, 1.0, 0.0, 1.0,
        sx/2.0,  -sy/2.0, -sz/2.0, 1.0, 1.0, 0.0, 1.0,
        -sx/2.0,  -sy/2.0, -sz/2.0, 1.0, 1.0, 0.0, 1.0,

        // side
        -sx/2.0, -sy/2.0, sz/2.0, 0.0, 1.0, 1.0, 1.0,
        -sx/2.0, sy/2.0, sz/2.0, 0.0, 1.0, 1.0, 1.0,
        -sx/2.0,  sy/2.0, -sz/2.0, 0.0, 1.0, 1.0, 1.0,
        -sx/2.0, -sy/2.0, sz/2.0, 0.0, 1.0, 1.0, 1.0,
        -sx/2.0,  -sy/2.0, -sz/2.0, 0.0, 1.0, 1.0, 1.0,
        -sx/2.0,  sy/2.0, -sz/2.0, 0.0, 1.0, 1.0, 1.0,

        // side2
        sx/2.0, -sy/2.0, sz/2.0, 1.0, 0.0, 1.0, 1.0,
        sx/2.0, sy/2.0, sz/2.0, 1.0, 0.0, 1.0, 1.0,
        sx/2.0,  sy/2.0, -sz/2.0, 1.0, 0.0, 1.0, 1.0,
        sx/2.0, -sy/2.0, sz/2.0, 1.0, 0.0, 1.0, 1.0,
        sx/2.0,  -sy/2.0, -sz/2.0, 1.0, 0.0, 1.0, 1.0,
        sx/2.0,  sy/2.0, -sz/2.0, 1.0, 0.0, 1.0, 1.0,


];

    return vertexData;

}

function initialiseBuffer() {

    var vertexData = cube(1.0, 1.0, 1.0);

    // Generate a buffer object
    gl.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
    return testGLError("initialiseBuffers");
}

function initialiseShaders() {

    var fragmentShaderSource = '\
			varying highp vec4 col;\
			void main(void) \
			{ \
				gl_FragColor = col;\
				\
			}';

    // Create the fragment shader object
    gl.fragShader = gl.createShader(gl.FRAGMENT_SHADER);

    // Load the source code into it
    gl.shaderSource(gl.fragShader, fragmentShaderSource);

    // Compile the source code
    gl.compileShader(gl.fragShader);

    // Check if compilation succeeded
    if (!gl.getShaderParameter(gl.fragShader, gl.COMPILE_STATUS)) {
        // It didn't. Display the info log as to why
        alert("Failed to compile the fragment shader.\n" + gl.getShaderInfoLog(gl.fragShader));
        return false;
    }

    // Vertex shader code
    var vertexShaderSource = '\
			attribute highp vec4 myVertex; \
			attribute highp vec4 myColor; \
			varying highp vec4 col;\
			uniform mediump mat4 transformationMatrix; \
			void main(void)  \
			{ \
			    col = myColor;\
				gl_Position = transformationMatrix * myVertex; \
			}';

    // Create the vertex shader object
    gl.vertexShader = gl.createShader(gl.VERTEX_SHADER);

    // Load the source code into it
    gl.shaderSource(gl.vertexShader, vertexShaderSource);

    // Compile the source code
    gl.compileShader(gl.vertexShader);

    // Check if compilation succeeded
    if (!gl.getShaderParameter(gl.vertexShader, gl.COMPILE_STATUS)) {
        // It didn't. Display the info log as to why
        alert("Failed to compile the vertex shader.\n" + gl.getShaderInfoLog(gl.vertexShader));
        return false;
    }

    // Create the shader program
    gl.programObject = gl.createProgram();

    // Attach the fragment and vertex shaders to it
    gl.attachShader(gl.programObject, gl.fragShader);
    gl.attachShader(gl.programObject, gl.vertexShader);

    // Bind the custom vertex attribute "myVertex" to location 0
    gl.bindAttribLocation(gl.programObject, 0, "myVertex");
    gl.bindAttribLocation(gl.programObject, 1, "myColor");

    // Link the program
    gl.linkProgram(gl.programObject);

    // Check if linking succeeded in a similar way we checked for compilation errors
    if (!gl.getProgramParameter(gl.programObject, gl.LINK_STATUS)) {
        alert("Failed to link the program.\n" + gl.getProgramInfoLog(gl.programObject));
        return false;
    }

    gl.useProgram(gl.programObject);

    return testGLError("initialiseShaders");
}

var rotation_x = 0.0;

function renderScene() {

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Get the location of the transformation matrix in the shader using its name
    var matrixLocation = gl.getUniformLocation(gl.programObject, "transformationMatrix");




    // rotation_x += 0.01;
    // var transformationMatrix = [
    //     1.0, 0.0, 0.0, 0.0,
    //     0.0, Math.cos(rotation_x), -Math.sin(rotation_x), 0.0,
    //     0.0, Math.sin(rotation_x), Math.cos(rotation_x), 0.0,
    //     0.0, 0.0, 0.0, 1.0
    // ];

    // Matrix used to specify the orientation of the triangle on screen
    var transformationMatrix = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0,0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ];

    // Pass the identity transformation matrix to the shader using its location
    gl.uniformMatrix4fv(matrixLocation, gl.FALSE, transformationMatrix);

    if (!testGLError("gl.uniformMatrix4fv")) {
        return false;
    }

    // Enable the user-defined vertex array
    gl.enableVertexAttribArray(0);
    // Set the vertex data to this attribute index, with the number of floats in each position
    gl.vertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, 28, 0);

    // Enable the user-defined vertex array
    gl.enableVertexAttribArray(1);
    // Set the vertex data to this attribute index, with the number of floats in each position
    gl.vertexAttribPointer(1, 4, gl.FLOAT, gl.FALSE, 28, 12);

    if (!testGLError("gl.vertexAttribPointer")) {
        return false;
    }


    // gl.drawArrays(gl.LINES, 0, 36);
    gl.drawArrays(gl.TRIANGLES, 0, 36);

    if (!testGLError("gl.drawArrays")) {
        return false;
    }

    return true;
}

function main() {
    var canvas = document.getElementById("helloapicanvas");

    if (!initialiseGL(canvas)) {
        return;
    }

    if (!initialiseBuffer()) {
        return;
    }

    if (!initialiseShaders()) {
        return;
    }

    // Render loop
    requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
			function (callback) {
			    window.setTimeout(callback, 1000, 60);
			};
    })();

    (function renderLoop() {
        if (renderScene()) {
            // Everything was successful, request that we redraw our scene again in the future
            requestAnimFrame(renderLoop);
        }
    })();
}
