$("document").ready(function(){
    var cartoons = ["bugs bunny", "tasmanian devil", "road runner", "tweety", "pepé Le pew"];

    // create function that appends the value on the array into screen
    function dynamicButtons(){
        $("#gifButtons").empty();
        for(var i = 0; i<cartoons.length; i++){
            //create newbutton
            var btn = $("<button>");
            //give a  class
            btn.addClass("data-gif");
            // give it an attr value
            btn.attr('data-value', cartoons[i]);
            //label
            btn.text(cartoons[i]).css("text-transform", "uppercase");

            //add favorite symbol
             var toLove = $('<button>');
             toLove.attr("data-value", i) // might not need this
             toLove.addClass("love");
             toLove.text('♡');

             btn = btn.prepend(toLove);

              //append
              $("#gifButtons").append(btn);

        }
    }//dynamicButton

    //create function that add element to arr
    $("#submitBtn").on("click", function(event){
        event.preventDefault();
        var newCartoon = $("#gifInput").val().trim();
        cartoons.push(newCartoon);
        dynamicButtons();
        $("#gifInput").val("");

    })
    
    //dysplay images
    function displayGif (){
        var gif = $(this).attr("data-value"); // attributes for picture buttons
  
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=9";
  
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data; // an array
  
            for (var i = 0; i < results.length; i++) {
                
              var gifDiv = $("<div>");
  
              stillState = results[i].images.fixed_height_still.url 
              animateState = results[i].images.fixed_height.url 
             
              title = results[i].title
              title=  title.replace("GIF", "")
              var gifTitle = $("<p>").text(title).css("text-transform", "capitalize");
            //   gifDiv.append(gifTitle);
  
              var cartoonImage = $("<img>");
              cartoonImage.addClass('cartoon');
              cartoonImage.attr('data-state', 'still');  //works without it
              cartoonImage.attr("src", stillState);
              cartoonImage.attr("data-still", stillState);
              cartoonImage.attr("data-animate", animateState);
              gifDiv.prepend(cartoonImage);
              $("#gifPlacement").prepend(gifDiv); //.css("display", "flex", "flex-wrap, warp");
            }
          });
        }
      
        
       $(document).on('click', '.cartoon', function(){
           var state = $(this).attr("data-state"); 
           if(state === 'still'){
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }else{
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
      })
      
      $(document).on("click", ".data-gif", displayGif);
      dynamicButtons();
    
})//end of ducument.ready
