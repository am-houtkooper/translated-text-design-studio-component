// INDEPENDENTDEVELOPMENT:
//function TranslatedText() {
 sap.designstudio.sdk.Component.subclass("nl.uva.data.translatedtext.UvADataTranslatedText", function () {
	var that = this;

	var customComponent_language = "EN";
	var customComponent_phrase = "PHRASE_EXAMPLE";

	var customComponent_data;
	var customComponent_translations = {
		"EN": {
			"PHRASE_EXAMPLE": "Translated text will be displayed here."
		},
		"NL": {
			"PHRASE_EXAMPLE": "Vertaalde tekst wordt hier getoond."
		}
	};

	var customComponent_metadata = undefined;

	function initDevContainer() {
		dev_container = document.body.appendChild(document.createElement("div"));
		var height = 100;
		var width = 600;
		dev_container.style.height = height;
		dev_container.style.width = width;
	}

	function getContainerElement() {
		// INDEPENDENTDEVELOPMENT:
		 return that.$()[0];
//		return dev_container;
	}
	
	this.init = function () {
		// INDEPENDENTDEVELOPMENT:
//		initDevContainer();
		var containerElement = getContainerElement();
		containerElement.className += " UvADataTranslatedText_container";
		containerElement.appendChild(document.createTextNode("..."));

		// Render the default values.
		drawCustomComponent();
	};

	this.afterUpdate = function () {
		drawCustomComponent();
	};

	function drawCustomComponent() {
		if (customComponent_translations) {
			var containerElement = getContainerElement();
			var phraseElement;

			if (customComponent_translations[customComponent_language] === undefined || customComponent_translations[customComponent_language][customComponent_phrase] === undefined) {
				var errorMessage;
				if (customComponent_translations[customComponent_language] === undefined) {
					errorMessage = "No data for language '" + customComponent_language + "'";
				}	
				else {
					errorMessage = "No data for phrase '" + customComponent_phrase + "' in language '" + customComponent_language + "'";
				}

				phraseElement = document.createElement("span");
				phraseElement.setAttribute("class", "error");
				phraseElement.appendChild(document.createTextNode(errorMessage));
			} else {
				phraseValue = customComponent_translations[customComponent_language][customComponent_phrase];
				phraseElement = document.createTextNode(phraseValue);
			}

			containerElement.replaceChild(phraseElement, containerElement.firstChild);
		}
	};

	this.language = function (value) {
		if (value === undefined) {
			return customComponent_language;
		}
		else {
			customComponent_language = value;
		}
	};

	this.phrase = function (value) {
		if (value === undefined) {
			return customComponent_phrase;
		}
		else {
			customComponent_phrase = value;
		}
	};

	this.data = function (resultSet) {
		if (resultSet === undefined) {
			return customComponent_data;
		}
		else {
			customComponent_data = resultSet;

			// It is assumed to be chopped up into chunks of max 60 characters each.
			// These chunks are concatenated and stored for drawing.
			customComponent_translations = [];

			var previousDataKey = undefined;

			// Keeps all items in chunked form.
			var chunkedItems = [[]];

			for (var i = 0; i < resultSet["axis_rows"].length; i++) {
				var valueIndexRow = resultSet["axis_rows"][i];

				var languageIndex = valueIndexRow[0];
				var languageValue = resultSet["dimensions"][0]["members"][languageIndex]["text"];
				var phraseIndex = valueIndexRow[1];
				var phraseValue = resultSet["dimensions"][1]["members"][phraseIndex]["text"];
				var chunkSequenceIndex = valueIndexRow[2];
				var chunkSequenceValue = resultSet["dimensions"][2]["members"][chunkSequenceIndex]["text"];
				var chunkTextIndex = valueIndexRow[3];
				var chunkTextValue = resultSet["dimensions"][3]["members"][chunkTextIndex]["text"];

				// Add the chunk to the chunked items.
				if (customComponent_translations[languageValue] === undefined) {
					customComponent_translations[languageValue] = {};
				}

				if (customComponent_translations[languageValue][phraseValue] === undefined) {
					customComponent_translations[languageValue][phraseValue] = "";
				}

				customComponent_translations[languageValue][phraseValue] += chunkTextValue;
			}

			return this;
		}
	};

	this.metadata = function (value) {
		if (value === undefined) {
			return customComponent_metadata;
		}
		else {
			customComponent_metadata = value;

			return this;
		}
	};
// INDEPENDENTDEVELOPMENT:
//}
 });
