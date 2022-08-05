const axios  = require("axios");
const fs = require('fs');


class SearchPlace {

    historial = [];
    dbPath = './db/database.json';
    file_d = 0;

    constructor() {
      
      this.openDB();
      this.readDB();
    }

    get paramsMapbox() {
      return {
          'access_token': process.env.MAPBOX_KEY,
          'limit': 5,
          'language': 'es'
        }
    }

    get paramsMapbox2() {
        return {
            'access_token': process.env.MAPBOX_KEY2,
            'limit': 5,
            'language': 'es'
          }
    }

    get paramsWeather() {
      return {
        appid: process.env.OPENWEATHER_KEY,
        units: 'metric',
        lang: 'es'
      }
    }

    get capitalizedHistory() {
      
        return this.historial.map( location => { 

          let words = location.split(' ');
          words = words.map( w => w[0].toUpperCase() + w.substring(1) );

          return words.join(' ');
        })
    }


    async city( location = '' ) {

      try {
          console.log(`Buscando ${location}...`);
        
          // peticion HTTP with instance of axios
          const mapboxClient = axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ location }.json`,
            params: this.paramsMapbox
          });
      
          const res = await mapboxClient.get();

          // console.log(res.data);

          // se devuelve un objeto de manera implícita
          return res.data.features.map( location => ({
                id: location.id,
                nombre: location.place_name,
                lng: location.center[0],
                lat: location.center[1]
            }));

      } catch (error) {
        console.log('\nNot found');
        return [];
      }
    
  }

  async weatherReport(lat, lon) {

    try {
        const openWeatherClient = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: { ... this.paramsWeather, lat, lon }
        })
        const response = await openWeatherClient.get();
        const { weather, main } = response.data;

        // console.log(response.data);
        return {
          desc: weather[0].description,
          min: main.temp_min,
          max: main.temp_max,
          temp: main.temp
        }

    } catch (error) {
        console.log(error);
    }
  }

  saveHistory( location  = '' ) {

    if (this.historial.includes( location.toLocaleLowerCase() )) {
      return;
    }
    // keep a list of ten 
    this.historial = this.historial.splice(0, 9);
    this.historial.unshift(location.toLocaleLowerCase() );

    // save database
    this.saveDB();
    
  }
  saveDB() {
    const payload = {
      historial: this.historial
    };

    fs.writeFileSync( this.dbPath, JSON.stringify(payload), (err) => {
      if (err) throw err;
      console.log('Database saved!');
    });
  }

  readDB() {
    
    if (!fs.existsSync(this.dbPath) ) {
      this.saveDB();
      return null;
    } else {
      this.openDB();
    }
    

    const info = fs.readFileSync( this.dbPath, {encoding: 'utf-8'} );
    const data = JSON.parse(info);

    this.historial = data.historial;
  }

  createDB() {
    
    fs.writeFile(this.dbPath, function (err) {
      if (err) throw err;
      console.log('DB Saved!');
    });

  }

  openDB = () => {

    this.file_d = fs.openSync(this.dbPath);
    console.log('File descriptor is: ', this.file_d);
  
  }

  closeDB = () => {
   
  	fs.closeSync(this.file_d, (err) => {
		  if (err)
		    console.error('Failed to close file', err);
		  else {
		    console.log("\n> File Closed successfully");
		  }
		});
}
  


} 

module.exports = SearchPlace;