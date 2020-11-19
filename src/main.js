import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Epic from './js/epic-service.js';

function clearFields()  {
  $('#date').val("");
}

function getElements(response) {
  if (response.photos)  {
    $('.show-rover').text(`This picture was taken on ${response.photos[0].earth_date} by the ${response.photos[0].rover.name} rover!`);
    $('.show-image').html(`<img src=${response.photos[0].img_src}>`);
  } else {
    $('.show-errors').text(`There was an error processing your request: ${response}`);
  }
}

async function makeApiCall(date) {
  const response = await Epic.getImage(date);
  getElements(response);
}

$(document).ready(function() {
  $("#formOne").submit(function(event) {
    event.preventDefault();
    let date = $("#date").val();
    clearFields();
    makeApiCall(date);
  });
}); 