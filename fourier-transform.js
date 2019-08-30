function discreteFourierTransform(image, u, v) {
    var width = image.length;
    var height = image[0].length;
    var real = 0;
    var imaginary = 0;
    var n = image.length;
    var constantExponentPart = 2 * Math.PI / n;
    for(var x = 0; x < height; x++) {
        for(var y = 0; y < width; y++) {
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
    var width = image.length;
    var height = image[0].length;
    var newImage = new Array(width);
    for(var x = 0; x < width; x++) {
        newImage[x] = new Array(height);
        for(var y = 0; y < height; y++) {
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
    var width = complexImage.length;
    var height = complexImage[0].length;
    var newImage = new Array(width);
    for(var x = 0; x < width; x++) {
        newImage[x] = new Array(height);
        for(var y = 0; y < height; y++) {
            var complexNumber = complexImage[x][y];
            newImage[x][y] = magnitudeCalc(complexNumber.real, complexNumber.imaginary)
        }
    }
    return newImage;
}

function getPhase(complexImage) {
    var width = complexImage.length;
    var height = complexImage[0].length;
    var newImage = new Array(width);
    for(var x = 0; x < width; x++) {
        newImage[x] = new Array(height);
        for(var y = 0; y < height; y++) {
            var complexNumber = complexImage[x][y];
            newImage[x][y] = Math.abs(Math.atan2(complexNumber.imaginary, complexNumber.real)) * 255;
        }
    }
    return newImage;
}

function generate2dArray(size) {
    var newImage = new Array(size);
    for(var x = 0; x < size; x++) {
        newImage[x] = new Array(size);
        for(var y = 0; y < size; y++) {
            newImage[x][y] = 0
        }
    }
    return newImage;
}

function do180RotationForEachQuadrant(image) {
    var width = image.length;
    var height = image[0].length;
    var n = width;
    var newImage = generate2dArray(width);
    for(var x = 0; x < width; x++) {
        newImage[x] = new Array(height);
        for(var y = 0; y < height; y++) {
            xPrime = Math.floor((x + n / 2) % n);
            yPrime = Math.floor((y + n / 2) % n);
            newImage[x][y] = image[xPrime][yPrime]
        }
    }
    return newImage;
}

function inverseDiscreteFourierTransform(complexImage, u, v) {
    var width = complexImage.length;
    var height = complexImage[0].length;
    var total = 0;
    var n = complexImage.length;
    var constantExponentPart = - 2 * Math.PI / n;
    for(var x = 0; x < height; x++) {
        for(var y = 0; y < width; y++) {
            complexValue = complexImage[x][y];
            real = complexValue.real;
            imaginary = complexValue.imaginary;
            exponent = constantExponentPart * ((u * x) + (v * y));
            ratio = imaginary / real;
            exponent += Math.atan2(imaginary, real);
            total += magnitudeCalc(real, imaginary) * Math.cos(exponent);
        }
    }
    return total / n;
}

function doInverseDiscreteFourierTransform(complexImage) {
    var width = complexImage.length;
    var height = complexImage[0].length;
    var newImage = new Array(width);
    for(var x = 0; x < width; x++) {
        newImage[x] = new Array(height);
        for(var y = 0; y < height; y++) {
            newImage[x][y] = inverseDiscreteFourierTransform(complexImage, x, y);
            console.log(`Finished pixel(${x}, ${y})`)
        }
    }
    return newImage;
}