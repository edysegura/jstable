/**
 * MyTableModel
 * TableModel para ser usado em conjuto com o componente JsTable
 */
var DespesaTableModel = function(data) {
	this.data = data;
	
	this.getData = function(row, col) {
	  var obj = this.data[row], columns, value = "";
		
	  columns = [
		  obj.codigo,
		  obj.data,
		  obj.nomeProjeto,
		  obj.nomeItemCusto,
		  obj.nome,
		  obj.quantidade,
		  obj.valor,
		  obj.nomeTipoRecurso,
		  obj.idAtividade,
		  obj.avanco
		];
		
		try {
			value = columns[col];
		}
		catch(e) {
			value = obj;
		}
		
		return value;
	};
	
	this.getObject = function(row) {
		return this.data[row];
	};
	
	this.getNumRows = function() {
		return this.data.length;
	};
	
	this.getNumCols = function() {
		return this.getColumns().length;
	};
	
	this.getRawData = function() {
		return this.data;
	};
	
	this.getTotal = function(columnNumber) {
		var total = 0, valor;
		for(var i=0, leng = this.getNumRows(); i<leng; i++) {
			valor = this.getData(i, columnNumber).toString().currencyToFloat();
			if(valor != '' && !isNaN(valor)) {
				total += valor;
			}
		}
		return total.numberFormat(2, ",", ".");
	};
	
	this.getColumns = function() {
	  return [
			{className:'codigo', text:'Código'}, 
			{className:'data', text:'Data'},
			{className:'nomeProjeto', text:'Nome Projeto'},
			{className:'nomeItemCusto', text:'Item Custo'},    
			{className:'nome', text:'Nome'},
			{className:'quantidade', text:'Quantidade'},
			{
				className: 'valor', 
				text: 'Valor',
				sortBy: JsSorter.sortByFormatNumber,
				columnRenderer: function(row, col, model) {
					var data = model.getData(row, col);
					return '<td class="number">' + data + '</td>';
				}
			},
			{visible: false, className:'nomeTipoRecurso', text:'Tipo Recurso'},
			{className:'idAtividade', text:'Atividade'},
			{className:'avanco', text:'Avanço'},
		];
	};
	
};