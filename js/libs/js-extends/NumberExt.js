/**
 *
 * Extendendo o objeto Number do javascript
 * http://jscomponentes.googlecode.com/svn/trunk/JSExtends/js/JSExtends/Number-extend.js
 *
 * @author: Edy Segura - edy@segura.pro.br
 *
 */


/**
 *
 * Verifica se o numero e um inteiro
 * @author Edy Segura
 *
 */
Number.prototype.isInt = function() {
 var value = parseInt(this);
 if(isNaN(value)) return false;
 return (this == value && this.toString() == value.toString());
}


/**
 *
 * Formata o numero com o padrao especificado
 * Precisa da implementacao do metodo String.pad()
 * em JSExtend/String-extend.js
 *
 * exemplo:
 * 	var numero = 2195440.3517;
 * 	alert(numero.numberFormat(2, ",", ".")); //exibe: "2.195.440,35";
 *
 * http://forum.imasters.uol.com.br/index.php?showtopic=144107
 * @author Carlos R. L. Rodrigues, editador por Edy Segura - edy@segura.pro.br
 *
 */
Number.prototype.numberFormat = function(fractionNumber, fractionSeparator, thousandSeparator) {
  var fractionNumber    = fractionNumber    || 0;
  var fractionSeparator = fractionSeparator || ".";
  var thousandSeparator = thousandSeparator || ",";

  if((typeof fractionNumber != "number")
    || (typeof fractionSeparator != "string")
    || (typeof thousandSeparator != "string")) {
    throw new Error("Wrong parameters for Number.numberFormat() method.");
  }

  var integer = "", decimal = "";
  var number = new String(this).split(/\./), numberLength = number[0].length, i = 0;

	if (fractionNumber > 0) {
    number[1] = (typeof number[1] != "undefined") ? number[1].substr(0, fractionNumber) : "";
    decimal = fractionSeparator.concat(number[1].pad(fractionNumber, "0", String.PAD_RIGHT));
  }

  while (numberLength > 0) {
    if ((++i % 3 == 1) && (numberLength != number[0].length)) {
      integer = thousandSeparator.concat(integer);
    }
    integer = number[0].substr(--numberLength, 1).concat(integer);
  }

  return (integer + decimal);
}


/**
 *
 * Adiciona zeros à esquerda ou à direita em um número
 * Number.zeroFormat(n: Integer, [fill: Boolean = false], [right: Boolean = false]): String
 *
 * var N = 123;
 * N.zeroFormat(5, true, true) = 12300
 * N.zeroFormat(5, true) = 00123
 * N.zeroFormat(5) = 00000123
 *
 * http://jsfromhell.com/number/zero-format
 * @author Carlos R. L. Rodrigues, editador por Edy Segura - edy@segura.pro.br
 *
 */
Number.prototype.zeroFormat = function(n, f, r){
    return n = new Array((++n, f ? (f = (this + "").length) < n ? n - f : 0 : n)).join(0), r ? this + n : n + this;
};
