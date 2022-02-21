const hb = require('handlebars');

hb.registerHelper('format_date', function(date) {
    date = new Date();
        y = date.getFullYear();
        m = date.getMonth() + 1;
        d = date.getDate();
   
        return m + "/" + d + "/" + y;
})
