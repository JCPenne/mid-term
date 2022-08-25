// Client facing scripts here
$(document).ready(() => {
  const createCardElement = (cardData, userID) => {
    console.log(userID);
    if (cardData.sold === false && userID === "1") {
      console.log(`userID match`, cardData.sold === false);
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

  const createCardElementWithButton = (cardData, userID) => {
    if (cardData.sold === false && userID === "1") {
      return `<div class="card-tile">
        <img src="${cardData.image_url}"></img>
        <button id="favorite-button-id" class="btn fa-solid fa-heart favorite-button ${
          cardData.active ? "highlight-red" : ""
        }" data-id="${cardData.id}"></button>
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
        <button id="favorite-button-id" class="btn fa-solid fa-heart favorite-button ${
          cardData.active ? "highlight-red" : ""
        }" data-id="${cardData.id}"></button>
        <div class="sold-text">SOLD</div>
        <div class="name-and-price">
          <h3>${cardData.name}</h3>
          <h3>$${cardData.price}</h3>
        </div>
      </div>`;
    } else {
      return `<div class="card-tile">
    <img src="${cardData.image_url}"></img>
    <button id="favorite-button-id" class="btn fa-solid fa-heart favorite-button ${
      cardData.active ? "highlight-red" : ""
    }" data-id="${cardData.id}"></button>
    <div class="name-and-price">
      <h3>${cardData.name}</h3>
      <h3>$${cardData.price}</h3>
    </div>
  </div>`;
    }
  };

  //<button id="favorite-button-id" class="btn fa-solid fa-heart favorite-button <%= cards.active ? 'highlight-red':'' %>" data-id="<%= cards.id %>"></button>




  const renderCards = (cards, userID) => {
    $(".card-tiles-container").empty();
    for (const card of cards) {
      $(".card-tiles-container").append(createCardElement(card, userID));
    }
  };

  const renderCardsWithButton = (cards, userID) => {
    $(".card-tiles-container").empty();
    for (const card of cards) {
      $(".card-tiles-container").append(createCardElementWithButton(card));
    }
    addHighlightRed();
    return userID;
  };

  $("#new-listing-form").submit((event) => {
    event.preventDefault();
    userID = document.cookie.split("=")[1];
    $.post("/listings/json", $("#new-listing-form").serialize())
      .fail(() => {
        alert(`all fields must be filled. Could not add to your listings!`);
      })
      .done((data) => {
        renderCards(data, userID);
      });
  });

  $("#search-form").submit((event) => {
    event.preventDefault();
    $.post("/search", $("#search-form").serialize())
      .fail(() => {
        alert(`Could not search.`);
      })
      .done((data) => {
        renderCardsWithButton(data.allCards);
      });
  });

  $(".card-tiles-container").submit((event) => {
    userID = document.cookie.split("=")[1];
    event.preventDefault();
    const id = event.originalEvent.target[0].value;
    $.post(`/listings/sold/${id}`, $("#mark-as-sold").serialize())
      .fail(() => {
        alert("Could not mark as sold, please try again.");
      })
      .done((data) => {
        renderCards(data, userID);
      });
  });

$("#all-conversations").submit((event) => {
  event.preventDefault();
  const id = event.originalEvent.target[0].value;
  $.get(`/conversations/${id}`, $(".conversation-button").serialize())
    .fail(() => {
      alert("Could not get conversation");
    })
    .done((data) => {
      console.log(`ajax data = `, data);
      renderMessages(data);
    });
});

$("#conversation").submit((event) => {
    event.preventDefault();
    const id = event.originalEvent.target[0].value;
    $.post(`/conversations/${id}`, $(".textbox-input").serialize())
      .fail(() => {
        alert("Could not get input");
      })
      .done((data) => {
        console.log(data);
        renderMessages(data);
      });
  });

const renderMessages = (messages) => {
  $("#conversation-textbox").empty();
  // console.log(`messages in our renderMessages function = `, messages);
  for (let message of messages) {
    $("#conversation-textbox").append(
      displayUserElement(message),
      displayMessageElement(message)
    );
  }
};

const displayUserElement = (data) => {
  if (data.sender_id === 1) {
    return `<div class="user">${data.name}</div>`;
  } else {
    return `<div class="user2">${data.name}</div>`;
  }
};

const displayMessageElement = (data) => {
  if (data.sender_id === 1) {
    return `<div class="user">${data.message}</div>`;
  } else {
    return `<div class="user2">${data.message}</div>`;
  }
};

const addHighlightRed = function () {
  $(".favorite-button").click((event) => {
    event.preventDefault();
    console.log(event.target);
    $.post("/like", { id: $(event.target).data("id") })
      .fail(() => {
        alert(`Could not like card.`);
      })
      .done((data) => {
        if ($(event.target).hasClass("highlight-red")) {
          $(event.target).removeClass("highlight-red");
        } else {
          $(event.target).addClass("highlight-red");
        }
      });
  });
};
addHighlightRed();
});
