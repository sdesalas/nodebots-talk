var five = require("johnny-five");

var board;

board = new five.Board({port: process.argv[2]});

board.on("ready", function(err) {

    if (err){
        console.log(err);
        return;
    }

    console.info("Board connected. Robot set up");
    console.info("Run the sensors back and forth over the line to get a sense");
    console.info("of what values you're seeing");

	var ir = new five.Sensor({pin: "A1", freq: 200 });

	ir.on('data', function() {
		process.stdout.write('\033c');
		var char;
		if (this.raw > 800) {
			char = ' ';
		} else if (this.raw > 500) {
			char = String.fromCharCode(46);
		} else if (this.raw > 300) {
			char = String.fromCharCode(58);
		} else if (this.raw > 100) {
			char = String.fromCharCode(43);
		} else if (this.raw > 50) {
			char = String.fromCharCode(120);
		} else {
			char = String.fromCharCode(88);
		}
		var text = Array(process.stdout.rows * process.stdout.columns).join(char);
    	console.log(text);
  	});

});

