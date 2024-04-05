$(document).ready(function() {
  $('input[type="checkbox"]').on('change', function() {
    let amenities = [];
    $('input[type="checkbox"]:checked').each(function() {
      amenities.push($(this).data('id'))
    });
    $('input[type="checkbox"]:not(:checked)').each(function() {
      const deleteAm = amenities.indexOf($(this).data('id'))
      amenities.splice(deleteAm, 1);
    });

    let amenitiesList = amenities.join(', ');
    $('.amenities h4').text(amenitiesList);
  });
});

