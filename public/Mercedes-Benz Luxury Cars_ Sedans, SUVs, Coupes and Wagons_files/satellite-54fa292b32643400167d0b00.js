_satellite.pushAsyncScript(function(event, target, $variables){
  var startTime = new Date().getTime(), now = startTime;
var intervalId = setInterval(function(){
    now = new Date().getTime();
    if ( !!window.MB_PAGE_INITED && window.MB_PAGE_INITED === 'true' ) { 
		// The DTM code can now run!
		
		$("footer").find(".track-click[href='/mercedes/inventory']").click(function() {
			_satellite.setVar('invLoc',"footer");
			_satellite.track('openInventoryModel');
		});
		
		_satellite.notify("footer inventory button bound",1);
			
        // We ran the DTM code, we can stop the interval.
        clearInterval(intervalId);
    } 
    // The MB_PAGE_INITED was never found or the value was not what was expected and its been 10 seconds
    else if ( (now - startTime > _satellite.getVar('Link Decoration Delay')) ) {
        clearInterval(intervalId);
    }
}, 250);
});
