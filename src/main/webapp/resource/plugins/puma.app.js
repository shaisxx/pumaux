/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * I fixed the jQuery 1.9 $.browser property removed issue, by changing the code $.browser.msie to (document.documentMode != undefined), since documentMode is only available on IE browsers. Hope this helps someone else.
 * Great plugin by the way, I been using it for a while.
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}document.documentMode != undefined&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);
$.ismozilla = /firefox/.test(navigator.userAgent.toLowerCase());
$.iswebkit = /webkit/.test(navigator.userAgent.toLowerCase());
$.isopera = /opera/.test(navigator.userAgent.toLowerCase());
$.ismsie = /msie/.test(navigator.userAgent.toLowerCase());
/*
 * MAP对象，实现MAP功能
 *
 * 接口：
 * size()     获取MAP元素个数
 * isEmpty()    判断MAP是否为空
 * clear()     删除MAP所有元素
 * put(key, value)   向MAP中增加元素（key, value) 
 * remove(key)    删除指定KEY的元素，成功返回True，失败返回False
 * get(key)    获取指定KEY的元素值VALUE，失败返回NULL
 * element(index)   获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
 * containsKey(key)  判断MAP中是否含有指定KEY的元素
 * containsValue(value) 判断MAP中是否含有指定VALUE的元素
 * values()    获取MAP中所有VALUE的数组（ARRAY）
 * keys()     获取MAP中所有KEY的数组（ARRAY）
 *
 * 例子：
 * var map = new Map();
 *
 * map.put("key", "value");
 * var val = map.get("key")
 * ……
 *
 */
function Map(){this.elements=new Array();this.size=function(){return this.elements.length;};this.isEmpty=function(){return(this.elements.length<1);};this.clear=function(){this.elements=new Array();};this.put=function(_key,_value){this.elements.push({key:_key,value:_value});};this.remove=function(_key){var bln=false;try{for(i=0;i<this.elements.length;i++){if(this.elements[i].key==_key){this.elements.splice(i,1);return true;}}}catch(e){bln=false;}return bln;};this.get=function(_key){try{for(i=0;i<this.elements.length;i++){if(this.elements[i].key==_key){return this.elements[i].value;}}}catch(e){return null;}};this.element=function(_index){if(_index<0||_index>=this.elements.length){return null;}return this.elements[_index];};this.containsKey=function(_key){var bln=false;try{for(i=0;i<this.elements.length;i++){if(this.elements[i].key==_key){bln=true;}}}catch(e){bln=false;}return bln;};this.containsValue=function(_value){var bln=false;try{for(i=0;i<this.elements.length;i++){if(this.elements[i].value==_value){bln=true;}}}catch(e){bln=false;}return bln;};this.values=function(){var arr=new Array();for(i=0;i<this.elements.length;i++){arr.push(this.elements[i].value);}return arr;};this.keys=function(){var arr=new Array();for(i=0;i<this.elements.length;i++){arr.push(this.elements[i].key);}return arr;};}

/**
 * jquery form to json
 * */
(function($){
	$.fn.serializeJson=function(){
	var serializeObj={};
	var array=this.serializeArray();
	var str=this.serialize();
	$(array).each(function(){
	if(serializeObj[this.name]){
	if($.isArray(serializeObj[this.name])){
	serializeObj[this.name].push(this.value);
	}else{
	serializeObj[this.name]=[serializeObj[this.name],this.value];
	}
	}else{
	serializeObj[this.name]=this.value;
	}
	});
	return serializeObj;
	};
	})(jQuery);
/**!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function raw(s) {
		return s;
	}

	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}

	function converted(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		try {
			return config.json ? JSON.parse(s) : s;
		} catch(er) {}
	}

	var config = $.cookie = function (key, value, options) {

		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [
				config.raw ? key : encodeURIComponent(key),
				'=',
				config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		var result = key ? undefined : {};
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = decode(parts.join('='));

			if (key && key === name) {
				result = converted(cookie);
				break;
			}

			if (!key) {
				result[name] = converted(cookie);
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== undefined) {
			$.cookie(key, '', $.extend(options, { expires: -1 }));
			return true;
		}
		return false;
	};

}));

/**
 *                   Dependencies for ajax form   
 *
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 *
 * Feature detection
 */
var feature = {};
feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
feature.formdata = window.FormData !== undefined;

$.fn.formToLabelArray = function(semantic, elements) {
    var a = [];
    if (this.length === 0) {
        return a;
    }

    var form = this[0];
    var els = semantic ? form.getElementsByTagName('*') : form.elements;
    if (!els) {
        return a;
    }
    var i,j,n,v,el,max,jmax,label;
    for(i=0, max=els.length; i < max; i++) {
        el = els[i];
        n = el.name;
        label = $(el).attr("data-label");
        if (!n) {
            continue;
        }

        v = $.fieldValueAndLabel(el, true);
        if (v && v.constructor == Array) {
            if (elements) 
                elements.push(el);
            for(j=0, jmax=v.length; j < jmax; j++) {
            	if(v[j]['value'].length > 0){
            		a.push({name: n, value: v[j]['value'], label:label, labelValue:v[j]['label']});
            	}
            }
        }
        else if (v !== null && typeof v != 'undefined') {
            if (elements) 
                elements.push(el);
            if(v['value'].length > 0){
            	a.push({name: n, value: v['value'], type: el.type, required: el.required, label:label, labelValue:v['label']});
            }
        }
    }

    if (!semantic && form.clk) {
        // input type=='image' are not found in elements array! handle it here
        var $input = $(form.clk), input = $input[0];
        n = input.name;
        if (n && !input.disabled && input.type == 'image') {
        	if($input.val().length > 0){
        		a.push({name: n, value: $input.val(), label:label, labelValue:$input.attr("data-value-text")});
                a.push({name: n+'.x', value: form.clk_x, label:label, labelValue:$input.attr("data-value-text")}, {name: n+'.y', value: form.clk_y, label:label, labelValue:$input.attr("data-value-text")});
        	}
        }
    }
    return a;
};

$.fn.formToArray = function(semantic, elements) {
    var a = [];
    if (this.length === 0) {
        return a;
    }

    var form = this[0];
    var els = semantic ? form.getElementsByTagName('*') : form.elements;
    if (!els) {
        return a;
    }

    var i,j,n,v,el,max,jmax;
    for(i=0, max=els.length; i < max; i++) {
        el = els[i];
        n = el.name;
        if (!n) {
            continue;
        }

        if (semantic && form.clk && el.type == "image") {
            // handle image inputs on the fly when semantic == true
            if(!el.disabled && form.clk == el) {
                a.push({name: n, value: $(el).val(), type: el.type });
                a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
            }
            continue;
        }

        v = $.fieldValue(el, true);
        if (v && v.constructor == Array) {
            if (elements) 
                elements.push(el);
            for(j=0, jmax=v.length; j < jmax; j++) {
                a.push({name: n, value: v[j]});
            }
        }
        else if (feature.fileapi && el.type == 'file' && !el.disabled) {
            if (elements) 
                elements.push(el);
            var files = el.files;
            if (files.length) {
                for (j=0; j < files.length; j++) {
                    a.push({name: n, value: files[j], type: el.type});
                }
            }
            else {
                // #180
                a.push({ name: n, value: '', type: el.type });
            }
        }
        else if (v !== null && typeof v != 'undefined') {
            if (elements) 
                elements.push(el);
            a.push({name: n, value: v, type: el.type, required: el.required});
        }
    }

    if (!semantic && form.clk) {
        // input type=='image' are not found in elements array! handle it here
        var $input = $(form.clk), input = $input[0];
        n = input.name;
        if (n && !input.disabled && input.type == 'image') {
            a.push({name: n, value: $input.val()});
            a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
        }
    }
    return a;
};

$.fn.fieldValue = function(successful) {
    for (var val=[], i=0, max=this.length; i < max; i++) {
        var el = this[i];
        var v = $.fieldValue(el, successful);
        if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
            continue;
        }
        if (v.constructor == Array)
            $.merge(val, v);
        else
            val.push(v);
    }
    return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValueAndLabel = function(el, successful) {
    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
    if (successful === undefined) {
        successful = true;
    }

    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
        (t == 'checkbox' || t == 'radio') && !el.checked ||
        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
        tag == 'select' && el.selectedIndex == -1)) {
            return null;
    }

    if (tag == 'select') {
        var index = el.selectedIndex;
        if (index < 0) {
            return null;
        }
        var a = [], ops = el.options;
        var one = (t == 'select-one');
        var max = (one ? index+1 : ops.length);
        for(var i=(one ? index : 0); i < max; i++) {
            var op = ops[i];
            if (op.selected) {
                var v = op.value;
                if (!v) { // extra pain for IE...
                    v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
                }
                if (one) {
                	if(v.length>0){
                		return {label:op.text,value:v};
                	}
                }
                if(v.length>0){
                	a.push({label:op.text,value:v});
                }
            }
        }
        return a;
    }
    if($(el).val().length > 0){
    	var ll = $(el).attr("data-value-text")?$(el).attr("data-value-text"):$(el).val();
        return {label:ll,value:$(el).val()};
    }
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
    var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
    if (successful === undefined) {
        successful = true;
    }

    if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
        (t == 'checkbox' || t == 'radio') && !el.checked ||
        (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
        tag == 'select' && el.selectedIndex == -1)) {
            return null;
    }

    if (tag == 'select') {
        var index = el.selectedIndex;
        if (index < 0) {
            return null;
        }
        var a = [], ops = el.options;
        var one = (t == 'select-one');
        var max = (one ? index+1 : ops.length);
        for(var i=(one ? index : 0); i < max; i++) {
            var op = ops[i];
            if (op.selected) {
                var v = op.value;
                if (!v) { // extra pain for IE...
                    v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
                }
                if (one) {
                    return v;
                }
                a.push(v);
            }
        }
        return a;
    }
    return $(el).val();
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
    //hand off to jQuery.param for proper encoding
    return $.param(this.formToArray(semantic));
};

