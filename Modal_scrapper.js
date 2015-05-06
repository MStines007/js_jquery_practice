// Matt Stines - Bounce Exchange Code Challenge //

// Styling //

$("<style>")
  .prop("type", "text/css")
  .html("\
  #blackout {\
    position: fixed;\
    z-index: 10000;\
    height: 100%;\
    width: 100%;\
    top: 0;\
    left: 0;\
    background-color: black;\
    opacity: .75;\
  }")
.appendTo("head");

$("<style>")
  .prop("type", "text/css")
  .html("\
  #modal_wrapper {\
    position: fixed;\
    padding: 17px;\
    z-index: 10000;\
    height: 530px;\
    width: 410px;\
    top: 50%;\
    left: 50%;\
    margin-left: -250px;\
    margin-top: -300px;\
  }")
.appendTo("head");

$("<style>")
  .prop("type", "text/css")
  .html("\
  #my_modal {\
    position: fixed;\
    padding: 17px;\
    z-index: 10001;\
    height: 438px;\
    width: 410px;\
    top: 50%;\
    left: 50%;\
    margin-left: -250px;\
    margin-top: -300px;\
    border-top: 7px solid #c00;\
    background-color: #fff;\
    -webkit-box-shadow: 0 8px 13px -2px #666;\
    overflow: auto;\
  }")
.appendTo("head");

$("<style>")
  .prop("type", "text/css")
  .html("\
  #modal_footer {\
    position: absolute;\
    padding: 25px;\
    z-index: 10001;\
    height: 37px;\
    width: 394px;\
    left: 50%;\
    margin-left: -222px;\
    bottom: 0;\
    background-color: white;\
  }")
.appendTo("head");

$("<style>")
  .prop("type", "text/css")
  .html("\
  .itemContainer {\
    height: 144px;\
  }")
.appendTo("head");

$("<style>")
  .prop("type", "text/css")
  .html("\
  .itemDetails {\
    float: none;\
    display: inline-block;\
    transform: translateY(-50%);\
    vertical-align: middle;\
    border-bottom: 1px solid #CCC;\
    margin-left: 20px;\
  }")
.appendTo("head");

$("<style>")
  .prop("type", "text/css")
  .html("\
  #totalPrice {\
  color: #B3B3B3;\
  font-size: 16px;\
  border-top: 1px solid #CCC;\
  margin-top: 10px;\
  padding-top: 8px;\
  padding-bottom: 10px;\
  padding-left: 6px;\
  }")
.appendTo("head");

$("<style>")
  .prop("type", "text/css")
  .html("\
  .btn:focus {\
    outline: none;\
  }")
.appendTo("head");

$("<style>")
  .prop("type", "text/css")
  .html("\
  #exitBtn {\
    float: left;\
  }")
.appendTo("head");

$("<style>")
  .prop("type", "text/css")
  .html("\
  #cartBtn {\
    margin-left: 14px;\
    float: right;\
  }")
.appendTo("head");

// modal/overlay structure //

var $total = $('#subTotal').html();
var $itemQty = $('#navShoppingCart').children().text().split("(").pop();
var $logoImg = $('#logo').children().children().attr('src');
var $blackout = $('<div id="blackout">');

var $myModal = $('<div id="modal_wrapper">\
                    <div id="my_modal"><img src='+ $logoImg +'>\
                      <div id="totalPrice">subtotal: ' + $total + '</div>\
                    </div>\
                    <div id="modal_footer">\
                      <button type="button" class ="cartCheckout btn red" id="cartBtn">Edit items in cart ('+ $itemQty +'</button>\
                      <button type="button" class="cartCheckout btn red" id="exitBtn">Close Window</button>\
                    </div>\
                  </div>');

$($blackout).appendTo('body').hide();
$($myModal).appendTo('body').hide(); 

// modal/overlay logic //

$(window).scroll(function() {   
  if(($(window).scrollTop() + $(window).innerHeight() > $(document).innerHeight() * .9)
    && ($($('#my_modal').css('display') === 'none'))
    && ($('#ctl00_pageHeader_LogoutLink').is(':visible')))  {
      $($blackout).show();
      $($myModal).fadeIn().show();
      $(".itemRemove").hide();
      
      $("#cartBtn").click(function(){
          location.href='https://marmot.com/checkout/cart';
      });
      $("#exitBtn").click(function(){
          $('my_modal').fadeOut(function(){
          $(this).hide();
      });
      $('#modal_wrapper').fadeOut(function(){
          $(this).hide();
      });    
      $($blackout).fadeOut(function(){
          $(this).hide();
          $(".itemRemove").show();
      });
      
    });
  }
});

///////////////////////////////////////////////////////////////////////////////////
// items image and details iterator. Adds images and details dynamically //

var imagesArray = [];
$( ".itemImg" ).each( function( index, element ){
    imagesArray.push($( this ).children().attr('src') );
});

var itemDtlsArray = [];
$( ".itemDtls" ).each( function( index, element ){
    itemDtlsArray.push($( this ).children().html());
});

var itemsCombinedArray = [];
  itemsCombinedArray.push(imagesArray);
  itemsCombinedArray.push(itemDtlsArray);

for(i = 0; i < itemsCombinedArray[0].length; i++) {
  $('<div class="itemContainer"><img src='+ itemsCombinedArray[0][i] +'>\
      <div class="itemDetails"><h5>'+ itemsCombinedArray[1][i] +'</h5></div>\
    </div><br>').insertAfter('#totalPrice');
}