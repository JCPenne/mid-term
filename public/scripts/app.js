// Client facing scripts here
$(document).ready(() => {
  const createCardElement = (cardData, userID) => {
    if (cardData.sold === false && userID === "1") {
      return `<div class="card-tile">
        <img src="${cardData.image_url}"></img>
        <button id="favorite-button-id" class="btn fa-solid fa-heart favorite-button ${cardData.active ? "highlight-red" : ""}" data-id="${cardData.id}"></button>
        <div class="name-and-price">
          <h3>${cardData.name}</h3>
          <h3>$${cardData.price}</h3>
          <form id="mark-as-sold" name="mark-as-sold">
            <input type="hidden" value="${cardData.id}">
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
    console.log("createCardElement ID: " + userID);
    if (userID == 2) {
      console.log("hit on 2");
      return `<div class="card-tile">
    <img src="${cardData.image_url}"></img>
    <button id="favorite-button-id" class="btn fa-solid fa-heart favorite-button ${cardData.active ? "highlight-red" : ""}" data-id="${cardData.id}"></button>
    <div class="name-and-price">
      <h3>${cardData.name}</h3>
      <h3>$${cardData.price}</h3>
    </div>
  </div>`;
    } else if (userID == 1) {
      console.log("Hit on 1")
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

  const renderCardsWithButton = (cards, userID) => {
    $(".card-tiles-container").empty();
    for (const card of cards) {
      $(".card-tiles-container").append(createCardElementWithButton(card, userID));
    }
    addHighlightRed();
    return userID;
  };

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
        renderCardsWithButton(data.allCards, data.userID);
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

  const renderMessages = (messages) => {
    $("#conversation-textbox").empty();
    // console.log(`messages in our renderMessages function = `, messages);
    for (let message of messages) {
      $("#conversation-textbox").append(
        createNewUserElement(message),
        createNewMessageElement(message)
      );
    }
  };

  const createNewUserElement = (data) => {
    return `<div class="user">${data.sender_id}</div>`;
  };

  const createNewMessageElement = (data) => {
    return `<div class="message">${data.message}</div>`;
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
