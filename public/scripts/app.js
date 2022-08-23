// Client facing scripts here
const createCardElement = (cardData) => {
//   console.log(cardData);
//   if (cardData.sold === false) {
//     return `<div class="card-tile">
//       <img src="${cardData.image_url}"></img>
//       <div class="name-and-price">
//         <h3>${cardData.name}</h3>
//         <h3>$${cardData.price}</h3>
//         <form id="mark-as-sold" method="POST" action="/listings/sold/${cardData.id}" name="mark-as-sold">
//           <button class="form-submit-button" type="submit" name="sold-button">Mark As Sold</button>
//         </form>
//       </div>
//     </div>`;
//   } else {
//     return `<div class="card-tile" class="sold">
//       <img src="${cardData.image_url}" class="sold-card"></img>
//       <div class="sold-text">SOLD</div>
//       <div class="name-and-price">
//         <h3>${cardData.name}</h3>
//         <h3>$${cardData.price}</h3>
//       </div>
//     </div>`;
//   }
// };
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

  $("#mark-as-sold").submit((event) => {
    event.preventDefault();
    const id = event.currentTarget.action.slice(-1);
    $.post(`/listings/sold/${id}`, $("#mark-as-sold").serialize())
      .fail(() => {
        alert("Could not mark as sold, please try again.");
      })
      .done((data) => {
        renderCards(data);
      });
  });
});
