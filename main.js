function doFourierTransformsOnImage(imageArray) {
    let width = imageArray.length;
    let height = imageArray[0].length;

    let clampedArray = convertToClampedArray(imageArray);
    let grayImage = getGrayScaleImage(imageArray);
    let clampedGray = convertToClampedArray(convertGrayScaleToRgb(grayImage));
    writeImage(width, height, clampedArray, 'img-display');
    writeImage(width, height, clampedGray, 'img-display-gray');

    let fourierTransformImage = doDiscreteFourierTransform(grayImage);
    let fourierMagnitudes = getMagnitudes(fourierTransformImage);
    fourierMagnitudes = doMagnitudeScaling(fourierMagnitudes);
    let fourierMagnitudesClamped = convertToClampedArray(convertGrayScaleToRgb(fourierMagnitudes));
    writeImage(width, height, fourierMagnitudesClamped, 'img-display-ft');

    let fourierMagnitudesRotated = do180RotationForEachQuadrant(fourierMagnitudes);
    let fourierMagnitudesClampedRotated = convertToClampedArray(convertGrayScaleToRgb(fourierMagnitudesRotated));
    writeImage(width, height, fourierMagnitudesClampedRotated, 'img-display-ft-rotated');

    let phaseFourierResult = getPhase(fourierTransformImage);
    let phaseFourierResultClamped = convertToClampedArray(convertGrayScaleToRgb(phaseFourierResult));
    writeImage(width, height, phaseFourierResultClamped, 'img-display-ft-phase');

    let phaseFourierResultRotated = do180RotationForEachQuadrant(phaseFourierResult);
    let fourierPhaseClampedRotated = convertToClampedArray(convertGrayScaleToRgb(phaseFourierResultRotated));
    writeImage(width, height, fourierPhaseClampedRotated, 'img-display-ft-phase-rotated');

    let inverseFourierResult = doInverseDiscreteFourierTransform(fourierTransformImage);
    let inverseFourierResultClamped = convertToClampedArray(convertGrayScaleToRgb(inverseFourierResult));
    writeImage(width, height, inverseFourierResultClamped, 'img-display-inverse');

}

function fileUploaded() {
    let previewImage = document.querySelector('img');
    let file = document.querySelector('input[type=file]').files[0];
    let reader = new FileReader();

    reader.onloadend = function () {
        previewImage.src = reader.result.toString();
    };

    if (file) {
        reader.readAsDataURL(file);
    } else {
        previewImage.src = "";
    }
}

function transform() {
    let pixelData = getPixelData('my-img');
    console.log(pixelData);
    let width = pixelData.length;
    let height = pixelData[0].length;
    if (width != height) {
        alert(`Please use a square image. Image provided is ${width} x ${height}`);
    }
    else {
        doFourierTransformsOnImage(pixelData);
    }
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

function fixRotationFromClampedArray(array) {
    let width = array.length;
    let height = array[0].length;
    let rotatedArray = generate2dArray(width)
    for (let x = 0; x < height; x++) {
        for (let y = 0; y < width; y++) {
            rotatedArray[y][x] = array[x][y]// some B value
        }
    }
    return rotatedArray;
}

function getPixelData(imageId) {
    let previewImage = document.querySelector(`img#${imageId}`);
    let width = previewImage.width;
    let height = previewImage.height;
    console.log(previewImage);
    let canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(previewImage, 0, 0, width, height);
    let data = canvas.getContext('2d').getImageData(0, 0, width, height).data;
    let array = fixRotationFromClampedArray(convertClampedToNormalArray(data, width, height));
    return array;
}
