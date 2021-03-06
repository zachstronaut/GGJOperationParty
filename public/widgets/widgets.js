Math.clamp = function(t, min, max){
	return Math.min(Math.max(min, t), max);
}

Math.clamp01 = function(t){
	return Math.clamp(t, 0, 1);
}

var preload,

    setupWidget,
    
    widgetFactories = {},
    
    widgetInputScale = 1,
    
    createWidget = function (canvas, widgetData) {
        setupWidget(canvas, function (widget) {
            console.log('create ' + widgetData.type);
            (widgetFactories[widgetData.type])(widget);
            
            widget.valueChanged = function (value) {
                console.log('Widget type: ' + widget.type + ' changing to: ' + value);
                socket.emit('widgetChanged', {
                    type: widget.type,
                    name: widget.name,
                    value: value
                });
            };
            
            if (typeof document.body.ontouchstart == 'undefined') {
                var emap = function (e) {
                        return {offsetX: e.offsetX * widgetInputScale, offsetY: e.offsetY * widgetInputScale};
                    };
                
                var mdproxy = widget.canvas.onmousedown;
                if (mdproxy) {
                    widget.canvas.onmousedown = function (e) {
                        mdproxy(emap(e));
                    };
                }
                
                var mmproxy = widget.canvas.onmousemove;
                if (mmproxy) {
                    widget.canvas.onmousemove = function (e) {
                        mmproxy(emap(e));
                    };
                }
                
                var muproxy = widget.canvas.onmouseup;
                if (muproxy) {
                    widget.canvas.onmouseup = function (e) {
                        muproxy(emap(e));
                    };
                }
            }
        });
    };
    

(function(){
	function preloadImages(urls, oncomplete){
		var images = {};
		
		function loadImg(url){
			var img = new Image();
			img.src = "/widgets/" + url;
			
			img.onload = function(){
				images[url] = img;
				console.log("loaded: " + url)
				if(Object.keys(images).length == urls.length){
					oncomplete();
				}
			}
			
			img.onerror = function(){
				console.log("Error loading: " + url);
			}
		}
		
		for(i=0; i<urls.length; i++){
			setTimeout(loadImg(urls[i]), 1)
		}
		
		return images;
	}
	
	var images;
	
	preload = function(oncomplete){
		images = preloadImages([
			'red-button.png',
			'green-button.png',
			'bellows.png',
			'chest-bg.png',
			'chest-fg.png',
			'tmp-button-up.png',
			'tmp-button-down.png',
			'tmp-dial-bg.png',
			'tmp-dial.png',
			'tmp-slider-bg.png',
			'tmp-slider.png',
			'red-pill.png',
			'blue-pill.png',
			'green-pill.png',
			'Defib0.png',
			'DefibButton.png',
			'DefibLevel.png',
			'PickNose0.png',
			'PickNose1.png',
			'PumpHeart0.png',
			'PumpHeart1.png',
			'syringe-bg.png',
			'syringe-fg.png',
			'syringe-plunger.png',
			'plug-artery-bg.png',
			'plug-artery-fg.png',
			'Feet0.png',
			'Feet2.png',
			'clear-bg.png',
			'clear-fg1.png',
			'clear-fg2.png',
		], oncomplete);
	}
	
	setupWidget = function(canvas, setupComplete){
		// Prevent scrolling on iOS
		document.ontouchstart = function(e){
			e.preventDefault();
		}
		
		var widget = {canvas:canvas, images:images}
		var ctx = widget.ctx = canvas.getContext('2d');
		
		ctx.fillStyle = "magenta";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		// Emulate mouse input on iOS
		var touchID = null;
		
		function convertTouch(touch){
			var offset = $(canvas).offset();
			return {
				offsetX:(touch.clientX - offset.left)*widgetInputScale,
				offsetY:(touch.clientY - offset.top)*widgetInputScale
			}
		}
		
		canvas.ontouchstart = function(e){
			if(touchID != null) return;
			
			var touch = e.changedTouches[0];
			touchID = touch.identifier || true;
			
			if(canvas.onmousedown) canvas.onmousedown(convertTouch(touch));
		}
		
		canvas.ontouchmove = function(e){
			var touches = e.changedTouches || e.touches;
			for(i=0; i<touches.length; i++){
				var touch = touches[i];
				if (touchID === true || touch.identifier == touchID){
					if(canvas.onmousemove) canvas.onmousemove(convertTouch(touch));
					break;
				}
			}
		}
		
		canvas.ontouchend = function(e){
			var touches = e.changedTouches || e.touches;
			for(i=0; i<touches.length; i++){
				var touch = touches[i];
				if (touchID === true || touch.identifier == touchID){
					var converted = convertTouch(touch);
					if(canvas.onmouseup) canvas.onmouseup(converted);
					if(canvas.onclick) canvas.onclick(converted);
					touchID = null;
					break;
				}
			}
		}
		
		widget.valueChanged = function(value){
			console.log('valueChanged', value);
		}
		
		setupComplete(widget)
		
		function getTime(){
			return (new Date()).getTime()*1e-3;
		}
		
		var lastTime = getTime();
		var timeout = null;
		function update(){
			var time = getTime();
			var dt = time - lastTime;
			widget.update(dt);
			timeout = setTimeout(update, 33);
			
			lastTime = time;
		}
		
		if(widget.update) setTimeout(update, 0);
	}
})();