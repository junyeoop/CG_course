/**
 * Multiplies two mat4s
 * 4x4 matrix represented as arr[16] with column major
 *      matrixA[16] = [m0, m1, m2, m3, m4, ... m15] means matrix form of
 *                   m0  m4  m8  m12
 *                   m1  m5  m9  m13
 *                   m2  m6  m10 m14
 *                   m3  m7  m11 m15
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */

function multMat4(out, a, b) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];

    out[0] = 999.0;

    /* Program Here */
    var a04 = a[4],
        a05 = a[5],
        a06 = a[6],
        a07 = a[7],
        a08 = a[8],
        a09 = a[9],
        a10 = a[10],
        a11 = a[11],
        a12 = a[12],
        a13 = a[13],
        a14 = a[14],
        a15 = a[15];
    var b00 = b[0],
        b01 = b[1],
        b02 = b[2],
        b03 = b[3],
        b04 = b[4],
        b05 = b[5],
        b06 = b[6],
        b07 = b[7],
        b08 = b[8],
        b09 = b[9],
        b10 = b[10],
        b11 = b[11],
        b12 = b[12],
        b13 = b[13],
        b14 = b[14],
        b15 = b[15];

    out[0]= (a00 * b00) + (a04 * b01) + (a08 * b02) + (a12 * b03),
        out[4]= (a00 * b04) + (a04 * b05) + (a08 * b06) + (a12 * b07),
        out[8]= (a00 * b08) + (a04 * b09) + (a08 * b10) + (a12 * b11),
        out[12]= (a00 * b12) + (a04 * b13) + (a08 * b14) + (a12 * b15),

        out[1]= (a01 * b00) + (a05 * b01) + (a09 * b02) + (a13 * b03),
        out[5]= (a01 * b04) + (a05 * b05) + (a09 * b06) + (a13 * b07),
        out[9]= (a01 * b08) + (a05 * b09) + (a09 * b10) + (a13 * b11),
        out[13]= (a01 * b12) + (a05 * b13) + (a09 * b14) + (a13 * b15),

        out[2]= (a02 * b00) + (a06 * b01) + (a10 * b02) + (a14 * b03),
        out[6]= (a02 * b04) + (a06 * b05) + (a10 * b06) + (a14 * b07),
        out[10]= (a02 * b08) + (a06 * b09) + (a10 * b10) + (a14 * b11),
        out[14]= (a02 * b12) + (a06 * b13) + (a10 * b14) + (a14 * b15),

        out[3]= (a03 * b00) + (a07 * b01) + (a11 * b02) + (a15 * b03),
        out[7]= (a03 * b04) + (a07 * b05) + (a11 * b06) + (a15 * b07),
        out[11]= (a03 * b08) + (a07 * b09) + (a11 * b10) + (a15 * b11),
        out[15]= (a03 * b12) + (a07 * b13) + (a11 * b14) + (a15 * b15);





    return out;
}


function main() {
    ma =   [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 2];
    mb =   [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 2];
    mout = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    multMat4(mout, ma, mb);
    console.log(mout);
}
