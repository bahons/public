$("ul").on("click", ".init", function() {
   $(this).closest("ul").children('li:not(.init)').toggle();
});

function toggleOther(){
   $("ul").on("click", ".init", function() {
      $(this).closest("ul").children('li:not(.init)').toggle();
   });
}

// $("ul.list-unstyled-1").on("click", ".init", function() {
//    $(this).closest("ul.list-unstyled-1").children('li:not(.init)').toggle();
// });

// var allOptions1 = $("ul.list-unstyled-0").children('li:not(.init)');
// var allOptions2 = $("ul.list-unstyled-1").children('li:not(.init)');

// $("ul.list-unstyled-0").on("click", "li:not(.init)", function() {
//    allOptions1.removeClass('selected');
//    $(this).addClass('selected');
//    $("ul.list-unstyled-0").children('.init').html($(this).html());
//    allOptions1.toggle();
// });
// $("ul.list-unstyled-1").on("click", "li:not(.init)", function() {
//    allOptions2.removeClass('selected');
//    $(this).addClass('selected');
//    $("ul.list-unstyled-1").children('.init').html($(this).html());
//    allOptions2.toggle();
// });

