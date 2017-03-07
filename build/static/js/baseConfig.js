function Skirt(){
	this.console = function(msg){
		console.log(msg);
	};
}

Skirt.prototype.touchModule = function(){
	var events = {
		start:"",
		move: "",
		end: ""
	};
}



(function(w){
	//skirt函数
	var config = w.document.documentElement.dataset;
	
	
	
	w.skirt = new Skirt();
})(window !== undefined ? window : this);