$.fn.clearForm = function(includeHidden) {
    return this.each(function() {
        $('input,select,textarea', this).clearFields(includeHidden);
    });
};
/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
    var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
    return this.each(function() {
        var t = this.type, tag = this.tagName.toLowerCase();
        if (re.test(t) || tag == 'textarea') {
            this.value = '';
        }
        else if (t == 'checkbox' || t == 'radio') {
            this.checked = false;
        }
        else if (tag == 'select') {
            this.selectedIndex = -1;
        }
        else if (includeHidden) {
            // includeHidden can be the value true, or it can be a selector string
            // indicating a special test; for example:
            //  $('#myForm').clearForm('.special:hidden')
            // the above would clean hidden inputs that have the class of 'special'
            if ( (includeHidden === true && /hidden/.test(t)) ||
                 (typeof includeHidden == 'string' && $(this).is(includeHidden)) )
                this.value = '';
        }
    });
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
    return this.each(function() {
        // guard against an input with the name of 'reset'
        // note that IE reports the reset function as an 'object'
        if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
            this.reset();
        }
    });
};


/**
 * Copyright (c)2005-2009 Matt Kruse (javascripttoolbox.com)
 * 
 * Dual licensed under the MIT and GPL licenses. 
 * This basically means you can use this code however you want for
 * free, but don't claim to have written it yourself!
 * Donations always accepted: http://www.JavascriptToolbox.com/donate/
 * 
 * Please do not link to the .js files on javascripttoolbox.com from
 * your site. Copy the files locally to your server instead.
 * 
 */
/*
Date functions

These functions are used to parse, format, and manipulate Date objects.
See documentation and examples at http://www.JavascriptToolbox.com/lib/date/

*/
Date.$VERSION = 1.02;

// Utility function to append a 0 to single-digit numbers
Date.LZ = function(x) {return(x<0||x>9?"":"0")+x};
// Full month names. Change this for local month names
Date.monthNames = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
// Month abbreviations. Change this for local month names
Date.monthAbbreviations = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
// Full day names. Change this for local month names
Date.dayNames = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
// Day abbreviations. Change this for local month names
Date.dayAbbreviations = new Array('Sun','Mon','Tue','Wed','Thu','Fri','Sat');
// Used for parsing ambiguous dates like 1/2/2000 - default to preferring 'American' format meaning Jan 2.
// Set to false to prefer 'European' format meaning Feb 1
Date.preferAmericanFormat = true;

// If the getFullYear() method is not defined, create it
if (!Date.prototype.getFullYear) { 
	Date.prototype.getFullYear = function() { var yy=this.getYear(); return (yy<1900?yy+1900:yy); } ;
} 

// Parse a string and convert it to a Date object.
// If no format is passed, try a list of common formats.
// If string cannot be parsed, return null.
// Avoids regular expressions to be more portable.
Date.parseString = function(val, format) {
	// If no format is specified, try a few common formats
	if (typeof(format)=="undefined" || format==null || format=="") {
		var generalFormats=new Array('y-M-d','MMM d, y','MMM d,y','y-MMM-d','d-MMM-y','MMM d','MMM-d','d-MMM');
		var monthFirst=new Array('M/d/y','M-d-y','M.d.y','M/d','M-d');
		var dateFirst =new Array('d/M/y','d-M-y','d.M.y','d/M','d-M');
		var checkList=new Array(generalFormats,Date.preferAmericanFormat?monthFirst:dateFirst,Date.preferAmericanFormat?dateFirst:monthFirst);
		for (var i=0; i<checkList.length; i++) {
			var l=checkList[i];
			for (var j=0; j<l.length; j++) {
				var d=Date.parseString(val,l[j]);
				if (d!=null) { 
					return d; 
				}
			}
		}
		return null;
	};

	this.isInteger = function(val) {
		for (var i=0; i < val.length; i++) {
			if ("1234567890".indexOf(val.charAt(i))==-1) { 
				return false; 
			}
		}
		return true;
	};
	this.getInt = function(str,i,minlength,maxlength) {
		for (var x=maxlength; x>=minlength; x--) {
			var token=str.substring(i,i+x);
			if (token.length < minlength) { 
				return null; 
			}
			if (this.isInteger(token)) { 
				return token; 
			}
		}
	return null;
	};
	val=val+"";
	format=format+"";
	var i_val=0;
	var i_format=0;
	var c="";
	var token="";
	var token2="";
	var x,y;
	var year=new Date().getFullYear();
	var month=1;
	var date=1;
	var hh=0;
	var mm=0;
	var ss=0;
	var ampm="";
	while (i_format < format.length) {
		// Get next token from format string
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
		}
		// Extract contents of value based on format token
		if (token=="yyyy" || token=="yy" || token=="y") {
			if (token=="yyyy") { 
				x=4;y=4; 
			}
			if (token=="yy") { 
				x=2;y=2; 
			}
			if (token=="y") { 
				x=2;y=4; 
			}
			year=this.getInt(val,i_val,x,y);
			if (year==null) { 
				return null; 
			}
			i_val += year.length;
			if (year.length==2) {
				if (year > 70) { 
					year=1900+(year-0); 
				}
				else { 
					year=2000+(year-0); 
				}
			}
		}
		else if (token=="MMM" || token=="NNN"){
			month=0;
			var names = (token=="MMM"?(Date.monthNames.concat(Date.monthAbbreviations)):Date.monthAbbreviations);
			for (var i=0; i<names.length; i++) {
				var month_name=names[i];
				if (val.substring(i_val,i_val+month_name.length).toLowerCase()==month_name.toLowerCase()) {
					month=(i%12)+1;
					i_val += month_name.length;
					break;
				}
			}
			if ((month < 1)||(month>12)){
				return null;
			}
		}
		else if (token=="EE"||token=="E"){
			var names = (token=="EE"?Date.dayNames:Date.dayAbbreviations);
			for (var i=0; i<names.length; i++) {
				var day_name=names[i];
				if (val.substring(i_val,i_val+day_name.length).toLowerCase()==day_name.toLowerCase()) {
					i_val += day_name.length;
					break;
				}
			}
		}
		else if (token=="MM"||token=="M") {
			month=this.getInt(val,i_val,token.length,2);
			if(month==null||(month<1)||(month>12)){
				return null;
			}
			i_val+=month.length;
		}
		else if (token=="dd"||token=="d") {
			date=this.getInt(val,i_val,token.length,2);
			if(date==null||(date<1)||(date>31)){
				return null;
			}
			i_val+=date.length;
		}
		else if (token=="hh"||token=="h") {
			hh=this.getInt(val,i_val,token.length,2);
			if(hh==null||(hh<1)||(hh>12)){
				return null;
			}
			i_val+=hh.length;
		}
		else if (token=="HH"||token=="H") {
			hh=this.getInt(val,i_val,token.length,2);
			if(hh==null||(hh<0)||(hh>23)){
				return null;
			}
			i_val+=hh.length;
		}
		else if (token=="KK"||token=="K") {
			hh=this.getInt(val,i_val,token.length,2);
			if(hh==null||(hh<0)||(hh>11)){
				return null;
			}
			i_val+=hh.length;
			hh++;
		}
		else if (token=="kk"||token=="k") {
			hh=this.getInt(val,i_val,token.length,2);
			if(hh==null||(hh<1)||(hh>24)){
				return null;
			}
			i_val+=hh.length;
			hh--;
		}
		else if (token=="mm"||token=="m") {
			mm=this.getInt(val,i_val,token.length,2);
			if(mm==null||(mm<0)||(mm>59)){
				return null;
			}
			i_val+=mm.length;
		}
		else if (token=="ss"||token=="s") {
			ss=this.getInt(val,i_val,token.length,2);
			if(ss==null||(ss<0)||(ss>59)){
				return null;
			}
			i_val+=ss.length;
		}
		else if (token=="a") {
			if (val.substring(i_val,i_val+2).toLowerCase()=="am") {
				ampm="AM";
			}
			else if (val.substring(i_val,i_val+2).toLowerCase()=="pm") {
				ampm="PM";
			}
			else {
				return null;
			}
			i_val+=2;
		}
		else {
			if (val.substring(i_val,i_val+token.length)!=token) {
				return null;
			}
			else {
				i_val+=token.length;
			}
		}
	}
	// If there are any trailing characters left in the value, it doesn't match
	if (i_val != val.length) { 
		return null; 
	}
	// Is date valid for month?
	if (month==2) {
		// Check for leap year
		if ( ( (year%4==0)&&(year%100 != 0) ) || (year%400==0) ) { // leap year
			if (date > 29){ 
				return null; 
			}
		}
		else { 
			if (date > 28) { 
				return null; 
			} 
		}
	}
	if ((month==4)||(month==6)||(month==9)||(month==11)) {
		if (date > 30) { 
			return null; 
		}
	}
	// Correct hours value
	if (hh<12 && ampm=="PM") {
		hh=hh-0+12; 
	}
	else if (hh>11 && ampm=="AM") { 
		hh-=12; 
	}
	return new Date(year,month-1,date,hh,mm,ss);
};

// Check if a date string is valid
Date.isValid = function(val,format) {
	return (Date.parseString(val,format) != null);
};

// Check if a date object is before another date object
Date.prototype.isBefore = function(date2) {
	if (date2==null) { 
		return false; 
	}
	return (this.getTime()<date2.getTime());
};

// Check if a date object is after another date object
Date.prototype.isAfter = function(date2) {
	if (date2==null) { 
		return false; 
	}
	return (this.getTime()>date2.getTime());
};

// Check if two date objects have equal dates and times
Date.prototype.equals = function(date2) {
	if (date2==null) { 
		return false; 
	}
	return (this.getTime()==date2.getTime());
};

