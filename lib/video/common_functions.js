exports.split = function(input, parameters) {
	var output = input;
	if (parameters.length) {
		for (var i = 0; param = parameters[i], i < parameters.length; i++) {
			var arr_output = output.split(param.splitter);

			if (arr_output.length -1 >= param.index) {
				output = arr_output[param.index];
			} else {
				throw new Error('TSJ Error! Index out of range! \n Index attempting to access: ' + param.index + '. \n Array length is: ' + arr_output.length);
			}
		};
	}
	return output;
}  