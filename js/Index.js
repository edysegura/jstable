/**
 * Index.js
 * Script para teste do JsTable.js
 */
var Index = {

	init: function() {
		Index.showTableProdutos();
		Index.showTableProdutosAdvance();
		Index.showTableDespesa();
	},
	
	
	showTableProdutos: function() {
		var tableProduto = new JsTable ({
			tableId: 'produtos',
			classNames: 'report',
			actionInputSearch: Index.searchProduto,
			itemsPerPage: 2
		});
		
		tableProduto.setTableModel(Index.getProdutoTableModel());
		tableProduto.showTable();
	},
	
	
	showTableProdutosAdvance: function() {
		var tableCCusto = new JsTable ({
			tableId: 'ccusto',
			itemsPerPage: 2
		});
		
		tableCCusto.setTableModel(new MyTableModel(cache));
		tableCCusto.showTable();
	},

	
	showTableDespesa: function() {
		var tableDespesa = new JsTable ({
			tableId: 'despesa',
			actionInputSearch: Index.searchDespesa,
			itemsPerPage: 8
		});
		
		tableDespesa.setTableModel(new DespesaTableModel(cacheDespesa));
		tableDespesa.setFooterRenderer(Index.getFooter);
		tableDespesa.showTable();
	},

	
	getFooter: function() {
		var footer = '<tfoot>', model = this.model;
		footer += 
			'<tr>'
				+ '<td colspan="5">&nbsp;</td>'
				+ '<td class="label-total">Total Geral</td>'
				+ '<td class="number">' + model.getTotal(6) + '</td>'
				+ '<td colspan="2">&nbsp;</td>'
		+ '</tr>'
		footer += '</tfoot>'
		return footer;
	},
	
	
	getProdutoTableModel: function() {
		var tableModel = new JsDefaultTableModel (
			CacheProduto.columns,
			CacheProduto.tableData
		);
		return tableModel;
	},
	
	setSelectedAll: function(inputCheck) {
		for(var index in cache) {
			cache[index].selected = inputCheck.checked;
		}
		Index.setInputsChecked(inputCheck);
	},
	
	setInputsChecked: function(inputCheck) {
		var table = $(inputCheck).parents('table').get(0);
		if(table) {
			$('input[name=produtoIds]', table).each(function() {
				this.checked = inputCheck.checked;
			});
		}
	},
	
	setSelected: function(row) {
		cache[row].selected = !cache[row].selected;
	},
	
	searchDespesa: function(e, jsTable, input) {
		if(e.keyCode == 13) {
			var text = input.value, data;
			var rawData = cacheDespesa;
			var newData = [];
			var pattern = new RegExp(text, "gi");
			
			for(var i=0; i<rawData.length; i++) {
				data = rawData[i];
				
				codigo  = data.codigo;
				projeto = data.nomeProjeto;
				
				if(pattern.test(codigo) || pattern.test(projeto)) {
					newData.push(data);
				}
				
			}
			
			if(newData.length < rawData.length) {
				newData.totalOfAll = rawData.length;
			}
			
			jsTable.setTableModel(new DespesaTableModel(newData));
			jsTable.showTable();
		}
	},
	
	searchProduto: function(e, jsTable, input) {
		if(e.keyCode == 13) {
			var text = input.value, data;
			var rawData = CacheProduto.tableData;
			var newData = [];
			var pattern = new RegExp(text, "gi");
			
			for(i=0; i<rawData.length; i++) {
				data = rawData[i];
				
				codigo = data[0];
				descricao = data[2];
				
				if(pattern.test(codigo) || pattern.test(descricao)) {
					newData.push(data);
				}
				
			}
			
			if(newData.length < rawData.length) {
				newData.totalOfAll = rawData.length;
			}
			
			jsTable.setTableModel(new JsDefaultTableModel (
				CacheProduto.columns,
				newData
			));
			
			jsTable.showTable();
		}
	}
	
};

//inicializacao
window.onload = Index.init;