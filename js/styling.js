$(window).on('scroll', function() {
    jQuery('.skillbar').each(function(){
        var pos = $(this).offset().top;
        var winTop = $(window).scrollTop();
        if (pos < winTop + $(window).height()){
            jQuery(this).find('.skillbar-bar').animate({
                width:jQuery(this).attr('data-percent')
            },6000);
        }
    });
});

//
function addendum() {
  const endings = [
    'natural language processing',
    'web development',
    'Agile development',
    'Python',
    'machine learning'
  ];

  let delay = 0;

  let currentEnding= -1;
  let i = 0;
  let yy = setInterval(() => {
    if (i === endings[3].length) {
      clearInterval(yy);
    } else {
      $('.addendum').text(endings[3].slice(0, ++i));
    }
  }, 35);

  setInterval(() => {
    currentEnding = ++currentEnding % endings.length;
    i = 0;
    let endingContent = endings[currentEnding] + '.';
      let x = setInterval(() => {
        if (i === endingContent.length) {
          clearInterval(x);
        } else {
          $('.addendum').text(endingContent.slice(0, ++i));
        }
      }, 35);

      setTimeout(() => {
        let y = setInterval(() => {
          if (!i) {
            clearInterval(y);
          } else {
            $('.addendum').text(endingContent.slice(0, --i));
          }
        }, 35);
      }, (4000-35*endingContent.length));

  }, 4000);
}

function animateSelfStatement() {
  const statement = "I graduated May 2018 from Rensselaer Polytechnic Institute and currently work at Annalect in " +
      "New York. Look below for my personal, educational, and professional experience in";
  let i = 0;
  let z = setInterval(() => {
    if (i++ === statement.length) {
      addendum();
      clearInterval(z);
    } else {
      $('#self-statement-core').text(statement.slice(0, i));
    }
  }, 25);
}

/* Functions for rotating skill cards and initials. */
function getTransformValue(v1, v2, value) {
  let val = ((v1 / v2 * value - value / 2) * 1);
  return val.toFixed(1);
}

function cardAnimations() {
  // Transform the card on mousemove
  document.addEventListener('mousemove', function (event) {
      let card_x = getTransformValue(event.clientX, window.innerWidth, 56, true);
      let card_y = -getTransformValue(event.clientY, window.innerHeight, 56);
      $(".floating").css("transform", "rotateX(" + card_y / 1 + "deg) rotateY(" + card_x + "deg)");
  });
}

window.onload = function () {
  cardAnimations();
  animateSelfStatement();
};

