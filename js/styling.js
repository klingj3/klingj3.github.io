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

