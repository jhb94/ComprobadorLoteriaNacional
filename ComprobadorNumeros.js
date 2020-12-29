
const https = require('https');

const llamarApi = async (numero) => {

	const options = {
	  hostname: 'api.elpais.com',
	  //port: 443,
	  path: '/ws/LoteriaNavidadPremiados?n=' + numero,
	  method: 'GET'
	};

	return new Promise(function(resolve, reject){

		const req = https.request(options, res => {
		//console.log(`statusCode: ${res.statusCode}`);

		res.on('data', d => {
			
		    process.stdout.write("El premio del número es: " + d + "\n");
		    resolve(d);
		  })
		})

		req.on('error', error => {
		  console.error(error);
		  reject(error);
		})

		req.end();

	});

};

const loop = async () => {

	var numeros = [ '03287', '12412', '48640', '89190', '40644', '52085', '48679', '64746', '86526', '86335'];

	for (var j = 0; j < numeros.length; j++){

		console.log("Comprobando número: " + numeros[j] + " ...");

		await llamarApi(numeros[j]).then( function(resultado){
			//console.log(resultado);
			}).catch(function(err){
			console.log("Error llamando al número, prueba otra vez.");
		});
	}
};

loop();


