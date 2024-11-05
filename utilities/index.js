const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
// Util.getNav = async function (req, res, next) {

//     let data = await invModel.getClassifications()
//     let list = "<ul>"
//     list += '<li><a href="/" title="Home page">Home</a></li>'
//     data.rows.forEach((row) => {
//         list += "<li>"
//         list +=
//             '<a href="/inv/type/' +
//             row.classification_id +
//             '" title="See our inventory of ' +
//             row.classification_name +
//             ' vehicles">' +
//             row.classification_name +
//             "</a>"
//         list += "</li>"
//     })
//     list += "</ul>"
//     return list
// }

Util.getNav = async function () {
    try {
        // Attempt to retrieve classifications for navigation
        let data = await invModel.getClassifications();
        let list = "<ul>";
        list += '<li><a href="/" title="Home page">Home</a></li>';

        data.rows.forEach((row) => {
            list += "<li>";
            list +=
                '<a href="/inv/type/' +
                row.classification_id +
                '" title="See our inventory of ' +
                row.classification_name +
                ' vehicles">' +
                row.classification_name +
                "</a>";
            list += "</li>";
        });

        list += "</ul>";
        return list;
    } catch (err) {
        console.error("Error generating navigation:", err.message);
        // Throw the error to be handled by the Express error handler
        throw new Error("Failed to generate navigation");
    }
};

module.exports = Util

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function (data) {
    let grid
    if (data.length > 0) {
        grid = '<ul id="inv-display">'
        data.forEach(vehicle => {
            grid += '<li>'
            grid += '<a href="../../inv/detail/' + vehicle.inv_id
                + '" title="View ' + vehicle.inv_make + ' ' + vehicle.inv_model
                + 'details"><img src="' + vehicle.inv_thumbnail
                + '" alt="Image of ' + vehicle.inv_make + ' ' + vehicle.inv_model
                + ' on CSE Motors" /></a>'
            grid += '<div class="namePrice">'
            grid += '<hr />'
            grid += '<h2>'
            grid += '<a href="../../inv/detail/' + vehicle.inv_id + '" title="View '
                + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">'
                + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
            grid += '</h2>'
            grid += '<span>$'
                + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
            grid += '</div>'
            grid += '</li>'
        })
        grid += '</ul>'
    } else {
        grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
    }
    return grid
}

/* **************************************
* Build the detail view HTML
* ************************************ */
Util.buildCarModelPage = async function (car) {
    let page = ''; // Initialize as an empty string

    if (car) { // Check if the car object is defined
        page += `<div id="car-detail">`;
        page += `<h2>${car.inv_make} ${car.inv_model}</h2>`;
        page += `<img src="${car.inv_image}" alt="Image of ${car.inv_make} ${car.inv_model} on CSE Motors" />`;
        page += `<div class="price">`;
        page += `<span>$${new Intl.NumberFormat('en-US').format(car.inv_price)}</span>`;
        page += `</div>`;
        page += `<div class="description">${car.inv_description}</div>`; // Assuming you have a description field
        page += `</div>`;
    } else {
        page += '<p class="notice">Sorry, no matching vehicle could be found.</p>';
    }

    return page;
}