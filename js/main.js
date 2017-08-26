chrome.runtime.getManifest().web_accessible_resources.forEach(function(s) {
	let script = document.createElement('script');
	
	script.src = chrome.extension.getURL(s);
	
	script.onLoad = function() {
		script.remove();
	}
	
	document.head.appendChild(script);
});