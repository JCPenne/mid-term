// Client facing scripts here
const createCardElement = (cardData, userID) => {
  if (cardData.sold === false && userID === "1") {
    return `<div class="card-tile">
        <img src="${cardData.image_url}"></img>
        <div class="name-and-price">
          <h3>${cardData.name}</h3>
          <h3>$${cardData.price}</h3>
          <form id="mark-as-sold" name="mark-as-sold">
            <input type="hidden" value="${cardData.id}">
            <button class="form-submit-button" type="submit" name="sold-button">Mark As Sold</button>
          </form>
        </div>
      </div>`;
  }
  if (cardData.sold !== false && userID === "1") {
    return `<div class="card-tile" class="sold">
        <img src="${cardData.image_url}" class="sold-card"></img>
        <div class="sold-text">SOLD</div>
        <div class="name-and-price">
          <h3>${cardData.name}</h3>
          <h3>$${cardData.price}</h3>
        </div>
      </div>`;
  } else {
    return `<div class="card-tile">
    <img src="${cardData.image_url}"></img>
    <div class="name-and-price">
      <h3>${cardData.name}</h3>
      <h3>$${cardData.price}</h3>
    </div>
  </div>`;
  }
};

const renderCards = (cards, userID) => {
  $(".card-tiles-container").empty();
  for (const card of cards) {
    $(".card-tiles-container").append(createCardElement(card));
  }
  return userID;
};

$(document).ready(() => {
  $("#new-listing-form").submit((event) => {
    event.preventDefault();
    userID = event.currentTarget.id;
    $.post("/listings/json", $("#new-listing-form").serialize())
      .fail(() => {
        alert(`all fields must be filled. Could not add to your listings!`);
      })
      .done((data) => {
        console.log(data);
        renderCards(data, userID);
      });
  });

  $("#search-form").submit((event) => {
    event.preventDefault();
    console.log(event.currentTarget.id);
    $.post("/search", $("#search-form").serialize())
      .fail(() => {
        alert(`Could not search.`);
      })
      .done((data) => {
        renderCards(data.allCards);
      });
  });

  $(".card-tiles-container").submit((event) => {
    event.preventDefault();
    const id = event.originalEvent.target[0].value;
    $.post(`/listings/sold/${id}`, $("#mark-as-sold").serialize())
      .fail(() => {
        alert("Could not mark as sold, please try again.");
      })
      .done((data) => {
        console.log(data);
        renderCards(data);
      });
  });
});
