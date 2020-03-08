const numDivs = 36;
const maxHits = 10;

let hits = 0;
let fails = 0;
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
    $('#button-reload').css('visibility', 'visible');
  $(".miss").removeClass("miss");
  let divSelector = randomDivId();
  $(divSelector).addClass("target");

  // TODO: помечать target текущим номером

  // FIXME: тут надо определять при первом клике firstHitTime

  if (hits === 1) {
    firstHitTime = getTimestamp()
  }
  if (hits < maxHits) {
    $(divSelector).text(hits + 1);
  }

  if (hits === maxHits) {
    endGame();
  }

$("#button-start").hide();
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $(".game-field").hide();
  
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
  let scores = hits - fails;
  $("#totalScores").text(scores);
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?

  if ($(event.target).hasClass("target")) {

    hits = hits + 1;
  $(event.target).removeClass('target');
  $(event.target).text("");

    round();

  } else {
    $(event.target).addClass("miss");
    fails = fails + 1;
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#button-start").click(round);

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
  
}

$(document).ready(init);