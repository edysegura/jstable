/**
 * JsDefaultTableModel
 * TableModel para ser usado em conjuto com o componente JsTable
 */
var JsDefaultTableModel = function(columns, data) {
	this.columns = columns;
	this.data = data;
	
	this.getData = function(row, col) {
		return this.data[row][col];
	};
	
	this.getNumRows = function() {
		return this.data.length;
	};
	
	this.getNumCols = function() {
		return this.data.length;
	};
	
	this.getRawData = function() {
		return this.data;
	};
	
	this.getColumns = function() {
	  return this.columns;
	};
	
}