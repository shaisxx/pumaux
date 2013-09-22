(function(){
	var modules = {
		'jquery.ui.core':{
			js:'jquery/jquery.ui.core.min.js'
		},
		'jquery.ui.widget':{
			js:'jquery/jquery.ui.widget.min.js',
			dependencies:['jquery.ui.core']
		},
		'jquery.ui.mouse':{
			js:'jquery/jquery.ui.mouse.min.js',
			dependencies:['jquery.ui.widget']
		},
		'jquery.ui.draggable':{
			js:'jquery/jquery.ui.draggable.min.js',
			dependencies:['jquery.ui.mouse']
		},
		'jquery.isotope':{
			js:'jquery/jquery.isotope.min.js',
			css:'isotope/isotope.css'
		},
		'jquery.easing':{
			js:'jquery/jquery.easing.1.3.js'
		},
		'jquery.metadata':{
			js:'ibutton/jquery.metadata.js'
		},
		'jquery.ibutton':{
			js:'ibutton/jquery.ibutton.js',
			css:'ibutton/jquery.ibutton.css',
			dependencies:['jquery.metadata','jquery.easing']
		},
		'jquery.pin':{
			js:'jquery/jquery.pin.js'
		},
		'bootstrap':{
			js:'bootstrap/bootstrap.js',
			css:['bootstrap/bootstrap.css','bootstrap/buttons.css']
		},
		'bootstrap.editable':{
			js:'bootstrap/bootstrap-editable.js',
			css:'bootstrap/bootstrap-editable.css',
			dependencies:['bootstrap']
		},
		'bootstrap.modalmanager':{
			js:'bootstrap/bootstrap-modalmanager.js',
			//css:'bootstrap/bootstrap-modal-bs3patch.css',
			dependencies:['bootstrap']
		},
		'bootstrap.modal':{
			js:'bootstrap/bootstrap-modal.js',
			css:['bootstrap/bootstrap-modal.css','bootstrap/bootstrap-modal-bs3patch.css'],
			dependencies:['bootstrap.modalmanager']
		},
		'bootstrap.select':{
			js:'bootstrap/bootstrap-select.min.js',
			css:['bootstrap/bootstrap-select.min.css'],
			dependencies:['bootstrap']
		},
		'bootstrap.datepicker':{
			js:'bootstrap/bootstrap-datepicker.js',
			css:['bootstrap/datepicker.css'],
			dependencies:['bootstrap']
		},
		'bootstrap.bootbox':{
			js:'bootstrap/bootstrap-bootbox.js',
			dependencies:['bootstrap']
		},
		'metrojs':{
			js:'metrojs/MetroJs.min.js',
			css:'metrojs/MetroJs.min.css'
		},
		'parser':{
			js:'puma.parser.js'
		},
		'datagrid':{
			js:'pumaui/puma.datagrid.js',
			dependencies:['bootstrap.select']
		},
		'slidecontent':{
			js:'pumaui/puma.slidecontent.js'
		},
		'searchinput':{
			js:'pumaui/puma.searchinput.js'
		},
		'tagselect':{
			js:'pumaui/puma.tagselect.js'
		},
		'pumabase':{
			js:'puma.app.js',
			css:'app.css',
			dependencies:['parser','bootstrap']
		},
		'extensisionpoints':{
			js:'plugins/extensionpoints.js'
		},
		'puma.init':{
			js:'puma.init.js',
			dependencies:['pumabase','extensisionpoints']
		},
		
		
		/*********below are custom modules************/
		'welcome.welcomemodule':{
			js:'plugins/welcome.welcomemodule.js',
			css:'welcome.welcomemodule.css',
			dependencies:['puma.init','metrojs']
		},
		'demo.demomodule':{
			js:'plugins/demo.demomodule.js',
			dependencies:['puma.init','bootstrap.modal','bootstrap.bootbox','datagrid','slidecontent','searchinput','tagselect']
		},
		'sysconfig.pageconfigmodule':{
			js:'plugins/sysconfig.pageconfigmodule.js',
			dependencies:['puma.init']
		},
		'group.groupmodule':{
			js:'plugins/group.groupmodule.js',
			dependencies:['puma.init','bootstrap.modal','bootstrap.bootbox','datagrid','slidecontent','searchinput','tagselect','bootstrap.editable']
		},
		'group.groupinfoviewmodule':{
			js:'plugins/group.groupinfoviewmodule.js',
			dependencies:['puma.init']
		},
		'dormitory.dormcheckmodule':{
			js:'plugins/dormitory.dormcheckmodule.js',
			dependencies:['puma.init','bootstrap.modal','bootstrap.bootbox','datagrid','slidecontent','searchinput','tagselect','jquery.ibutton','jquery.isotope','bootstrap.datepicker','jquery.pin']
		}
	};
	
	var locales = {
		'zh_CN':'lang-zh_CN.js'
	};
	
	var queues = {};
	
	function loadJs(url, callback){
		var done = false;
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.language = 'javascript';
		script.src = url;
		script.onload = script.onreadystatechange = function(){
			if (!done && (!script.readyState || script.readyState == 'loaded' || script.readyState == 'complete')){
				done = true;
				script.onload = script.onreadystatechange = null;
				if (callback){
					callback.call(script);
				}
			}
		};
		document.getElementsByTagName("head")[0].appendChild(script);
	}
	
	function runJs(url, callback){
		loadJs(url, function(){
			document.getElementsByTagName("head")[0].removeChild(this);
			if (callback){
				callback();
			}
		});
	}
	
	function loadCss(url, callback){
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.media = 'screen';
		link.href = url;
		document.getElementsByTagName('head')[0].appendChild(link);
		if (callback){
			callback.call(link);
		}
	}
	
	function loadSingle(name, callback){
		var csses = [];
		
		queues[name] = 'loading';
		
		var module = modules[name];
		var jsStatus = 'loading';
		var cssStatus = (pumaloader.css && module['css']) ? 'loading' : 'loaded';
		
		function addCss(uurl){
			if (/^http/i.test(module['css'])){
				var cssurl = uurl;
			} else {
				var cssurl = pumaloader.base + 'themes/' + pumaloader.theme + '/' + uurl;
			}
			csses.push(cssurl);
		}
		
		function loadAllCsses(){
			for(var i=0; i<csses.length; i++){
				loadCss(csses[i], function(){
					cssStatus = 'loaded';
					if (jsStatus == 'loaded' && cssStatus == 'loaded' && i == csses.length - 1){
						finish();
					}
				});
			}
		}
		
		if (pumaloader.css && module['css']){
			
			if (typeof module['css'] == 'string'){
				addCss(module['css']);
			} else {
				for(var i=0; i<module['css'].length; i++){
					addCss(module['css'][i]);
				}
			}
			
			loadAllCsses();
		}
		
		//maybe we just want load some css styles
		if(module['js']){
			if (/^http/i.test(module['js'])){
				var jsurl = module['js'];
			} else {
				var jsurl = pumaloader.base + 'plugins/' + module['js'];
			}
			loadJs(jsurl, function(){
				jsStatus = 'loaded';
				if (jsStatus == 'loaded' && cssStatus == 'loaded'){
					finish();
				}
			});
		}else{
			jsStatus = 'loaded';
			if (jsStatus == 'loaded' && cssStatus == 'loaded'){
				finish();
			}
		}
		
		function finish(){
			queues[name] = 'loaded';
			pumaloader.onProgress(name);
			if (callback){
				callback();
			}
		}
	}
	
	function loadModule(name, callback){
		var mm = [];
		var doLoad = false;
		
		if (typeof name == 'string'){
			add(name);
		} else {
			for(var i=0; i<name.length; i++){
				add(name[i]);
			}
		}
		
		function add(name){
			if (!modules[name]) return;
			var d = modules[name]['dependencies'];
			if (d){
				for(var i=0; i<d.length; i++){
					add(d[i]);
				}
			}
			mm.push(name);
		}
		
		function finish(){
			if (callback){
				callback();
			}
			pumaloader.onLoad(name);
		}
		
		var time = 0;
		function loadMm(){
			if (mm.length){
				var m = mm[0];	// the first module
				if (!queues[m]){
					doLoad = true;
					loadSingle(m, function(){
						mm.shift();
						loadMm();
					});
				} else if (queues[m] == 'loaded'){
					mm.shift();
					loadMm();
				} else {
					if (time < pumaloader.timeout){
						time += 10;
						setTimeout(arguments.callee, 10);
					}
				}
			} else {
				if (pumaloader.locale && doLoad == true && locales[pumaloader.locale]){
					var url = pumaloader.base + 'locale/' + locales[pumaloader.locale];
					runJs(url, function(){
						finish();
					});
				} else {
					finish();
				}
			}
		}
		
		loadMm();
	}
	
	pumaloader = {
		modules:modules,
		locales:locales,
		
		base:'.',
		theme:'default',
		css:true,
		locale:null,
		timeout:2000,
	
		load: function(name, callback){
			if (/\.css$/i.test(name)){
				if (/^http/i.test(name)){
					loadCss(name, callback);
				} else {
					loadCss(pumaloader.base + name, callback);
				}
			} else if (/\.js$/i.test(name)){
				if (/^http/i.test(name)){
					loadJs(name, callback);
				} else {
					loadJs(pumaloader.base + name, callback);
				}
			} else {
				loadModule(name, callback);
			}
		},
		
		onProgress: function(name){},
		onLoad: function(name){}
	};

	var scripts = document.getElementsByTagName('script');
	for(var i=0; i<scripts.length; i++){
		var src = scripts[i].src;
		if (!src) continue;
		var m = src.match(/puma.loader\.js(\W|$)/i);
		if (m){
			pumaloader.base = src.substring(0, m.index);
		}
	}

	window.using = pumaloader.load;
	
	if (window.jQuery){
		jQuery(function(){
			pumaloader.load(['parser','puma.init'], function(){
				//jQuery.parser.parse();
			});
		});
	}
	
})();
