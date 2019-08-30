function generateCheckerboardAsArray(width, height) {
    let buffer = new Array(width);
    for (let x = 0; x < height; x++) {
        buffer[x] = new Array(height);
        for (let y = 0; y < width; y++) {
            buffer[x][y] = new Array(3);
            let color = generateRGB(x, y);
            buffer[x][y][0] = color.red;           // some R value [0, 255]
            buffer[x][y][1] = color.green;           // some G value
            buffer[x][y][2] = color.blue;           // some B value
        }
    }
    return buffer;
}

function convertToClampedArray(image) {
    let width = image.length;
    let height = image[0].length;
    let buffer = new Uint8ClampedArray(width * height * 4);
    for (let x = 0; x < height; x++) {
        for (let y = 0; y < width; y++) {
            let bufferIndex = (x * width + y) * 4;
            // position in buffer based on x and y
            buffer[bufferIndex] = image[y][x][0];           // some R value [0, 255]
            buffer[bufferIndex + 1] = image[y][x][1];           // some G value
            buffer[bufferIndex + 2] = image[y][x][2];           // some B value
            buffer[bufferIndex + 3] = 255;           // set alpha channel
        }
    }
    return buffer;
}

function convertClampedToNormalArray(clampedArray, expectedWidth, expectedHeight) {
    let width = expectedWidth;
    let height = expectedHeight;
    let image = new Array(width);
    for (let x = 0; x < height; x++) {
        image[x] = new Array(width);
        for (let y = 0; y < width; y++) {
            image[x][y] = new Array(3);
            let bufferIndex = (x * width + y) * 4;
            image[x][y][0] = clampedArray[bufferIndex];
            image[x][y][1] = clampedArray[bufferIndex + 1];
            image[x][y][2] = clampedArray[bufferIndex + 2];
        }
    }
    return image;
}

function generateCheckerboardArray(width, height) {
    let buffer = new Uint8ClampedArray(width * height * 4);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let bufferIndex = (y * width + x) * 4;
            let color = generateRGB(x, y);
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
    let color = {
        red: 0,
        green: 0,
        blue: 0
    };
    let result = (x * y + x + y) % 4;
    switch (result) {
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
    let myImage = document.getElementById(imageId);
    // create off-screen canvas element
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    // create imageData object
    let idata = context.createImageData(width, height);
    // set our buffer as source
    idata.data.set(imageData);
    // update canvas with new data
    context.putImageData(idata, 0, 0);
    myImage.src = canvas.toDataURL()
}

function getGrayScaleImage(image) {
    let width = image.length;
    let height = image[0].length;
    let newImage = new Array(width);
    for (let x = 0; x < height; x++) {
        newImage[x] = new Array(height);
        for (let y = 0; y < width; y++) {
            if (image[x][y] instanceof Array) {
                newImage[x][y] = (image[x][y][0] + image[x][y][1] + image[x][y][2]) / 3;
            }
            else {
                newImage[x][y] = image[x][y];
            }
        }
    }
    return newImage;
}

function convertGrayScaleToRgb(image) {
    let width = image.length;
    let height = image[0].length;
    let newImage = new Array(width);
    for (let x = 0; x < height; x++) {
        newImage[x] = new Array(height);
        for (let y = 0; y < width; y++) {
            newImage[x][y] = new Array(3);
            newImage[x][y][0] = image[x][y];
            newImage[x][y][1] = image[x][y];
            newImage[x][y][2] = image[x][y];
        }
    }
    return newImage;
}
