

function AddressRepo() {
	this.addresses = [
	{
		host: 'localhost',
		port: 8000
	}			
	];

}

module.exports = new AddressRepo();