// DISPLAY YEAR, DAY, AND MONTH IN FOOTER

const Handlebars = require('handlebars');               // IMPORT HANDLEBARS

Handlebars.registerHelper('currentYear', () => {        // REGISTER HANDLEBARS HELPER

  const year = new Date().getFullYear();                // GET CURRENT YEAR

  console.log('Current Year:', year); 

  return year;

});

Handlebars.registerHelper('currentDate', () => {

        return new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
        
      });



module.exports = Handlebars;