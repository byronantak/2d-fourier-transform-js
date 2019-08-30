(function() {
   var myImage = document.getElementById('img-display');

	var width = 25;
	var height = 25;
	var imageArray = generateCheckerboardAsArray(width, height);
	var clampedArray = convertToClampedArray(imageArray);
	var grayImage = getGrayScaleImage(imageArray);
	var clampedGray = convertToClampedArray(convertGrayScaleToRgb(grayImage));
	writeImage(width, height, clampedArray, 'img-display');
	writeImage(width, height, clampedGray, 'img-display-gray');

	var fourierTransformImage = doDiscreteFourierTransform(grayImage);
	var fourierMagnitudes = getMagnitudes(fourierTransformImage)
	var fourierMagnitudesClamped = convertToClampedArray(convertGrayScaleToRgb(fourierMagnitudes));
	writeImage(width, height, fourierMagnitudesClamped, 'img-display-ft');

	var fourierMagnitudesRotated = do180RotationForEachQuadrant(fourierMagnitudes);
	var fourierMagnitudesClampedRotated = convertToClampedArray(convertGrayScaleToRgb(fourierMagnitudesRotated));
	writeImage(width, height, fourierMagnitudesClampedRotated, 'img-display-ft-rotated');

	var phaseFourierResult = getPhase(fourierTransformImage);
	var phaseFourierResultClamped = convertToClampedArray(convertGrayScaleToRgb(phaseFourierResult));
	writeImage(width, height, phaseFourierResultClamped, 'img-display-ft-phase');

	var phaseFourierResultRotated = do180RotationForEachQuadrant(phaseFourierResult);
	var fourierPhaseClampedRotated = convertToClampedArray(convertGrayScaleToRgb(phaseFourierResultRotated));
	writeImage(width, height, fourierPhaseClampedRotated, 'img-display-ft-phase-rotated');

	var inverseFourierResult = doInverseDiscreteFourierTransform(fourierTransformImage);
	var inverseFourierResultClamped = convertToClampedArray(convertGrayScaleToRgb(inverseFourierResult));
	writeImage(width, height, inverseFourierResultClamped, 'img-display-inverse');

})();
