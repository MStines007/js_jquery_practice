//////// Matt Stines JS.JQuery Challenge ////////////

////// DD-TEST ////////

///////////////////////////////  modal/overlay structure - initialize  ///////////////////////////////////


var $total = $('#subTotal').html();
var $itemQty = $('#navShoppingCart').children().text().split("(").pop();
var $logoImg = $('#logo').children().children().attr('src');
var $cartUrl = $('#hdrCartCheckout').attr('href');
var $blackout = $('<div id="blackout">');

var $myModal = $('<div id="modalWrapper">\
                    <div id="myModal"><img id="myLogo" src='+ $logoImg +'>\
                      <div id="totalPrice">subtotal: ' + $total + '</div>\
                    </div>\
                    <div id="modalFooter">\
                      <button type="button" class="cartCheckout btn red" id="cartBtn">Edit items in cart ('+ $itemQty +'</button>\
                      <button type="button" class="cartCheckout btn red" id="exitBtn">Close Window</button>\
                    </div>\
                  </div>');

$($blackout).appendTo('body').hide();
$($myModal).appendTo('body').hide(); 


///////////////////////////////  modal/overlay logic  /////////////////////////////////////////////


$(window).scroll(function() {   
  if(($(window).scrollTop() + $(window).innerHeight() > $(document).innerHeight() * .9)
    && ($($('#my_modal').css('display') === 'none'))
    && ($('#ctl00_pageHeader_LogoutLink').is(':visible'))) {
      $($blackout).fadeIn('fast', function(){
        $($myModal).fadeIn('fast').show();
        $(".itemRemove").hide();
      });
      $("#cartBtn").click(function(){
          location.href= $cartUrl;
      });
      $("#exitBtn").click(function(){
          $('myModal').fadeOut(function(){
          $(this).hide();
      });
      $('#modalWrapper').fadeOut(function(){
          $(this).hide();
      });    
      $($blackout).fadeOut(function(){
          $(this).hide();
          $(".itemRemove").show();
      });
    });
  }
});


/////////////////////  items image and details dynamic iterator  ////////////////////////


var imagesArray = [];
$( ".itemImg" ).each( function( index, element ){
    imagesArray.push($( this ).children().attr('src') );
});

var itemDtlsArray = [];
$( ".itemDtls" ).each( function( index, element ){
    itemDtlsArray.push($( this ).children().html());
});

var itemsCombinedArray = [];
  itemsCombinedArray.push(imagesArray, itemDtlsArray);
  
for(i = 0; i < itemsCombinedArray[0].length; i++) {
  $('<div class="item_container"><img src='+ itemsCombinedArray[0][i] +'>\
      <div class="item_details"><h5>'+ itemsCombinedArray[1][i] +'</h5></div>\
     </div><br>').insertAfter('#totalPrice');
}


///////////////////////////////  Styling  //////////////////////////////////////////////


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
        opacity: .8;\
  } #modalWrapper {\
        position: fixed;\
        padding: 17px;\
        z-index: 10000;\
        height: 530px;\
        width: 432px;\
        top: 50%;\
        left: 50%;\
        margin-left: -250px;\
        margin-top: -300px;\
  } #myModal {\
        position: fixed;\
        padding: 17px;\
        z-index: 10001;\
        height: 438px;\
        width: 432px;\
        top: 50%;\
        left: 50%;\
        margin-left: -250px;\
        margin-top: -300px;\
        border-top: 5px solid #c00;\
        background-color: white;\
        -webkit-box-shadow: 0 8px 13px -2px #666;\
        overflow: auto;\
  } #modalFooter {\
        position: absolute;\
        padding: 25px;\
        z-index: 10001;\
        height: 37px;\
        width: 416px;\
        left: 50%;\
        margin-left: -233px;\
        bottom: 0;\
        background-color: white;\
  } .item_container {\
        height: 144px;\
  } .item_details {\
        float: none;\
        display: inline-block;\
        transform: translateY(-50%);\
        vertical-align: middle;\
        border-bottom: 1px solid #CCC;\
        margin-left: 20px;\
  } #totalPrice {\
        color: #B3B3B3;\
        font-size: 16px;\
        border-top: 1px solid #CCC;\
        margin-top: 10px;\
        padding-top: 8px;\
        padding-bottom: 10px;\
        padding-left: 14px;\
  }  .btn:focus {\
        outline: none;\
  } #exitBtn {\
        float: left;\
        margin-left: 24px;\
  } #cartBtn {\
        margin-left: 14px;\
        float: right;\
  } #myLogo {\
        margin-left: 10px;\
  }")
.appendTo("head");
