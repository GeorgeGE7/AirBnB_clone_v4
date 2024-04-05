$(document).ready(function () {
  let amenitiesObj = {};
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
