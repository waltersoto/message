(function(global){
	
	var elemId = "__message_box___build_0_0_1";
	var veilId = elemId+"__veil";
	var innerBoxId = elemId + "__inner";
	var cancelButtonId = elemId + "__cancel";
	var acceptButtonId = elemId + "__accept";
    var emptySpace = "\u00A0";

    var modalFunction = null;
    var modalMode = false;

    var defaultAcceptLabel = "OK";
    var defaultCancelLabel = "CANCEL";

    var classes = {
        mainBox: "js-message-box",
        innerBox: "js-message-box-inner",
        buttonArea: "js-message-box-button-area",
        button: "js-message-box-button"
    };
 
	var $ = function(id){
		return document.getElementById(id);
	}
	 
	var createVeil = function(){
	
		var veil = document.createElement("div");
		veil.setAttribute("id",veilId); 
		veil.style.position = "fixed";
		veil.style.backgroundColor = "#666";
		veil.style.opacity = "0.7";
		veil.style.zIndex = "9000"; 
		veil.style.left = "0";
		veil.style.top = "0";
		veil.style.visibility = "none";
		veil.style.height = Math.max(
                    Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
                    Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),
                    Math.max(document.body.clientHeight, document.documentElement.clientHeight)
                ) + "px";
         veil.style.width = Math.max(
                  Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
                  Math.max(document.body.offsetWidth, document.documentElement.offsetWidth),
                  Math.max(document.body.clientWidth, document.documentElement.clientWidth)
              ) + "px";
			  
		
		return veil; 
	};
	
	var createTxtBox = function(){
	 
		var box = document.createElement("div");
		box.setAttribute("id", elemId); 
	    box.className = classes.mainBox; 
		
		var innerBox = document.createElement("div");
		innerBox.setAttribute("id", innerBoxId);
		innerBox.className = classes.innerBox;
         
		box.appendChild(innerBox);
		
		var buttonBox = document.createElement("div");
		buttonBox.className = classes.buttonArea;
		
		var accept = document.createElement("input");
		accept.setAttribute("type", "button");
	    accept.setAttribute("id",acceptButtonId);
		accept.value = defaultAcceptLabel;
		accept.className = classes.button;
         
		accept.onclick = function(){
			$(veilId).style.display = "none";
			$(elemId).style.display = "none";
            if (modalMode) {
                if (typeof modalFunction === "function") {
                    modalFunction();
                }
            }
		};

		var cancel = document.createElement("input");
	    cancel.setAttribute("id", cancelButtonId);
		cancel.setAttribute("type", "button");
		cancel.value = defaultCancelLabel;
	    cancel.style.visibility = "hidden";
	    cancel.className = classes.button;

	    cancel.onclick = function() {
	        $(veilId).style.display = "none";
	        $(elemId).style.display = "none";
	        $(cancelButtonId).style.visibility = " hidden";
	    };

	    buttonBox.appendChild(accept);
	    buttonBox.appendChild(document.createTextNode(emptySpace));
	    buttonBox.appendChild(cancel);

		box.appendChild(buttonBox);		
		
		return box;
	};

    var resetLabels = function(labels) {
        $(cancelButtonId).value = labels.cancel;
        $(acceptButtonId).value = labels.ok;
    };
	
   var displayMessage = function(txt,isModal,custom){
		 
		if(!$(veilId)){
			document.body.appendChild(createVeil());
		}
		if(!$(elemId)){
			document.body.appendChild(createTxtBox());
		}

		var labels = {
		    ok: defaultAcceptLabel,
		    cancel: defaultCancelLabel
		};

		if (custom !== null && typeof custom !== "undefined") {

		    if (custom.hasOwnProperty("ok")) {
		        labels.ok = custom.ok;
		    }
		    if (custom.hasOwnProperty("cancel")) {
		        labels.cancel = custom.cancel;
		    }
		    
		}

		resetLabels(labels);

       modalMode = isModal;
		$(innerBoxId).innerHTML = txt;
		$(veilId).style.display = "block";
		$(elemId).style.display = "block";	
		if (isModal) {
		    $(cancelButtonId).style.visibility = "visible";
		} else {
		    $(cancelButtonId).style.visibility = " hidden";
		}
	};
	
	
	
	if(!global.message){
		global.message = {
			show:function(txt) {
			    displayMessage(txt, false);
			},
			modal: function (txt, callback,customLabels) {
			    modalFunction = callback;
                displayMessage(txt, true,customLabels);
            }
		};
	}
	
})(window);