// Check if two date objects have equal dates, disregarding times
Date.prototype.equalsIgnoreTime = function(date2) {
	if (date2==null) { 
		return false; 
	}
	var d1 = new Date(this.getTime()).clearTime();
	var d2 = new Date(date2.getTime()).clearTime();
	return (d1.getTime()==d2.getTime());
};

// Format a date into a string using a given format string
Date.prototype.format = function(format) {
	format=format+"";
	var result="";
	var i_format=0;
	var c="";
	var token="";
	var y=this.getYear()+"";
	var M=this.getMonth()+1;
	var d=this.getDate();
	var E=this.getDay();
	var H=this.getHours();
	var m=this.getMinutes();
	var s=this.getSeconds();
	var yyyy,yy,MMM,MM,dd,hh,h,mm,ss,ampm,HH,H,KK,K,kk,k;
	// Convert real date parts into formatted versions
	var value=new Object();
	if (y.length < 4) {
		y=""+(+y+1900);
	}
	value["y"]=""+y;
	value["yyyy"]=y;
	value["yy"]=y.substring(2,4);
	value["M"]=M;
	value["MM"]=Date.LZ(M);
	value["MMM"]=Date.monthNames[M-1];
	value["NNN"]=Date.monthAbbreviations[M-1];
	value["d"]=d;
	value["dd"]=Date.LZ(d);
	value["E"]=Date.dayAbbreviations[E];
	value["EE"]=Date.dayNames[E];
	value["H"]=H;
	value["HH"]=Date.LZ(H);
	if (H==0){
		value["h"]=12;
	}
	else if (H>12){
		value["h"]=H-12;
	}
	else {
		value["h"]=H;
	}
	value["hh"]=Date.LZ(value["h"]);
	value["K"]=value["h"]-1;
	value["k"]=value["H"]+1;
	value["KK"]=Date.LZ(value["K"]);
	value["kk"]=Date.LZ(value["k"]);
	if (H > 11) { 
		value["a"]="PM"; 
	}
	else { 
		value["a"]="AM"; 
	}
	value["m"]=m;
	value["mm"]=Date.LZ(m);
	value["s"]=s;
	value["ss"]=Date.LZ(s);
	while (i_format < format.length) {
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
		}
		if (typeof(value[token])!="undefined") { 
			result=result + value[token]; 
		}
		else { 
			result=result + token; 
		}
	}
	return result;
};

// Get the full name of the day for a date
Date.prototype.getDayName = function() { 
	return Date.dayNames[this.getDay()];
};

// Get the abbreviation of the day for a date
Date.prototype.getDayAbbreviation = function() { 
	return Date.dayAbbreviations[this.getDay()];
};

// Get the full name of the month for a date
Date.prototype.getMonthName = function() {
	return Date.monthNames[this.getMonth()];
};

// Get the abbreviation of the month for a date
Date.prototype.getMonthAbbreviation = function() { 
	return Date.monthAbbreviations[this.getMonth()];
};

// Clear all time information in a date object
Date.prototype.clearTime = function() {
  this.setHours(0); 
  this.setMinutes(0);
  this.setSeconds(0); 
  this.setMilliseconds(0);
  return this;
};

// Add an amount of time to a date. Negative numbers can be passed to subtract time.
Date.prototype.add = function(interval, number) {
	if (typeof(interval)=="undefined" || interval==null || typeof(number)=="undefined" || number==null) { 
		return this; 
	}
	number = +number;
	if (interval=='y') { // year
		this.setFullYear(this.getFullYear()+number);
	}
	else if (interval=='M') { // Month
		this.setMonth(this.getMonth()+number);
	}
	else if (interval=='d') { // Day
		this.setDate(this.getDate()+number);
	}
	else if (interval=='w') { // Weekday
		var step = (number>0)?1:-1;
		while (number!=0) {
			this.add('d',step);
			while(this.getDay()==0 || this.getDay()==6) { 
				this.add('d',step);
			}
			number -= step;
		}
	}
	else if (interval=='h') { // Hour
		this.setHours(this.getHours() + number);
	}
	else if (interval=='m') { // Minute
		this.setMinutes(this.getMinutes() + number);
	}
	else if (interval=='s') { // Second
		this.setSeconds(this.getSeconds() + number);
	}
	return this;
};


/**
 * 为Array增加方法
 * 
 * 例子：var arr = new Array();
 * 		arr.push("123");
 * 		arr.push("456");
 * 		
 * 		arr.contains("123") will return true;
 * 		arr.contains("haha") will return false;
 * 
 * @param element 要判断是否存在的对象
 * 
 * */
Array.prototype.contains = function (element) {
	for (var i = 0; i < this.length; i++) {
	if (this[i] == element) {
	return true;
	}
	}
	return false;
};

/**
 * 为控件添加ctrl+v提交表单方法
 * 
 * $("#textarea").ctrlSubmit(function(event){
   //提交代码写在这里
	});
 * 
 * 
 * */
jQuery.fn.extend({
    /**
     * ctrl+enter提交表单
     * @param {Function} fn 操作后执行的函数
     * @param {Object} thisObj 指针作用域
     */
    ctrlSubmit:function(fn,thisObj){
        var obj = thisObj || this;
        var stat = false;
        return this.each(function(){
            $(this).keyup(function(event){
                //只按下ctrl情况，等待enter键的按下
                if(event.keyCode == 17){
                    stat = true;
                    //取消等待
                    setTimeout(function(){
                        stat = false;
                    },300);
                } 
                if(event.keyCode == 13 && (stat || event.ctrlKey)){
                    fn.call(obj,event);
                } 
            });
        });
    } 
});

