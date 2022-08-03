// import { writeFileSync, existsSync, readFileSync } from 'fs';
const fs = require('fs');

const myFile = './db/database.json';

const fd = 0;

const saveDB = (data) => {


	fs.writeFileSync( myFile, JSON.stringify(data), (err) => {
		if (err) throw err;
		console.log('Was saved!');
	} );
}

const readDB = () => {

	if ( !fs.existsSync(myFile) ) {
		return null;
	} else {
		openDB();
	}

	const info = fs.readFileSync(myFile, { encoding: 'utf-8'} );
	const data = JSON.parse( info );

	return data;
}

const openDB = () => {

	file_d = fs.openSync(myFile);
	console.log('File descriptor is: ', file_d);

	return file_d;

}

const closeDB = () => {
   
  	fs.close(fd, (err) => {
		  if (err)
		    console.error('Failed to close file', err);
		  else {
		    console.log("\n> File Closed successfully");
		  }
		});
}

module.exports =  { saveDB, readDB, openDB, closeDB };