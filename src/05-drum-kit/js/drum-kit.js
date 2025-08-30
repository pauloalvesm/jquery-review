$(document).ready(function () {
  const sounds = {
    A: "boom.wav",
    S: "clap.wav",
    D: "hihat.wav",
    F: "kick.wav",
    G: "openhat.wav",
    H: "ride.wav",
    J: "snare.wav",
    K: "tink.wav",
    L: "tom.wav",
  };

  const createDiv = function (text) {
    $("<div>")
      .addClass("key")
      .text(text)
      .attr("id", text)
      .appendTo($("#container"));
  };

  const display = (sounds) => Object.keys(sounds).forEach(createDiv);

  const playSound = function (letter) {
    const audio = new Audio(`../../assets/sounds/${sounds[letter]}`);
    audio.play();
  };

  const addEffect = (letter) => $(`#${letter}`).toggleClass("active");

  const removeEffect = function (letter) {
    $(`#${letter}`).on("transitionend", () => {
      $(`#${letter}`).removeClass("active");
    });
  };

  const activateDiv = function (event) {
    const letter =
      event.type === "click"
        ? $(event.target).attr("id")
        : event.key.toUpperCase();

    if (sounds.hasOwnProperty(letter)) {
      addEffect(letter);
      playSound(letter);
      removeEffect(letter);
    }
  };

  display(sounds);

  $("#container").on("click", ".key", activateDiv);
  $(window).on("keyup", activateDiv);
});
