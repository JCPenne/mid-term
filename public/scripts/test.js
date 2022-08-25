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
    