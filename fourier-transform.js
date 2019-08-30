function discreteFourierTransform(image, u, v) {
    let width = image.length;
    let height = image[0].length;
    let real = 0;
    let imaginary = 0;
    let n = image.length;
    let constantExponentPart = 2 * Math.PI / n;
    for (let x = 0; x < height; x++) {
        for (let y = 0; y < width; y++) {
            real += image[x][y] * Math.cos(constantExponentPart * ((u * x) + (v * y)));
            imaginary += image[x][y] * Math.sin(constantExponentPart * ((u * x) + (v * y)));
        }
    }
    return {
        real: real / width,
        imaginary: imaginary / width
    };
}

function doDiscreteFourierTransform(image) {
    let width = image.length;
    let height = image[0].length;
    let newImage = new Array(width);
    for (let x = 0; x < width; x++) {
        newImage[x] = new Array(height);
        for (let y = 0; y < height; y++) {
            newImage[x][y] = discreteFourierTransform(image, x, y);
            console.log(`Finished pixel(${x}, ${y})`)
        }
    }
    return newImage;
}

function magnitudeCalc(real, imaginary) {
    return Math.sqrt((real * real) + (imaginary * imaginary))

}

function getMagnitudes(complexImage) {
    let width = complexImage.length;
    let height = complexImage[0].length;
    return rasterize(complexImage, width, height, (newImage, originalImage, x, y) => {
        let complexNumber = complexImage[x][y];
        newImage[x][y] = magnitudeCalc(complexNumber.real, complexNumber.imaginary)
    });
}

function getPhase(complexImage) {
    let width = complexImage.length;
    let height = complexImage[0].length;
    return rasterize(complexImage, width, height, (newImage, originalImage, x, y) => {
        let complexNumber = complexImage[x][y];
        newImage[x][y] = Math.abs(Math.atan2(complexNumber.imaginary, complexNumber.real)) * 255;
    });
}

function generate2dArray(size) {
    let newImage = new Array(size);
    for (let x = 0; x < size; x++) {
        newImage[x] = new Array(size);
        for (let y = 0; y < size; y++) {
            newImage[x][y] = 0
        }
    }
    return newImage;
}

function do180RotationForEachQuadrant(image) {
    let width = image.length;
    let height = image[0].length;
    let n = width;
    return rasterize(image, width, height, (newImage, originalImage, x, y) => {
        let xPrime = Math.floor((x + n / 2) % n);
        let yPrime = Math.floor((y + n / 2) % n);
        newImage[x][y] = image[xPrime][yPrime]
    });
}

function inverseDiscreteFourierTransform(complexImage, u, v) {
    let width = complexImage.length;
    let height = complexImage[0].length;
    let total = 0;
    let n = complexImage.length;
    let constantExponentPart = -2 * Math.PI / n;
    for (let x = 0; x < height; x++) {
        for (let y = 0; y < width; y++) {
            let complexValue = complexImage[x][y];
            let real = complexValue.real;
            let imaginary = complexValue.imaginary;
            let exponent = constantExponentPart * ((u * x) + (v * y));
            exponent += Math.atan2(imaginary, real);
            total += magnitudeCalc(real, imaginary) * Math.cos(exponent);
        }
    }
    return total / n;
}

function doInverseDiscreteFourierTransform(complexImage) {
    let width = complexImage.length;
    let height = complexImage[0].length;
    return rasterize(complexImage, width, height, (newImage, originalImage, x, y) => {
        newImage[x][y] = inverseDiscreteFourierTransform(complexImage, x, y);
        console.log(`Finished pixel(${x}, ${y})`)
    });
}


function doLogarithmicScaling(pixel, scaleConstant) {
    return scaleConstant * Math.log10(1 + pixel)
}

function calculateLogarithmicConstant(max) {
    return 255 / Math.log10(1 + max);
}

function doMagnitudeScaling(magnitudes) {
    let width = magnitudes.length;
    let height = magnitudes[0].length;
    let maxRow = magnitudes.map(function (row) {
        return Math.max.apply(Math, row);
    });
    let max = Math.max.apply(null, maxRow);
    let c = calculateLogarithmicConstant(max);
    return rasterize(magnitudes, width, height, (newImage, originalImage, x, y) => {
        newImage[x][y] = doLogarithmicScaling(magnitudes[x][y], c);
        console.log(`Finished pixel(${x}, ${y})`)
    });
}
