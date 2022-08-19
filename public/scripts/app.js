// Client facing scripts here
const createCardElement = (cardData) => {
  return `<div class="card-tile">
  <img src="${cardData.image_url}"></img>
  <div class="name-and-price">
    <h3>${cardData.name}</h3>
    <h3>${cardData.price}</h3>
  </div>
</div>`;
};

const renderCards = (cards) => {
  $(".card-tiles-container").empty();
  for (const card of cards) {
    $(".card-tiles-container").append(createCardElement(card));
  }
};

$(document).ready(() => {
  $("#new-listing-form").submit((event) => {
    console.log(`logging to hit ajax`);
    event.preventDefault();
    $.post("/listings/json", $("#new-listing-form").serialize())
      .fail(function () {
        alert(`all fields must be filled. Could not add to your listings!`);
      })
      .done(function (data) {
        renderCards(data);
      });
  });
});
