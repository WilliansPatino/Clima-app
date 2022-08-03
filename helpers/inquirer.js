const inquirer = require('inquirer');
require('colors');

const menuOptions = [
  {
    type: 'list',
    name: 'selectedOptionInMenu',
    message: '¿Qué desea hacer?',
    choices: [
      {
        value: 1,
        name: `${ '1'.cyan } Buscar un lugar`
      },
      {
        value: 2,
        name: `${ '2'.cyan } Ver historial`
      },
      {
        value: 0,
        name: `${ '3'.cyan } Salir`
      },
    ]
  }
];

const inquirerMenu = async() => {

  console.clear();
  console.log('=== Búsqueda de lugares y su clima  ==='.green);
  console.log('  Seleccione una opción '.white);
  console.log('======================================='.green);

  const { selectedOptionInMenu } = await inquirer.prompt(menuOptions);

  return selectedOptionInMenu;

}

const pauseMenu = async() => {

  const question = [
    {

      type: 'input',
      name: 'enter',
      message: `Pulse ${ '<ENTER>'.green } para continuar`
    }
  ];
  
  console.log('\n');
  await inquirer.prompt(question);
}



const readInput = async( message ) => {

  const question = [
    {
      type: 'input',
      name: 'place',
      message: '¿Lugar:?',
      validate( answer ) {
        if (!answer) {
          return 'Indique el País,Ciudad o Locación de referencia';
        }
        return true;
      }
    }    // end input
     /* {
      type: 'input',
      name: 'category',
      message: '¿Categoría?',
      // default: 'General',
      validate( value ) {
        if (value.lenght === 0) {
          return 'Favor escribe una etiqueta para categorizar esta tarea';
        }
        return true;
      }
    } */

  ];

  const { place }  = await inquirer.prompt(question);
  return place;
}



const listAll = async( places = [] ) => {

    const choices = places.map( (place, i) => {

      const idx = `${ i + 1}.`.green;

      return {
        value: place.id,
        name: `${ idx } ${ place.nombre }`
      }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });

    const selectFromList = [
          {
            type: 'list',
            name: 'id',
            message: 'Elija una de la lista >',
            choices
          }
      ]

      const { id } = await inquirer.prompt(selectFromList);
      return id;
}

const confirmOption = async(message) => {
    const question = [
        {
          type: 'confirm',
          name: 'ok',
          message: `¿Está seguro?`
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const showChecklist = async ( places = [] ) => {

    const choices = places.map( (place, i) => { 
        const idx = `${ i + 1 }.`.green;

        return {
            value: place.id,
            name: `${ idx } ${ place.description }`,
            checked: ( place.concluded ) ? true : false
        }
    });

    const toSelectOrNot = [
        {
          type: 'checkbox',
          name: 'ids',
          message: 'Seleccione\n ',
          choices
        }
      ]

      const { ids } = await inquirer.prompt(toSelectOrNot);
      return ids;

}


module.exports = {
    inquirerMenu,
    pauseMenu,
    readInput,
    listAll,
    confirmOption,
    showChecklist
}
