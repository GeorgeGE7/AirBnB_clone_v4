let amenitiesObj = {};
$(document).ready(function () {
  $(document).on("change", "input[type='checkbox']", function () {
    if (this.checked) {
      amenitiesObj[$(this).data("id")] = $(this).data("name");
    } else {
      delete amenitiesObj[$(this).data("id")];
    }
    const amenitiesObjValues = Object.values(amenitiesObj);
    if (amenitiesObjValues?.length > 0) {
      $("div.amenities > h4").text(Object.values(amenitiesObj).join(", "));
    } else {
      $("div.amenities > h4").html("&nbsp;");
    }
  });
});

$(document).ready(function () {
  $.get("http://0.0.0.0:5001/api/v1/status/", function (apiData) {
    if (apiData.status === "OK") {
      $("div#api_status").addClass("available");
    } else {
      $("div#api_status").removeClass("available");
    }
  }).fail(function () {
    $("div#api_status").removeClass("available");
  });
});

$(document).ready(function () {
  $.post({
    url: `http://0.0.0.0:5001/api/v1/places_search`,
    data: JSON.stringify({}),
    headers: {
      "Content-Type": "application/json",
    },
    success: (data) => {
      data.forEach((item) =>
        $("section.items").append(
          `<article>
			      <div class="title_box">
			      <h2>${item.name}</h2>
			      <div class="price_by_night">$${item.price_by_night}</div>
			      </div>
			      <div class="information">
			      <div class="max_guest">${item.max_guest} Guest${
                  item.max_guest !== 1 ? "s" : ""
                }</div>
			      <div class="number_rooms">${item.number_rooms} Bedroom${
                  item.number_rooms !== 1 ? "s" : ""
                }</div>
			      <div class="number_bathrooms">${item.number_bathrooms} Bathroom${
                  item.number_bathrooms !== 1 ? "s" : ""
                }</div>
			      </div> 
			      <div class="description">
			      ${item.description}
			      </div>
				  </article>`
        )
      );
    },
    dataType: "json",
  });
});

$(document).ready(function () {
  $('.filters button').click(function () {
    const userList = [];
    for (const key in amenitiesObj) {
		userList.push(amenitiesObj[key]);
	}
    $.post({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify({"amenities": userList}),
      headers: {
        'Content-Type': 'application/json',
      },
      success: (data) => {
        $('section.places').empty()
        data.forEach((place) =>
          $('section.places').append(
					`<article>
			<div class="title_box">
			<h2>${place.name}</h2>
			<div class="price_by_night">$${place.price_by_night}</div>
			</div>
			<div class="information">
			<div class="max_guest">${place.max_guest} Guest${
						place.max_guest !== 1 ? 's' : ''
				}</div>
			<div class="number_rooms">${place.number_rooms} Bedroom${
						place.number_rooms !== 1 ? 's' : ''
					}</div>
			<div class="number_bathrooms">${place.number_bathrooms} Bathroom${
						place.number_bathrooms !== 1 ? "s" : ""
					}</div>
			</div> 
			<div class="description">
			${place.description}
			</div>
				</article>`
        ));
    },
		dataType: 'json',
	});
  });	
})
