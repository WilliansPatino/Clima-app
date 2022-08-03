require('dotenv').config() // read 

const { 
  inquirerMenu,
  pauseMenu,
  readInput,
  listTasksForDelete,
  confirmOption,
  showChecklist,
  listAll
 } = require("./helpers/inquirer");
const SearchPlace = require('./models/search_location');



// environment
// console.log(process.env.MAPBOX_KEY);
// console.log(process.env.MAPBOX_KEY2);


const main = async() => {

    let menuOptions;
    const search = new SearchPlace();

    // read history

    do {
      // menu
      menuOptions = await inquirerMenu();
      // console.log( {menuOptions} );
  
      switch (menuOptions) {
        case 1:
          //  ( ./helpers/inquirer)  
          const place  = await readInput() ;
          
          // Buscar lugares
          const places = await search.city(place);

          // Elegir un lugar
          const id = await listAll(places);

          // Return to main menu 
          if ( id === '0') continue;

          const selectedPlace = places.find ( p => p.id === id );

          // Guardar en archivo
          search.saveHistory(selectedPlace.nombre);

          // Ver clima
          const climate = await search.weatherReport( selectedPlace.lat, selectedPlace.lng);

          // Mostrar resultados
          console.log('\n--Información--\n');
          console.log('Localidad:', selectedPlace.nombre);
          console.log('Lat:', selectedPlace.lat);
          console.log('Long:', selectedPlace.lng);
          console.log('-Temperatura', climate.temp);
          console.log('Min:', climate.min);
          console.log('Max:', climate.max);
        break;
        case 2:
          // Show history
          search.capitalizedHistory.forEach( (place, i) => { 
              const indice = `${ i + 1}.`.bgGreen;
              console.log(` ${ indice } ${ place } `);
          })
        break;
       
      }
  

  
        // ( ./helpers/inquirer)
      if ( menuOptions !== 0 )  await pauseMenu();
  
    } while ( menuOptions !== 0);

    search.closeDB();

}



main();