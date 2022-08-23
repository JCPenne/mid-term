$(document).ready(() => {
  $("#new-listing-form").submit((event) => {
    event.preventDefault();
    $.post("/listings/json", $("#new-listing-form").serialize())
      .fail(() => {
        alert(`all fields must be filled. Could not add to your listings!`);
      })
      .done((data) => {
        renderCards(data);
      });
  });

  $("#search-form").submit((event) => {
    event.preventDefault();
    $.post("/search", $("#search-form").serialize())
    .fail(() => {
      alert(`Could not search.`);
    })
    .done((data) => {
      renderCards(data.allCards);
    });
  });

  $(".favorite-button").click((event) => {
    event.preventDefault();
    console.log($(".favorite-button"));
    $.post("/like",{id: $(event.target).data("id")})
    .fail(() => {
      alert(`Could not like card.`);
    })
    .done((data) => {
      $(event.target).addClass("highlight-red");
      console.log("HERE " + data);
    });
  });
});

// Client facing scripts here
const createCardElement = (cardData) => {
  return `<div class="card-tile">
  <img src="${cardData.image_url}"></img>
  <div class="name-and-price">
    <h3>${cardData.name}</h3>
    <h3>$${cardData.price}</h3>
  </div>
</div>`;
};

const renderCards = (cards) => {
  $(".card-tiles-container").empty();
  for (const card of cards) {
    $(".card-tiles-container").append(createCardElement(card));
  }
};
