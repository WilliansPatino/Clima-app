const { default: axios } = require("axios");

/* const params = {
  access_key: '',
  query: 'Caracas'
} */

class Busquedas {

    historial = ['Caracas', 'Suiza', 'Belgica'];

    constructor() {
      // TODO
    
    }

    getparamsPOSITIONSTACK() {
        return {
            'access_key': process.env.POSITIONSTACK_KEY
          }
    }

    async city( place = '' ) {
      

        const URL ='http://api.positionstack.com/v1/forward';

        const params = {
          // access_key: this.getparamsPOSITIONSTACK,
          access_key: process.env.POSITIONSTACK_KEY,
          query: place
        }
      
        try {
            console.log(`Buscando ${place} ...` );
          
            // peticion HTTP
            // const instance = axios.create({
            //   baseURL: `https://api.positionstack.com/v1/forward`,
            //   params: {
            //     access_key: 'cfd9dddac2fc457da21750e5f3455195',
            //     query: place
            //   }
            // });
        
         const res = await axios.get(URL, {params});
   
          // console.log(res.data);

          return res.data.map( place => ({
                id: place.region,
                nombre: place.label,
                lng: place.longitud,
                lat: place.latitude
            }))


        } catch (error) {
          console.log('Not found!');
          return [];
        }
      
    }

} 

module.exports = Busquedas;