/**
 * JsSorter
 * Componente com critérios de ordenação
 */
var JsSorter = {

	sortByFormatNumber: function(columnName, columnNumber, model, factor) {
		var rawData = model.getRawData(), result, valor1, valor2;
		rawData.sort(function(a, b) {
			valor1 = JsSorter.parseNumber(a[columnNumber] || a[columnName]);
			valor2 = JsSorter.parseNumber(b[columnNumber] || b[columnName]);
			result = JsSorter.sortNumber(valor1, valor2);
			return result * factor;
		});
	},
	
	sortOnlyNumber: function(columnName, columnNumber, model, factor) {
		var rawData = model.getRawData(), result, valor1, valor2;
		rawData.sort(function(a, b) {
			valor1 = parseFloat(a[columnNumber] || a[columnName]);
			valor2 = parseFloat(b[columnNumber] || b[columnName]);
			result = JsSorter.sortNumber(valor1, valor2);
			return result * factor;
		});
	},
	
	/**
	 * Faz comparação entre duas datas.
	 * Formatos aceito: dd/MM/yyyy e MM/yyyy
	 * 
	 */
	sortByDate: function(columnName, columnNumber, model, factor) {
		var rawData = model.getRawData(), result, date1, date2, string1, string2;
		rawData.sort(function(a, b) {
			string1 = a[columnNumber] || a[columnName];
			string2 = b[columnNumber] || b[columnName];
			date1 = JsSorter.strToDate(string1); 
			date2 = JsSorter.strToDate(string2);
			
			if(date1 > date2) {
				return 1 * factor;
			}
			else if(date1 < date2) {
				return -1 * factor;
			}
			return JsSorter.checkIsSpace(string1, string2) * factor;
		});
	},
	
	checkIsSpace: function(a, b) {
		if(a == "" && b != "") {
			return 1;
		}
		else if(a != "" && b == "") {
			return -1;
		}
		return 0;
	},
	
	sortNumber: function(a, b) {
		if(isNaN(a) && !isNaN(b)) {
			return 1;
		}
		else if(!isNaN(a) && isNaN(b)) {
			return -1;
		}
		return a - b;
	},
	
	parseNumber: function(valor) {
		var number;
		number = valor.replace(/\./g, "");
		number = number.replace(/\,/g, ".");
		number = number.replace(/[^0-9.-]/g, "");
		number = parseFloat(number);
		return number;
	},
	
	strToDate: function(str) {
		var data = str.split('/'), date;
		if(data.length == 3) {
			date = new Date(data[2], data[1] - 1, data[0]);
		}
		else if(data.length == 2) {
			date = new Date(data[1], data[0] - 1, 01);
		}
		
		return date
	},
	
	/*
	strToDate: function(str) {
			var data = str.split('/'), date;
			if(data.length == 3) {
					var yhms = data[2].split(' ');
					if(yhms.length==2){
							var ano = yhms[0];
							var hms = yhms[1].split(':');
							if(hms.length==3){
									date = new Date(ano, data[1] - 1, data[0],hms[0],hms[1],hms[2]);
							}
					}
					if(yhms.length==1){
							date = new Date(data[2], data[1] - 1, data[0]);    
					}
			}
			else if(data.length == 2) {
					date = new Date(data[1], data[0] - 1, 01);
			}
			
			return date
	}
	*/

};