/*!
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery throttle / debounce: Sometimes, less is more!
//
// *Version: 1.1, Last updated: 3/7/2010*
// 
// Project Home - http://benalman.com/projects/jquery-throttle-debounce-plugin/
// GitHub       - http://github.com/cowboy/jquery-throttle-debounce/
// Source       - http://github.com/cowboy/jquery-throttle-debounce/raw/master/jquery.ba-throttle-debounce.js
// (Minified)   - http://github.com/cowboy/jquery-throttle-debounce/raw/master/jquery.ba-throttle-debounce.min.js (0.7kb)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// Throttle - http://benalman.com/code/projects/jquery-throttle-debounce/examples/throttle/
// Debounce - http://benalman.com/code/projects/jquery-throttle-debounce/examples/debounce/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - none, 1.3.2, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.6, Safari 3-4, Chrome 4-5, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-throttle-debounce/unit/
// 
// About: Release History
// 
// 1.1 - (3/7/2010) Fixed a bug in <jQuery.throttle> where trailing callbacks
//       executed later than they should. Reworked a fair amount of internal
//       logic as well.
// 1.0 - (3/6/2010) Initial release as a stand-alone project. Migrated over
//       from jquery-misc repo v0.4 to jquery-throttle repo v1.0, added the
//       no_trailing throttle parameter and debounce functionality.
// 
// Topic: Note for non-jQuery users
// 
// jQuery isn't actually required for this plugin, because nothing internal
// uses any jQuery methods or properties. jQuery is just used as a namespace
// under which these methods can exist.
// 
// Since jQuery isn't actually required for this plugin, if jQuery doesn't exist
// when this plugin is loaded, the method described below will be created in
// the `Cowboy` namespace. Usage will be exactly the same, but instead of
// $.method() or jQuery.method(), you'll need to use Cowboy.method().

(function(window,undefined){
  '$:nomunge'; // Used by YUI compressor.
  
  // Since jQuery really isn't required for this plugin, use `jQuery` as the
  // namespace only if it already exists, otherwise use the `Cowboy` namespace,
  // creating it if necessary.
  var $ = window.jQuery || window.Cowboy || ( window.Cowboy = {} ),
    
    // Internal method reference.
    jq_throttle;
  
  // Method: jQuery.throttle
  // 
  // Throttle execution of a function. Especially useful for rate limiting
  // execution of handlers on events like resize and scroll. If you want to
  // rate-limit execution of a function to a single time, see the
  // <jQuery.debounce> method.
  // 
  // In this visualization, | is a throttled-function call and X is the actual
  // callback execution:
  // 
  // > Throttled with `no_trailing` specified as false or unspecified:
  // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
  // > X    X    X    X    X    X        X    X    X    X    X    X
  // > 
  // > Throttled with `no_trailing` specified as true:
  // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
  // > X    X    X    X    X             X    X    X    X    X
  // 
  // Usage:
  // 
  // > var throttled = jQuery.throttle( delay, [ no_trailing, ] callback );
  // > 
  // > jQuery('selector').bind( 'someevent', throttled );
  // > jQuery('selector').unbind( 'someevent', throttled );
  // 
  // This also works in jQuery 1.4+:
  // 
  // > jQuery('selector').bind( 'someevent', jQuery.throttle( delay, [ no_trailing, ] callback ) );
  // > jQuery('selector').unbind( 'someevent', callback );
  // 
  // Arguments:
  // 
  //  delay - (Number) A zero-or-greater delay in milliseconds. For event
  //    callbacks, values around 100 or 250 (or even higher) are most useful.
  //  no_trailing - (Boolean) Optional, defaults to false. If no_trailing is
  //    true, callback will only execute every `delay` milliseconds while the
  //    throttled-function is being called. If no_trailing is false or
  //    unspecified, callback will be executed one final time after the last
  //    throttled-function call. (After the throttled-function has not been
  //    called for `delay` milliseconds, the internal counter is reset)
  //  callback - (Function) A function to be executed after delay milliseconds.
  //    The `this` context and all arguments are passed through, as-is, to
  //    `callback` when the throttled-function is executed.
  // 
  // Returns:
  // 
  //  (Function) A new, throttled, function.
  
  $.throttle = jq_throttle = function( delay, no_trailing, callback, debounce_mode ) {
    // After wrapper has stopped being called, this timeout ensures that
    // `callback` is executed at the proper times in `throttle` and `end`
    // debounce modes.
    var timeout_id,
      
      // Keep track of the last time `callback` was executed.
      last_exec = 0;
    
    // `no_trailing` defaults to falsy.
    if ( typeof no_trailing !== 'boolean' ) {
      debounce_mode = callback;
      callback = no_trailing;
      no_trailing = undefined;
    }
    
    // The `wrapper` function encapsulates all of the throttling / debouncing
    // functionality and when executed will limit the rate at which `callback`
    // is executed.
    function wrapper() {
      var that = this,
        elapsed = +new Date() - last_exec,
        args = arguments;
      
      // Execute `callback` and update the `last_exec` timestamp.
      function exec() {
        last_exec = +new Date();
        callback.apply( that, args );
      };
      
      // If `debounce_mode` is true (at_begin) this is used to clear the flag
      // to allow future `callback` executions.
      function clear() {
        timeout_id = undefined;
      };
      
      if ( debounce_mode && !timeout_id ) {
        // Since `wrapper` is being called for the first time and
        // `debounce_mode` is true (at_begin), execute `callback`.
        exec();
      }
      
      // Clear any existing timeout.
      timeout_id && clearTimeout( timeout_id );
      
      if ( debounce_mode === undefined && elapsed > delay ) {
        // In throttle mode, if `delay` time has been exceeded, execute
        // `callback`.
        exec();
        
      } else if ( no_trailing !== true ) {
        // In trailing throttle mode, since `delay` time has not been
        // exceeded, schedule `callback` to execute `delay` ms after most
        // recent execution.
        // 
        // If `debounce_mode` is true (at_begin), schedule `clear` to execute
        // after `delay` ms.
        // 
        // If `debounce_mode` is false (at end), schedule `callback` to
        // execute after `delay` ms.
        timeout_id = setTimeout( debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay );
      }
    };
    
    // Set the guid of `wrapper` function to the same of original callback, so
    // it can be removed in jQuery 1.4+ .unbind or .die by using the original
    // callback as a reference.
    if ( $.guid ) {
      wrapper.guid = callback.guid = callback.guid || $.guid++;
    }
    
    // Return the wrapper function.
    return wrapper;
  };
  
  // Method: jQuery.debounce
  // 
  // Debounce execution of a function. Debouncing, unlike throttling,
  // guarantees that a function is only executed a single time, either at the
  // very beginning of a series of calls, or at the very end. If you want to
  // simply rate-limit execution of a function, see the <jQuery.throttle>
  // method.
  // 
  // In this visualization, | is a debounced-function call and X is the actual
  // callback execution:
  // 
  // > Debounced with `at_begin` specified as false or unspecified:
  // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
  // >                          X                                 X
  // > 
  // > Debounced with `at_begin` specified as true:
  // > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
  // > X                                 X
  // 
  // Usage:
  // 
  // > var debounced = jQuery.debounce( delay, [ at_begin, ] callback );
  // > 
  // > jQuery('selector').bind( 'someevent', debounced );
  // > jQuery('selector').unbind( 'someevent', debounced );
  // 
  // This also works in jQuery 1.4+:
  // 
  // > jQuery('selector').bind( 'someevent', jQuery.debounce( delay, [ at_begin, ] callback ) );
  // > jQuery('selector').unbind( 'someevent', callback );
  // 
  // Arguments:
  // 
  //  delay - (Number) A zero-or-greater delay in milliseconds. For event
  //    callbacks, values around 100 or 250 (or even higher) are most useful.
  //  at_begin - (Boolean) Optional, defaults to false. If at_begin is false or
  //    unspecified, callback will only be executed `delay` milliseconds after
  //    the last debounced-function call. If at_begin is true, callback will be
  //    executed only at the first debounced-function call. (After the
  //    throttled-function has not been called for `delay` milliseconds, the
  //    internal counter is reset)
  //  callback - (Function) A function to be executed after delay milliseconds.
  //    The `this` context and all arguments are passed through, as-is, to
  //    `callback` when the debounced-function is executed.
  // 
  // Returns:
  // 
  //  (Function) A new, debounced, function.
  
  $.debounce = function( delay, at_begin, callback ) {
    return callback === undefined
      ? jq_throttle( delay, at_begin, false )
      : jq_throttle( delay, callback, at_begin !== false );
  };
  
})(this);

/*!
* MockJax - jQuery Plugin to Mock Ajax requests
*
* Version: 1.5.3
* Released:
* Home: http://github.com/appendto/jquery-mockjax
* Author: Jonathan Sharp (http://jdsharp.com)
* License: MIT,GPL
*
* Copyright (c) 2011 appendTo LLC.
* Dual licensed under the MIT or GPL licenses.
* http://appendto.com/open-source-licenses
*/
(function($) {
	var _ajax = $.ajax, mockHandlers = [], mockedAjaxCalls = [], CALLBACK_REGEX = /=\?(&|$)/, jsc = (new Date())
			.getTime();

	// Parse the given XML string.
	function parseXML(xml) {
		if (window.DOMParser == undefined && window.ActiveXObject) {
			DOMParser = function() {
			};
			DOMParser.prototype.parseFromString = function(xmlString) {
				var doc = new ActiveXObject('Microsoft.XMLDOM');
				doc.async = 'false';
				doc.loadXML(xmlString);
				return doc;
			};
		}

		try {
			var xmlDoc = (new DOMParser()).parseFromString(xml, 'text/xml');
			if ($.isXMLDoc(xmlDoc)) {
				var err = $('parsererror', xmlDoc);
				if (err.length == 1) {
					throw ('Error: ' + $(xmlDoc).text());
				}
			} else {
				throw ('Unable to parse XML');
			}
			return xmlDoc;
		} catch (e) {
			var msg = (e.name == undefined ? e : e.name + ': ' + e.message);
			$(document).trigger('xmlParseError', [ msg ]);
			return undefined;
		}
	}

	// Trigger a jQuery event
	function trigger(s, type, args) {
		(s.context ? $(s.context) : $.event).trigger(type, args);
	}

	// Check if the data field on the mock handler and the request match. This
	// can be used to restrict a mock handler to being used only when a certain
	// set of data is passed to it.
	function isMockDataEqual(mock, live) {
		var identical = true;
		// Test for situations where the data is a querystring (not an object)
		if (typeof live === 'string') {
			// Querystring may be a regex
			return $.isFunction(mock.test) ? mock.test(live) : mock == live;
		}
		$.each(mock, function(k) {
			if (live[k] === undefined) {
				identical = false;
				return identical;
			} else {
				// This will allow to compare Arrays
				if (typeof live[k] === 'object' && live[k] !== null) {
					identical = identical && isMockDataEqual(mock[k], live[k]);
				} else {
					if (mock[k] && $.isFunction(mock[k].test)) {
						identical = identical && mock[k].test(live[k]);
					} else {
						identical = identical && (mock[k] == live[k]);
					}
				}
			}
		});

		return identical;
	}

	// See if a mock handler property matches the default settings
	function isDefaultSetting(handler, property) {
		return handler[property] === $.mockjaxSettings[property];
	}

	// Check the given handler should mock the given request
	function getMockForRequest(handler, requestSettings) {
		// If the mock was registered with a function, let the function decide
		// if we
		// want to mock this request
		if ($.isFunction(handler)) {
			return handler(requestSettings);
		}

		// Inspect the URL of the request and check if the mock handler's url
		// matches the url for this ajax request
		if ($.isFunction(handler.url.test)) {
			// The user provided a regex for the url, test it
			if (!handler.url.test(requestSettings.url)) {
				return null;
			}
		} else {
			// Look for a simple wildcard '*' or a direct URL match
			var star = handler.url.indexOf('*');
			if (handler.url !== requestSettings.url
					&& star === -1
					|| !new RegExp(handler.url.replace(
							/[-[\]{}()+?.,\\^$|#\s]/g, "\\$&").replace(/\*/g,
							'.+')).test(requestSettings.url)) {
				return null;
			}
		}

		// Inspect the data submitted in the request (either POST body or GET
		// query string)
		if (handler.data && requestSettings.data) {
			if (!isMockDataEqual(handler.data, requestSettings.data)) {
				// They're not identical, do not mock this request
				return null;
			}
		}
		// Inspect the request type
		if (handler
				&& handler.type
				&& handler.type.toLowerCase() != requestSettings.type
						.toLowerCase()) {
			// The request type doesn't match (GET vs. POST)
			return null;
		}

		return handler;
	}

	// Process the xhr objects send operation
	function _xhrSend(mockHandler, requestSettings, origSettings) {

		// This is a substitute for < 1.4 which lacks $.proxy
		var process = (function(that) {
			return function() {
				return (function() {
					var onReady;

					// The request has returned
					this.status = mockHandler.status;
					this.statusText = mockHandler.statusText;
					this.readyState = 4;

					// We have an executable function, call it to give
					// the mock handler a chance to update it's data
					if ($.isFunction(mockHandler.response)) {
						mockHandler.response(origSettings);
					}
					// Copy over our mock to our xhr object before passing
					// control back to
					// jQuery's onreadystatechange callback
					if (requestSettings.dataType == 'json'
							&& (typeof mockHandler.responseText == 'object')) {
						this.responseText = JSON
								.stringify(mockHandler.responseText);
					} else if (requestSettings.dataType == 'xml') {
						if (typeof mockHandler.responseXML == 'string') {
							this.responseXML = parseXML(mockHandler.responseXML);
							// in jQuery 1.9.1+, responseXML is processed
							// differently and relies on responseText
							this.responseText = mockHandler.responseXML;
						} else {
							this.responseXML = mockHandler.responseXML;
						}
					} else {
						this.responseText = mockHandler.responseText;
					}
					if (typeof mockHandler.status == 'number'
							|| typeof mockHandler.status == 'string') {
						this.status = mockHandler.status;
					}
					if (typeof mockHandler.statusText === "string") {
						this.statusText = mockHandler.statusText;
					}
					// jQuery 2.0 renamed onreadystatechange to onload
					onReady = this.onreadystatechange || this.onload;

					// jQuery < 1.4 doesn't have onreadystate change for xhr
					if ($.isFunction(onReady)) {
						if (mockHandler.isTimeout) {
							this.status = -1;
						}
						onReady.call(this, mockHandler.isTimeout ? 'timeout'
								: undefined);
					} else if (mockHandler.isTimeout) {
						// Fix for 1.3.2 timeout to keep success from firing.
						this.status = -1;
					}
				}).apply(that);
			};
		})(this);

		if ( mockHandler.proxy ) {
// We're proxying this request and loading in an external file instead
_ajax({
				global : false,
				url : mockHandler.proxy,
				type : mockHandler.proxyType,
				data : mockHandler.data,
				dataType : requestSettings.dataType === "script" ? "text/plain"
						: requestSettings.dataType,
				complete : function(xhr) {
					mockHandler.responseXML = xhr.responseXML;
					mockHandler.responseText = xhr.responseText;
					// Don't override the handler status/statusText if it's
					// specified by the config
					if (isDefaultSetting(mockHandler, 'status')) {
						mockHandler.status = xhr.status;
					}
					if (isDefaultSetting(mockHandler, 'statusText')) {
						mockHandler.statusText = xhr.statusText;
					}

					this.responseTimer = setTimeout(process,
							mockHandler.responseTime || 0);
				}
			});
		} else {
			// type == 'POST' || 'GET' || 'DELETE'
			if (requestSettings.async === false) {
				// TODO: Blocking delay
				process();
			} else {
				this.responseTimer = setTimeout(process,
						mockHandler.responseTime || 50);
			}
		}
	}

	// Construct a mocked XHR Object
	function xhr(mockHandler, requestSettings, origSettings, origHandler) {
		// Extend with our default mockjax settings
		mockHandler = $.extend(true, {}, $.mockjaxSettings, mockHandler);

		if (typeof mockHandler.headers === 'undefined') {
			mockHandler.headers = {};
		}
		if (mockHandler.contentType) {
			mockHandler.headers['content-type'] = mockHandler.contentType;
}

return {
			status : mockHandler.status,
			statusText : mockHandler.statusText,
			readyState : 1,
			open : function() {
			},
			send : function() {
				origHandler.fired = true;
				_xhrSend.call(this, mockHandler, requestSettings, origSettings);
			},
			abort : function() {
				clearTimeout(this.responseTimer);
			},
			setRequestHeader : function(header, value) {
				mockHandler.headers[header] = value;
			},
			getResponseHeader : function(header) {
				// 'Last-modified', 'Etag', 'content-type' are all checked by
				// jQuery
				if (mockHandler.headers && mockHandler.headers[header]) {
					// Return arbitrary headers
					return mockHandler.headers[header];
				} else if (header.toLowerCase() == 'last-modified') {
					return mockHandler.lastModified || (new Date()).toString();
				} else if (header.toLowerCase() == 'etag') {
					return mockHandler.etag || '';
				} else if (header.toLowerCase() == 'content-type') {
					return mockHandler.contentType || 'text/plain';
				}
			},
			getAllResponseHeaders : function() {
				var headers = '';
				$.each(mockHandler.headers, function(k, v) {
					headers += k + ': ' + v + "\n";
				});
				return headers;
			}
		};
	}

	// Process a JSONP mock request.
	function processJsonpMock(requestSettings, mockHandler, origSettings) {
		// Handle JSONP Parameter Callbacks, we need to replicate some of the
		// jQuery core here
		// because there isn't an easy hook for the cross domain script tag of
		// jsonp

		processJsonpUrl(requestSettings);

		requestSettings.dataType = "json";
		if (requestSettings.data && CALLBACK_REGEX.test(requestSettings.data)
				|| CALLBACK_REGEX.test(requestSettings.url)) {
			createJsonpCallback(requestSettings, mockHandler, origSettings);

			// We need to make sure
			// that a JSONP style response is executed properly

			var rurl = /^(\w+:)?\/\/([^\/?#]+)/, parts = rurl
					.exec(requestSettings.url), remote = parts
					&& (parts[1] && parts[1] !== location.protocol || parts[2] !== location.host);

			requestSettings.dataType = "script";
			if (requestSettings.type.toUpperCase() === "GET" && remote) {
				var newMockReturn = processJsonpRequest(requestSettings,
						mockHandler, origSettings);

				// Check if we are supposed to return a Deferred back to the
				// mock call, or just
				// signal success
				if (newMockReturn) {
					return newMockReturn;
				} else {
					return true;
				}
			}
		}
		return null;
	}

	// Append the required callback parameter to the end of the request URL, for
	// a JSONP request
	function processJsonpUrl(requestSettings) {
		if (requestSettings.type.toUpperCase() === "GET") {
			if (!CALLBACK_REGEX.test(requestSettings.url)) {
				requestSettings.url += (/\?/.test(requestSettings.url) ? "&"
						: "?")
						+ (requestSettings.jsonp || "callback") + "=?";
			}
		} else if (!requestSettings.data
				|| !CALLBACK_REGEX.test(requestSettings.data)) {
			requestSettings.data = (requestSettings.data ? requestSettings.data
					+ "&" : "")
					+ (requestSettings.jsonp || "callback") + "=?";
		}
	}

	// Process a JSONP request by evaluating the mocked response text
	function processJsonpRequest(requestSettings, mockHandler, origSettings) {
		// Synthesize the mock request for adding a script tag
		var callbackContext = origSettings && origSettings.context
				|| requestSettings, newMock = null;

		// If the response handler on the moock is a function, call it
		if (mockHandler.response && $.isFunction(mockHandler.response)) {
			mockHandler.response(origSettings);
		} else {

			// Evaluate the responseText javascript in a global context
			if (typeof mockHandler.responseText === 'object') {
				$.globalEval('(' + JSON.stringify(mockHandler.responseText)
						+ ')');
			} else {
				$.globalEval('(' + mockHandler.responseText + ')');
			}
		}

		// Successful response
		jsonpSuccess(requestSettings, callbackContext, mockHandler);
		jsonpComplete(requestSettings, callbackContext, mockHandler);

		// If we are running under jQuery 1.5+, return a deferred object
		if ($.Deferred) {
			newMock = new $.Deferred();
			if (typeof mockHandler.responseText == "object") {
				newMock.resolveWith(callbackContext,
						[ mockHandler.responseText ]);
			} else {
				newMock.resolveWith(callbackContext, [ $
						.parseJSON(mockHandler.responseText) ]);
			}
		}
		return newMock;
	}

	// Create the required JSONP callback function for the request
	function createJsonpCallback(requestSettings, mockHandler, origSettings) {
		var callbackContext = origSettings && origSettings.context
				|| requestSettings;
		var jsonp = requestSettings.jsonpCallback || ("jsonp" + jsc++);

		// Replace the =? sequence both in the query string and the data
		if (requestSettings.data) {
			requestSettings.data = (requestSettings.data + "").replace(
					CALLBACK_REGEX, "=" + jsonp + "$1");
		}

		requestSettings.url = requestSettings.url.replace(CALLBACK_REGEX, "="
				+ jsonp + "$1");

		// Handle JSONP-style loading
		window[jsonp] = window[jsonp] || function(tmp) {
			data = tmp;
			jsonpSuccess(requestSettings, callbackContext, mockHandler);
			jsonpComplete(requestSettings, callbackContext, mockHandler);
			// Garbage collect
			window[jsonp] = undefined;

			try {
				delete window[jsonp];
			} catch (e) {
			}

			if (head) {
				head.removeChild(script);
			}
		};
	}

	// The JSONP request was successful
	function jsonpSuccess(requestSettings, callbackContext, mockHandler) {
		// If a local callback was specified, fire it and pass it the data
		if (requestSettings.success) {
			requestSettings.success.call(callbackContext,
					mockHandler.responseText || "", status, {});
		}

		// Fire the global callback
		if (requestSettings.global) {
			trigger(requestSettings, "ajaxSuccess", [ {}, requestSettings ]);
		}
	}

	// The JSONP request was completed
	function jsonpComplete(requestSettings, callbackContext) {
		// Process result
		if (requestSettings.complete) {
			requestSettings.complete.call(callbackContext, {}, status);
		}

		// The request was completed
		if (requestSettings.global) {
			trigger("ajaxComplete", [ {}, requestSettings ]);
		}

		// Handle the global AJAX counter
		if (requestSettings.global && !--$.active) {
			$.event.trigger("ajaxStop");
		}
	}

	// The core $.ajax replacement.
	function handleAjax(url, origSettings) {
		var mockRequest, requestSettings, mockHandler;

		// If url is an object, simulate pre-1.5 signature
		if (typeof url === "object") {
			origSettings = url;
			url = undefined;
		} else {
			// work around to support 1.5 signature
			origSettings.url = url;
		}

		// Extend the original settings for the request
		requestSettings = $.extend(true, {}, $.ajaxSettings, origSettings);

		// Iterate over our mock handlers (in registration order) until we find
		// one that is willing to intercept the request
		for ( var k = 0; k < mockHandlers.length; k++) {
			if (!mockHandlers[k]) {
				continue;
			}

			mockHandler = getMockForRequest(mockHandlers[k], requestSettings);
			if (!mockHandler) {
				// No valid mock found for this request
				continue;
			}

			mockedAjaxCalls.push(requestSettings);

			// If logging is enabled, log the mock to the console
			$.mockjaxSettings.log(mockHandler, requestSettings);

			if (requestSettings.dataType === "jsonp") {
				if ((mockRequest = processJsonpMock(requestSettings,
						mockHandler, origSettings))) {
					// This mock will handle the JSONP request
					return mockRequest;
				}
			}

			// Removed to fix #54 - keep the mocking data object intact
			// mockHandler.data = requestSettings.data;

			mockHandler.cache = requestSettings.cache;
			mockHandler.timeout = requestSettings.timeout;
			mockHandler.global = requestSettings.global;

			copyUrlParameters(mockHandler, origSettings);

			(function(mockHandler, requestSettings, origSettings, origHandler) {
				mockRequest = _ajax.call($, $.extend(true, {}, origSettings, {
					// Mock the XHR object
					xhr : function() {
						return xhr(mockHandler, requestSettings, origSettings,
								origHandler);
					}
				}));
			})(mockHandler, requestSettings, origSettings, mockHandlers[k]);

			return mockRequest;
		}

		// We don't have a mock request
		if ($.mockjaxSettings.throwUnmocked === true) {
			throw ('AJAX not mocked: ' + origSettings.url);
		} else { // trigger a normal request
			return _ajax.apply($, [ origSettings ]);
		}
	}

	/**
	 * Copies URL parameter values if they were captured by a regular expression
	 * 
	 * @param {Object}
	 *            mockHandler
	 * @param {Object}
	 *            origSettings
	 */
	function copyUrlParameters(mockHandler, origSettings) {
		// parameters aren't captured if the URL isn't a RegExp
		if (!(mockHandler.url instanceof RegExp)) {
			return;
		}
		// if no URL params were defined on the handler, don't attempt a capture
		if (!mockHandler.hasOwnProperty('urlParams')) {
			return;
		}
		var captures = mockHandler.url.exec(origSettings.url);
		// the whole RegExp match is always the first value in the capture
		// results
		if (captures.length === 1) {
			return;
		}
		captures.shift();
		// use handler params as keys and capture resuts as values
		var i = 0, capturesLength = captures.length, paramsLength = mockHandler.urlParams.length,
		// in case the number of params specified is less than actual captures
		maxIterations = Math.min(capturesLength, paramsLength), paramValues = {};
		for (i; i < maxIterations; i++) {
			var key = mockHandler.urlParams[i];
			paramValues[key] = captures[i];
		}
		origSettings.urlParams = paramValues;
	}

	// Public

	$.extend({
		ajax : handleAjax
	});

	$.mockjaxSettings = {
		// url: null,
		// type: 'GET',
		log : function(mockHandler, requestSettings) {
			if (mockHandler.logging === false
					|| (typeof mockHandler.logging === 'undefined' && $.mockjaxSettings.logging === false)) {
				return;
			}
			if (window.console && console.log) {
				var message = 'MOCK ' + requestSettings.type.toUpperCase()
						+ ': ' + requestSettings.url;
				var request = $.extend({}, requestSettings);

				if (typeof console.log === 'function') {
					console.log(message, request);
				} else {
					try {
						console.log(message + ' ' + JSON.stringify(request));
					} catch (e) {
						console.log(message);
					}
				}
			}
		},
		logging : true,
		status : 200,
		statusText : "OK",
		responseTime : 500,
		isTimeout : false,
		throwUnmocked : false,
		contentType : 'text/plain',
		response : '',
		responseText : '',
		responseXML : '',
		proxy : '',
		proxyType : 'GET',

		lastModified : null,
		etag : '',
		headers : {
			etag : 'IJF@H#@923uf8023hFO@I#H#',
			'content-type' : 'text/plain'
		}
	};

	$.mockjax = function(settings) {
		var i = mockHandlers.length;
		mockHandlers[i] = settings;
		return i;
	};
	$.mockjaxClear = function(i) {
		if (arguments.length == 1) {
			mockHandlers[i] = null;
		} else {
			mockHandlers = [];
		}
		mockedAjaxCalls = [];
	};
	$.mockjax.handler = function(i) {
		if (arguments.length == 1) {
			return mockHandlers[i];
		}
	};
	$.mockjax.mockedAjaxCalls = function() {
		return mockedAjaxCalls;
	};
})(jQuery);

//Chance.js 0.4.3
//http://chancejs.com
//(c) 2013 Victor Quinn
//Chance may be freely distributed or modified under the MIT license.
!function(){function a(a,b){if(a||(a={}),!b)return a;for(var c in b)"undefined"==typeof a[c]&&(a[c]=b[c]);return a}function b(a,b){if(a)throw new RangeError(b)}var c=9007199254740992,d=-c,e="0123456789",f="abcdefghijklmnopqrstuvwxyz",g=f.toUpperCase(),h=e+"abcdef",i=function(a){void 0!==a&&("function"==typeof a?this.random=a:this.seed=a),"undefined"==typeof this.random&&(this.mt=this.mersenne_twister(a),this.random=function(){return this.mt.random(this.seed)})};i.prototype.bool=function(c){return c=a(c,{likelihood:50}),b(c.likelihood<0||c.likelihood>100,"Chance: Likelihood accepts values from 0 to 100."),100*this.random()<c.likelihood},i.prototype.natural=function(d){return d=a(d,{min:0,max:c}),b(d.min>d.max,"Chance: Min cannot be greater than Max."),Math.floor(this.random()*(d.max-d.min+1)+d.min)},i.prototype.integer=function(b){var e,f;b=a(b,{min:d,max:c}),f=Math.max(Math.abs(b.min),Math.abs(b.max));do e=this.natural({max:f}),e=this.bool()?e:-1*e;while(e<b.min||e>b.max);return e},i.prototype.normal=function(b){b=a(b,{mean:0,dev:1});var c,d,e,f,g=b.mean,h=b.dev;do d=2*this.random()-1,e=2*this.random()-1,c=d*d+e*e;while(c>=1);return f=d*Math.sqrt(-2*Math.log(c)/c),h*f+g},i.prototype.floating=function(d){var e;d=a(d,{fixed:4});var f=Math.pow(10,d.fixed);b(d.fixed&&d.precision,"Chance: Cannot specify both fixed and precision.");var g=c/f,h=-g;b(d.min&&d.fixed&&d.min<h,"Chance: Min specified is out of range with fixed. Min should be, at least, "+h),b(d.max&&d.fixed&&d.max>g,"Chance: Max specified is out of range with fixed. Max should be, at most, "+g),d=a(d,{min:h,max:g}),e=this.integer({min:d.min*f,max:d.max*f});var i=(e/f).toFixed(d.fixed);return parseFloat(i)},i.prototype.character=function(c){c=a(c);var d,h,i="!@#$%^&*()[]";return b(c.alpha&&c.symbols,"Chance: Cannot specify both alpha and symbols."),d="lower"===c.casing?f:"upper"===c.casing?g:f+g,h=c.pool?c.pool:c.alpha?d:c.symbols?i:d+e+i,h.charAt(this.natural({max:h.length-1}))},i.prototype.string=function(b){b=a(b);for(var c=b.length||this.natural({min:5,max:20}),d="",e=b.pool,f=0;c>f;f++)d+=this.character({pool:e});return d},i.prototype.capitalize=function(a){return a.charAt(0).toUpperCase()+a.substr(1)},i.prototype.pick=function(a,b){return b&&1!==b?this.shuffle(a).slice(0,b):a[this.natural({max:a.length-1})]},i.prototype.shuffle=function(a){for(var b=a.slice(0),c=[],d=0,e=Number(b.length),f=0;e>f;f++)d=this.natural({max:b.length-1}),c[f]=b[d],b.splice(d,1);return c},i.prototype.paragraph=function(b){b=a(b);for(var c=b.sentences||this.natural({min:3,max:7}),d=[],e=0;c>e;e++)d.push(this.sentence());return d.join(" ")},i.prototype.sentence=function(b){b=a(b);for(var c,d=b.words||this.natural({min:12,max:18}),e=[],f=0;d>f;f++)e.push(this.word());return c=e.join(" "),c=this.capitalize(c)+"."},i.prototype.syllable=function(b){b=a(b);for(var c,d=b.length||this.natural({min:2,max:3}),e="bcdfghjklmnprstvwz",f="aeiou",g=e+f,h="",i=0;d>i;i++)c=0===i?this.character({pool:g}):-1===e.indexOf(c)?this.character({pool:e}):this.character({pool:f}),h+=c;return h},i.prototype.word=function(c){c=a(c),b(c.syllables&&c.length,"Chance: Cannot specify both syllables AND length.");var d=c.syllables||this.natural({min:1,max:3}),e="";if(c.length){do e+=this.syllable();while(e.length<c.length);e=e.substring(0,c.length)}else for(var f=0;d>f;f++)e+=this.syllable();return e},i.prototype.first=function(){return this.capitalize(this.word())},i.prototype.last=function(){return this.capitalize(this.word())},i.prototype.name=function(b){b=a(b);var c,d=this.first(),e=this.last();return c=b.middle?d+" "+this.capitalize(this.word())+" "+e:b.middle_initial?d+" "+this.character({alpha:!0,casing:"upper"})+". "+e:d+" "+e,b.prefix&&(c=this.prefix()+" "+c),c},i.prototype.name_prefixes=function(){return[{name:"Doctor",abbreviation:"Dr."},{name:"Miss",abbreviation:"Miss"},{name:"Misses",abbreviation:"Mrs."},{name:"Mister",abbreviation:"Mr."}]},i.prototype.prefix=function(a){return this.name_prefix(a)},i.prototype.name_prefix=function(b){return b=a(b),b.full?this.pick(this.name_prefixes()).name:this.pick(this.name_prefixes()).abbreviation},i.prototype.color=function(b){function c(a,b){return[a,a,a].join(b||"")}b=a(b,{format:this.pick(["hex","shorthex","rgb"]),grayscale:!1});var d=b.grayscale;if("hex"===b.format)return"#"+(d?c(this.hash({length:2})):this.hash({length:6}));if("shorthex"===b.format)return"#"+(d?c(this.hash({length:1})):this.hash({length:3}));if("rgb"===b.format)return d?"rgb("+c(this.natural({max:255}),",")+")":"rgb("+this.natural({max:255})+","+this.natural({max:255})+","+this.natural({max:255})+")";throw new Error('Invalid format provided. Please provide one of "hex", "shorthex", or "rgb"')},i.prototype.domain=function(b){return b=a(b),this.word()+"."+(b.tld||this.tld())},i.prototype.email=function(b){return b=a(b),this.word()+"@"+(b.domain||this.domain())},i.prototype.fbid=function(){return"10000"+this.natural({max:1e11}).toString()},i.prototype.ip=function(){return this.natural({max:255})+"."+this.natural({max:255})+"."+this.natural({max:255})+"."+this.natural({max:255})},i.prototype.ipv6=function(){for(var a="",b=0;8>b;b++)a+=this.hash({length:4})+":";return a.substr(0,a.length-1)},i.prototype.tlds=function(){return["com","org","edu","gov","co.uk","net","io"]},i.prototype.tld=function(){return this.pick(this.tlds())},i.prototype.twitter=function(){return"@"+this.word()},i.prototype.address=function(b){return b=a(b),this.natural({min:5,max:2e3})+" "+this.street(b)},i.prototype.areacode=function(b){b=a(b,{parens:!0});var c=this.natural({min:2,max:9}).toString()+this.natural({min:0,max:8}).toString()+this.natural({min:0,max:9}).toString();return b.parens?"("+c+")":c},i.prototype.city=function(){return this.capitalize(this.word({syllables:3}))},i.prototype.coordinates=function(b){return b=a(b),this.latitude(b)+", "+this.longitude(b)},i.prototype.latitude=function(b){return b=a(b,{fixed:5}),this.floating({min:-90,max:90,fixed:b.fixed})},i.prototype.longitude=function(b){return b=a(b,{fixed:5}),this.floating({min:0,max:180,fixed:b.fixed})},i.prototype.phone=function(b){b=a(b,{formatted:!0}),b.formatted||(b.parens=!1);var c=this.areacode(b).toString(),d=this.natural({min:2,max:9}).toString()+this.natural({min:0,max:9}).toString()+this.natural({min:0,max:9}).toString(),e=this.natural({min:1e3,max:9999}).toString();return b.formatted?c+" "+d+"-"+e:c+d+e},i.prototype.postal=function(){var a=this.character({pool:"XVTSRPNKLMHJGECBA"}),b=a+this.natural({max:9})+this.character({alpha:!0,casing:"upper"}),c=this.natural({max:9})+this.character({alpha:!0,casing:"upper"})+this.natural({max:9});return b+" "+c},i.prototype.provinces=function(){return[{name:"Alberta",abbreviation:"AB"},{name:"British Columbia",abbreviation:"BC"},{name:"Manitoba",abbreviation:"MB"},{name:"New Brunswick",abbreviation:"NB"},{name:"Newfoundland and Labrador",abbreviation:"NL"},{name:"Nova Scotia",abbreviation:"NS"},{name:"Ontario",abbreviation:"ON"},{name:"Prince Edward Island",abbreviation:"PE"},{name:"Quebec",abbreviation:"QC"},{name:"Saskatchewan",abbreviation:"SK"},{name:"Northwest Territories",abbreviation:"NT"},{name:"Nunavut",abbreviation:"NU"},{name:"Yukon",abbreviation:"YT"}]},i.prototype.province=function(a){return a&&a.full?this.pick(this.provinces()).name:this.pick(this.provinces()).abbreviation},i.prototype.radio=function(b){b=a(b,{side:"?"});var c="";switch(b.side.toLowerCase()){case"east":case"e":c="W";break;case"west":case"w":c="K";break;default:c=this.character({pool:"KW"})}return c+this.character({alpha:!0,casing:"upper"})+this.character({alpha:!0,casing:"upper"})+this.character({alpha:!0,casing:"upper"})},i.prototype.state=function(a){return a&&a.full?this.pick(this.states()).name:this.pick(this.states()).abbreviation},i.prototype.states=function(){return[{name:"Alabama",abbreviation:"AL"},{name:"Alaska",abbreviation:"AK"},{name:"American Samoa",abbreviation:"AS"},{name:"Arizona",abbreviation:"AZ"},{name:"Arkansas",abbreviation:"AR"},{name:"Armed Forces Europe",abbreviation:"AE"},{name:"Armed Forces Pacific",abbreviation:"AP"},{name:"Armed Forces the Americas",abbreviation:"AA"},{name:"California",abbreviation:"CA"},{name:"Colorado",abbreviation:"CO"},{name:"Connecticut",abbreviation:"CT"},{name:"Delaware",abbreviation:"DE"},{name:"District of Columbia",abbreviation:"DC"},{name:"Federated States of Micronesia",abbreviation:"FM"},{name:"Florida",abbreviation:"FL"},{name:"Georgia",abbreviation:"GA"},{name:"Guam",abbreviation:"GU"},{name:"Hawaii",abbreviation:"HI"},{name:"Idaho",abbreviation:"ID"},{name:"Illinois",abbreviation:"IL"},{name:"Indiana",abbreviation:"IN"},{name:"Iowa",abbreviation:"IA"},{name:"Kansas",abbreviation:"KS"},{name:"Kentucky",abbreviation:"KY"},{name:"Louisiana",abbreviation:"LA"},{name:"Maine",abbreviation:"ME"},{name:"Marshall Islands",abbreviation:"MH"},{name:"Maryland",abbreviation:"MD"},{name:"Massachusetts",abbreviation:"MA"},{name:"Michigan",abbreviation:"MI"},{name:"Minnesota",abbreviation:"MN"},{name:"Mississippi",abbreviation:"MS"},{name:"Missouri",abbreviation:"MO"},{name:"Montana",abbreviation:"MT"},{name:"Nebraska",abbreviation:"NE"},{name:"Nevada",abbreviation:"NV"},{name:"New Hampshire",abbreviation:"NH"},{name:"New Jersey",abbreviation:"NJ"},{name:"New Mexico",abbreviation:"NM"},{name:"New York",abbreviation:"NY"},{name:"North Carolina",abbreviation:"NC"},{name:"North Dakota",abbreviation:"ND"},{name:"Northern Mariana Islands",abbreviation:"MP"},{name:"Ohio",abbreviation:"OH"},{name:"Oklahoma",abbreviation:"OK"},{name:"Oregon",abbreviation:"OR"},{name:"Pennsylvania",abbreviation:"PA"},{name:"Puerto Rico",abbreviation:"PR"},{name:"Rhode Island",abbreviation:"RI"},{name:"South Carolina",abbreviation:"SC"},{name:"South Dakota",abbreviation:"SD"},{name:"Tennessee",abbreviation:"TN"},{name:"Texas",abbreviation:"TX"},{name:"Utah",abbreviation:"UT"},{name:"Vermont",abbreviation:"VT"},{name:"Virgin Islands, U.S.",abbreviation:"VI"},{name:"Virginia",abbreviation:"VA"},{name:"Washington",abbreviation:"WA"},{name:"West Virginia",abbreviation:"WV"},{name:"Wisconsin",abbreviation:"WI"},{name:"Wyoming",abbreviation:"WY"}]},i.prototype.street=function(b){b=a(b);var c=this.word({syllables:2});return c=this.capitalize(c),c+=" ",c+=b.short_suffix?this.street_suffix().abbreviation:this.street_suffix().name},i.prototype.street_suffix=function(){return this.pick(this.street_suffixes())},i.prototype.street_suffixes=function(){return[{name:"Avenue",abbreviation:"Ave"},{name:"Boulevard",abbreviation:"Blvd"},{name:"Center",abbreviation:"Ctr"},{name:"Circle",abbreviation:"Cir"},{name:"Court",abbreviation:"Ct"},{name:"Drive",abbreviation:"Dr"},{name:"Extension",abbreviation:"Ext"},{name:"Glen",abbreviation:"Gln"},{name:"Grove",abbreviation:"Grv"},{name:"Heights",abbreviation:"Hts"},{name:"Highway",abbreviation:"Hwy"},{name:"Junction",abbreviation:"Jct"},{name:"Key",abbreviation:"Key"},{name:"Lane",abbreviation:"Ln"},{name:"Loop",abbreviation:"Loop"},{name:"Manor",abbreviation:"Mnr"},{name:"Mill",abbreviation:"Mill"},{name:"Park",abbreviation:"Park"},{name:"Parkway",abbreviation:"Pkwy"},{name:"Pass",abbreviation:"Pass"},{name:"Path",abbreviation:"Path"},{name:"Pike",abbreviation:"Pike"},{name:"Place",abbreviation:"Pl"},{name:"Plaza",abbreviation:"Plz"},{name:"Point",abbreviation:"Pt"},{name:"Ridge",abbreviation:"Rdg"},{name:"River",abbreviation:"Riv"},{name:"Road",abbreviation:"Rd"},{name:"Square",abbreviation:"Sq"},{name:"Street",abbreviation:"St"},{name:"Terrace",abbreviation:"Ter"},{name:"Trail",abbreviation:"Trl"},{name:"Turnpike",abbreviation:"Tpke"},{name:"View",abbreviation:"Vw"},{name:"Way",abbreviation:"Way"}]},i.prototype.zip=function(a){for(var b="",c=0;5>c;c++)b+=this.natural({max:9}).toString();if(a&&a.plusfour===!0)for(b+="-",c=0;4>c;c++)b+=this.natural({max:9}).toString();return b},i.prototype.ampm=function(){return this.bool()?"am":"pm"},i.prototype.hour=function(b){b=a(b);var c=b.twentyfour?24:12;return this.natural({min:1,max:c})},i.prototype.minute=function(){return this.natural({max:59})},i.prototype.month=function(b){b=a(b);var c=this.pick(this.months());return b.raw?c:c.name},i.prototype.months=function(){return[{name:"January",short_name:"Jan",numeric:"01"},{name:"February",short_name:"Feb",numeric:"02"},{name:"March",short_name:"Mar",numeric:"03"},{name:"April",short_name:"Apr",numeric:"04"},{name:"May",short_name:"May",numeric:"05"},{name:"June",short_name:"Jun",numeric:"06"},{name:"July",short_name:"Jul",numeric:"07"},{name:"August",short_name:"Aug",numeric:"08"},{name:"September",short_name:"Sep",numeric:"09"},{name:"October",short_name:"Oct",numeric:"10"},{name:"November",short_name:"Nov",numeric:"11"},{name:"December",short_name:"Dec",numeric:"12"}]},i.prototype.second=function(){return this.natural({max:59})},i.prototype.timestamp=function(){return this.natural({min:1,max:parseInt((new Date).getTime()/1e3,10)})},i.prototype.year=function(b){return b=a(b,{min:(new Date).getFullYear()}),b.max="undefined"!=typeof b.max?b.max:b.min+100,this.natural(b).toString()},i.prototype.cc=function(b){b=a(b);var c,d,e;c=b.type?this.cc_type({name:b.type,raw:!0}):this.cc_type({raw:!0}),d=c.prefix.split(""),e=c.length-c.prefix.length-1;for(var f=0;e>f;f++)d.push(this.integer({min:0,max:9}));return d.push(this.luhn_calculate(d.join(""))),d.join("")},i.prototype.cc_types=function(){return[{name:"American Express",short_name:"amex",prefix:"34",length:15},{name:"Bankcard",short_name:"bankcard",prefix:"5610",length:16},{name:"China UnionPay",short_name:"chinaunion",prefix:"62",length:16},{name:"Diners Club Carte Blanche",short_name:"dccarte",prefix:"300",length:14},{name:"Diners Club enRoute",short_name:"dcenroute",prefix:"2014",length:15},{name:"Diners Club International",short_name:"dcintl",prefix:"36",length:14},{name:"Diners Club United States & Canada",short_name:"dcusc",prefix:"54",length:16},{name:"Discover Card",short_name:"discover",prefix:"6011",length:16},{name:"InstaPayment",short_name:"instapay",prefix:"637",length:16},{name:"JCB",short_name:"jcb",prefix:"3528",length:16},{name:"Laser",short_name:"laser",prefix:"6304",length:16},{name:"Maestro",short_name:"maestro",prefix:"5018",length:16},{name:"Mastercard",short_name:"mc",prefix:"51",length:16},{name:"Solo",short_name:"solo",prefix:"6334",length:16},{name:"Switch",short_name:"switch",prefix:"4903",length:16},{name:"Visa",short_name:"visa",prefix:"4",length:16},{name:"Visa Electron",short_name:"electron",prefix:"4026",length:16}]},i.prototype.cc_type=function(b){b=a(b);var c=this.cc_types(),d=null;if(b.name){for(var e=0;e<c.length;e++)if(c[e].name===b.name||c[e].short_name===b.name){d=c[e];break}if(null===d)throw new Error("Credit card type '"+b.name+"'' is not suppoted")}else d=this.pick(c);return b.raw?d:d.name},i.prototype.dollar=function(b){b=a(b,{max:1e4,min:0});var c=this.floating({min:b.min,max:b.max,fixed:2}).toString(),d=c.split(".")[1];return void 0===d?c+=".00":d.length<2&&(c+="0"),"$"+c},i.prototype.exp=function(b){b=a(b);var c={};return c.year=this.exp_year(),c.month=c.year===(new Date).getFullYear()?this.exp_month({future:!0}):this.exp_month(),b.raw?c:c.month+"/"+c.year},i.prototype.exp_month=function(b){b=a(b);var c,d;if(b.future){do c=this.month({raw:!0}).numeric,d=parseInt(c,10);while(d<(new Date).getMonth())}else c=this.month({raw:!0}).numeric;return c},i.prototype.exp_year=function(){return this.year({max:(new Date).getFullYear()+10})},i.prototype.d4=function(){return this.natural({min:1,max:4})},i.prototype.d6=function(){return this.natural({min:1,max:6})},i.prototype.d8=function(){return this.natural({min:1,max:8})},i.prototype.d10=function(){return this.natural({min:1,max:10})},i.prototype.d12=function(){return this.natural({min:1,max:12})},i.prototype.d20=function(){return this.natural({min:1,max:20})},i.prototype.d30=function(){return this.natural({min:1,max:30})},i.prototype.d100=function(){return this.natural({min:1,max:100})},i.prototype.rpg=function(b,c){if(c=a(c),null===b)throw new Error("A type of die roll must be included");var d=b.toLowerCase().split("d"),e=[];if(2!==d.length||!parseInt(d[0],10)||!parseInt(d[1],10))throw new Error("Invalid format provided. Please provide #d# where the first # is the number of dice to roll, the second # is the max of each die");for(var f=d[0];f>0;f--)e[f-1]=this.natural({min:1,max:d[1]});return"undefined"!=typeof c.sum&&c.sum?e.reduce(function(a,b){return a+b}):e},i.prototype.guid=function(){return this.hash({casing:"upper",length:8})+"-"+this.hash({casing:"upper",length:4})+"-"+this.hash({casing:"upper",length:4})+"-"+this.hash({casing:"upper",length:4})+"-"+this.hash({casing:"upper",length:12})},i.prototype.hash=function(b){b=a(b,{length:40,casing:"lower"});var c="upper"===b.casing?h.toUpperCase():h;return this.string({pool:c,length:b.length})},i.prototype.mersenne_twister=function(a){return new j(a)},i.prototype.luhn_check=function(a){var b=a.toString(),c=+b.substring(b.length-1);return c===this.luhn_calculate(+b.substring(0,b.length-1))},i.prototype.luhn_calculate=function(a){for(var b=a.toString().split("").reverse(),c=0,d=0,e=b.length;e>d;++d){var f=+b[d];0===d%2&&(f*=2,f>9&&(f-=9)),c+=f}return 9*c%10},i.prototype.VERSION="0.4.3";var j=function(a){void 0===a&&(a=(new Date).getTime()),this.N=624,this.M=397,this.MATRIX_A=2567483615,this.UPPER_MASK=2147483648,this.LOWER_MASK=2147483647,this.mt=new Array(this.N),this.mti=this.N+1,this.init_genrand(a)};j.prototype.init_genrand=function(a){for(this.mt[0]=a>>>0,this.mti=1;this.mti<this.N;this.mti++)a=this.mt[this.mti-1]^this.mt[this.mti-1]>>>30,this.mt[this.mti]=(1812433253*((4294901760&a)>>>16)<<16)+1812433253*(65535&a)+this.mti,this.mt[this.mti]>>>=0},j.prototype.init_by_array=function(a,b){var c,d,e=1,f=0;for(this.init_genrand(19650218),c=this.N>b?this.N:b;c;c--)d=this.mt[e-1]^this.mt[e-1]>>>30,this.mt[e]=(this.mt[e]^(1664525*((4294901760&d)>>>16)<<16)+1664525*(65535&d))+a[f]+f,this.mt[e]>>>=0,e++,f++,e>=this.N&&(this.mt[0]=this.mt[this.N-1],e=1),f>=b&&(f=0);for(c=this.N-1;c;c--)d=this.mt[e-1]^this.mt[e-1]>>>30,this.mt[e]=(this.mt[e]^(1566083941*((4294901760&d)>>>16)<<16)+1566083941*(65535&d))-e,this.mt[e]>>>=0,e++,e>=this.N&&(this.mt[0]=this.mt[this.N-1],e=1);this.mt[0]=2147483648},j.prototype.genrand_int32=function(){var a,b=new Array(0,this.MATRIX_A);if(this.mti>=this.N){var c;for(this.mti===this.N+1&&this.init_genrand(5489),c=0;c<this.N-this.M;c++)a=this.mt[c]&this.UPPER_MASK|this.mt[c+1]&this.LOWER_MASK,this.mt[c]=this.mt[c+this.M]^a>>>1^b[1&a];for(;c<this.N-1;c++)a=this.mt[c]&this.UPPER_MASK|this.mt[c+1]&this.LOWER_MASK,this.mt[c]=this.mt[c+(this.M-this.N)]^a>>>1^b[1&a];a=this.mt[this.N-1]&this.UPPER_MASK|this.mt[0]&this.LOWER_MASK,this.mt[this.N-1]=this.mt[this.M-1]^a>>>1^b[1&a],this.mti=0}return a=this.mt[this.mti++],a^=a>>>11,a^=2636928640&a<<7,a^=4022730752&a<<15,a^=a>>>18,a>>>0},j.prototype.genrand_int31=function(){return this.genrand_int32()>>>1},j.prototype.genrand_real1=function(){return this.genrand_int32()*(1/4294967295)},j.prototype.random=function(){return this.genrand_int32()*(1/4294967296)},j.prototype.genrand_real3=function(){return(this.genrand_int32()+.5)*(1/4294967296)},j.prototype.genrand_res53=function(){var a=this.genrand_int32()>>>5,b=this.genrand_int32()>>>6;return(67108864*a+b)*(1/9007199254740992)},"undefined"!=typeof exports&&("undefined"!=typeof module&&module.exports&&(exports=module.exports=i),exports.Chance=i),"function"==typeof define&&define.amd&&define("Chance",[],function(){return i}),"object"==typeof window&&"object"==typeof window.document&&(window.Chance=i,window.chance=new i)}();

/*
* jQuery throttle / debounce - v1.1 - 3/7/2010
* http://benalman.com/projects/jquery-throttle-debounce-plugin/
*
* Copyright (c) 2010 "Cowboy" Ben Alman
* Dual licensed under the MIT and GPL licenses.
* http://benalman.com/about/license/
*/
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);