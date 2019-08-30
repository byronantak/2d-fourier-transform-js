function generateCheckerboardAsArray(width, height) {
    buffer = new Array(width);
    for(var x = 0; x < height; x++) {
        buffer[x] = new Array(height);
        for(var y = 0; y < width; y++) {
            buffer[x][y] = new Array(3)
            color = generateRGB(x, y)
            buffer[x][y][0] = color.red;           // some R value [0, 255]
            buffer[x][y][1] = color.green;           // some G value
            buffer[x][y][2] = color.blue;           // some B value
        }
    }
    return buffer;
}

function convertToClampedArray(image) {
    var width = image.length;
    var height = image[0].length;
    buffer = new Uint8ClampedArray(width * height * 4); 
    for(var y = 0; y < height; y++) {
        for(var x = 0; x < width; x++) {
            var bufferIndex = (y * width + x) * 4;
            color = generateRGB(x, y)
             // position in buffer based on x and y
            buffer[bufferIndex] = image[x][y][0];           // some R value [0, 255]
            buffer[bufferIndex + 1] = image[x][y][1];           // some G value
            buffer[bufferIndex + 2] = image[x][y][2];           // some B value
            buffer[bufferIndex + 3] = 255;           // set alpha channel
        }
    }
    return buffer;
}

function generateCheckerboardArray(width, height) {
    buffer = new Uint8ClampedArray(width * height * 4); 
    for(var y = 0; y < height; y++) {
        for(var x = 0; x < width; x++) {
            var bufferIndex = (y * width + x) * 4;
            color = generateRGB(x, y)
             // position in buffer based on x and y
            buffer[bufferIndex] = color.red;           // some R value [0, 255]
            buffer[bufferIndex + 1] = color.green;           // some G value
            buffer[bufferIndex + 2] = color.blue;           // some B value
            buffer[bufferIndex + 3] = 255;           // set alpha channel
        }
    }
    return buffer;
}

function generateRGB(x, y) {
    var color = {
        red: 0,
        green: 0,
        blue: 0
    }
    var result = (x * y + x + y) % 4;
    switch(result) {
        case 0:
            color.red = 255;
        case 1:
            color.green = 255;
        case 2:
            color.blue = 255;
    }
    return color;
}

function writeImage(width, height, imageData, imageId) {
    var myImage = document.getElementById(imageId);
    // create off-screen canvas element
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = width
    canvas.height = height;
    // create imageData object
    var idata = context.createImageData(width, height);
    // set our buffer as source
    idata.data.set(imageData);
    // update canvas with new data
    context.putImageData(idata, 0, 0);
    var dataUri = canvas.toDataURL(); // produces a PNG file
    myImage.src = dataUri
}

function getGrayScaleImage(image) {
    var width = image.length;
    var height = image[0].length;
    newImage = new Array(width);
    for(var x = 0; x < height; x++) {
        newImage[x] = new Array(height);
        for(var y = 0; y < width; y++) {
             newImage[x][y] = (image[x][y][0] + image[x][y][1] + image[x][y][2]) / 3;
        }
    }
    return newImage;
}

function convertGrayScaleToRgb(image) {
    var width = image.length;
    var height = image[0].length;
    newImage = new Array(width);
    for(var x = 0; x < height; x++) {
        newImage[x] = new Array(height);
        for(var y = 0; y < width; y++) {
            newImage[x][y] = new Array(3);
             newImage[x][y][0] = image[x][y];
             newImage[x][y][1] = image[x][y];
             newImage[x][y][2] = image[x][y];
        }
    }
    return newImage;
}
