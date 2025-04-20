/**
 * With codesandbox we import our functions from the files they live in
 * rather than import that file in the HTML file like we usually do
 *
 * ALSO NOTE that there is NO main function being called.
 * index.js IS your main function and the code written in it is run
 * on page load.
 */
import "./styles.css";
import { initShaders } from "../lib/cuon-utils";
import { Matrix4, Vector3 } from "../lib/cuon-matrix-cse160";

// HelloCube.js (c) 2012 matsuda
// Vertex shader program
// Vertex shader program
const VSHADER_SOURCE = `
  attribute vec2 aPosition;
  uniform mat4 uModelMatrix;
  void main() {
    gl_Position = uModelMatrix * vec4(aPosition, 0.0, 1.0);
  }
`;

// Fragment shader program
const FSHADER_SOURCE = `
  #ifdef GL_ES
  precision mediump float;
  #endif
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }
  `;

// Retrieve <canvas> element
var canvas = document.getElementById("webgl");

// Get the rendering context for WebGL
var gl = canvas.getContext("webgl");
if (!gl) {
  console.log("Failed to get the rendering context for WebGL");
}

// Initialize shaders
if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
  console.log("Failed to intialize shaders.");
}

// Set clear color
gl.clearColor(0.0, 0.0, 0.0, 1.0);

gl.clear(gl.COLOR_BUFFER_BIT);

// 1. Define triangle vertices
const vertices = new Float32Array([-0.5, -0.5, 0.5, -0.5, -0.5, 0.5]);

// 2. Create a buffer and bind/write the data
const vertexBuffer = gl.createBuffer();
if (!vertexBuffer) {
  console.log("Failed to create the buffer object");
}
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

// 3. Get the location of attribute variable
const aPosition = gl.getAttribLocation(gl.program, "aPosition");
if (aPosition < 0) {
  console.error("Failed to get aPosition");
}
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPosition);

const uModelMatrixPtr = gl.getUniformLocation(gl.program, "uModelMatrix");

function drawSpaceship(gl, matrix) {
  const M1 = new Matrix4();

  // center triangle
  M1.set(matrix);
  M1.translate(0.2, 0, 0);
  M1.rotate(-45, 0, 0);
  M1.scale(0.7, 0.7, 1);
  gl.uniformMatrix4fv(uModelMatrixPtr, false, M1.elements);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  // right wing 1
  M1.set(matrix);
  M1.translate(0.2, 0, 0);
  M1.rotate(135, 0, 0);
  M1.scale(0.7, 0.7, 1);
  gl.uniformMatrix4fv(uModelMatrixPtr, false, M1.elements);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  // right wing 2
  M1.set(matrix);
  M1.translate(0.45, 0.25, 0);
  M1.rotate(180, 0, 0, 1);
  M1.scale(0.5, 0.5, 1);
  gl.uniformMatrix4fv(uModelMatrixPtr, false, M1.elements);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  // left wing 1
  M1.set(matrix);
  M1.translate(-0.1, -0.3, 0);
  M1.rotate(-45, 0, 0, 1);
  M1.scale(0.25, 0.25, 1);
  gl.uniformMatrix4fv(uModelMatrixPtr, false, M1.elements);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  // left wing 2
  M1.set(matrix);
  M1.translate(-0.1, -0.3, 0);
  M1.rotate(135, 0, 0);
  M1.scale(0.25, 0.25, 1);
  gl.uniformMatrix4fv(uModelMatrixPtr, false, M1.elements);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  // top
  M1.set(matrix);
  M1.translate(-0.52, -0.28, 0);
  M1.rotate(90, 0, 0, 1);
  M1.scale(0.25, 0.25, 1);
  gl.uniformMatrix4fv(uModelMatrixPtr, false, M1.elements);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  // bottom center
  M1.set(matrix);
  M1.translate(-0.26, -0.28, 0);
  M1.rotate(-90, 0, 0, 1);
  M1.scale(0.25, 0.25, 1);
  gl.uniformMatrix4fv(uModelMatrixPtr, false, M1.elements);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  //   // bottom left
  M1.set(matrix);
  M1.translate(-0.08, -0.46, 0);
  M1.rotate(90, 0, 0, 1);
  M1.scale(0.25, 0.25, 1);
  gl.uniformMatrix4fv(uModelMatrixPtr, false, M1.elements);
  gl.drawArrays(gl.TRIANGLES, 0, 3);

  //   // bottom right
  M1.set(matrix);
  M1.translate(-0.08, -0.72, 0);
  M1.rotate(270, 0, 0, 1);
  M1.scale(0.25, 0.25, 1);
  gl.uniformMatrix4fv(uModelMatrixPtr, false, M1.elements);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

// const baseMatrix = new Matrix4(); // Identity matrix
// drawSpaceship(gl, baseMatrix);

// Fleet of spaceships!

// small rotated spaceship bottom-left
const M1 = new Matrix4();
M1.setTranslate(-0.5, -0.5, 0);
M1.scale(0.35, 0.35, 0.35);
M1.rotate(30, 0, 0, 1);
drawSpaceship(gl, M1);

// medium spaceship bottom-right
const M2 = new Matrix4();
M2.setTranslate(0.5, -0.25, 0);
M2.scale(0.46, 0.46, 0.46);
M2.rotate(45, 0, 0, 1);
drawSpaceship(gl, M2);

// big spaceship top-left
const M3 = new Matrix4();
M3.setTranslate(-0.15, 0.25, 0);
M3.scale(0.75, 0.75, 0.75);
M3.rotate(39, 0, 0, 1);
drawSpaceship(gl, M3);
