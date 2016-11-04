L.NumberFormatter = {
	round: function (num,dec,sep) {
		var res = L.Util.formatNum(num,dec)+"",
		numbers=res.split(".");
		if (numbers[1]) {
			var d = dec-numbers[1].length;
			for (; d > 0; d--) {
				numbers[1]+="0";
			}
			res = numbers.join(sep||".");
		}
		return res;
	},

	toDMS : function (deg) {

                var dec = Math.abs(deg);
			deg = Math.floor(dec);

		var min = Math.floor((dec - deg) * 60);
                if (min < 10){
                    min = '0'+min;
                }

		var sec = ((dec - deg - (min/60)) * 3600).toFixed(2);
                if (sec < 10){
                    sec = '0'+sec;
                }


			if (deg < 0) {
				deg = 0 - deg;
			}

                if (deg < 10){
                    deg = '0'+deg;
                }

		return ("" + deg + "&deg; " + min + "' " + sec + "''");
	},

	createValidNumber:function(num,sep){
		if (num&&num.length>0){
			var numbers = num.split(sep||".");
			try{
				var numRes=Number(numbers.join("."));
				if(isNaN(numRes)){
					return undefined;
				}
				return numRes;
			}catch(e){
				return undefined;
			}
		}
		return undefined;
	}
};
