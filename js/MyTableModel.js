/**
 * MyTableModel
 * TableModel para ser usado em conjuto com o componente JsTable
 */
var MyTableModel = function(data) {
	this.data = data;
	
	this.getData = function(row, col) {
	  var obj = this.data[row], columns, value = "";
		
	  columns = [
		  obj.id,
			obj.codigo,
		  obj.versao,
		  obj.descricao
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
		return this.data.length;
	};
	
	this.getRawData = function() {
		return this.data;
	};
	
	this.getColumns = function() {
	  return [
			{
				className: 'check',
				text: '&nbsp;',
				sort: false,
				cellHeaderRenderer: function(cell, columnNumber) {
					return '<th><input type="checkbox" id="produtoIds" onclick="Index.setSelectedAll(this)" /></th>';
				},
				columnRenderer: function(row, col, model) {
					var obj = model.getObject(row), checked = '';
					if(obj.selected) {
						checked = 'checked="checked"';
					}
					return '<td><input type="checkbox" name="produtoIds" onclick="Index.setSelected(' + row + ')" value="' + obj.id + '" ' + checked + ' /></td>';
				}
			},
			{className:'codigo', text:'Código'}, 
			{
				className: 'versao', 
				text: 'Versão',
				cellHeaderRenderer: function(cell, columnNumber) {
					return '<th class="sortby-' + cell.className + ' column-' + columnNumber + '"><acronym title="' + cell.text + '">V</acronym></th>';
				}
			}, 
			{className:'descricao', text:'Descrição'}, 
			{
				className:'acoes', 
				text:'Ações',
				sort: false,
				columnRenderer: function(row, col, model) {
					var obj = model.getObject(row),
					    cellString = "<td>";
					cellString += '<a href="#duplicar-id-' + obj.id + '">Duplicar</a> ';
					if(!obj.readonly) {
						cellString += '| <a href="#deletar-id-' + obj.id + '">Deletar</a>';
					}
					cellString += "</td>";
					return cellString;
				}
			}
		];
	};
	
}