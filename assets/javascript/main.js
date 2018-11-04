 //This code works fine localy (on my laptop) BUT ONLINE
 //I get the following error: jquery.min.js:2 jQuery.Deferred exception: Cannot read property 'length' of null TypeError: Cannot read property 'length' of null
//It seems that jQuery is not recognizing the  cartoons array
// I have tried diffrent ways of resolving the problem with any sucess. 

 $(document).ready(function(){
     var obj= {
        cartoons: ["bugs bunny", "tasmanian devil", "road runner", "tweety"],
        // create function that appends the value on the array into screen
        dynamicButtons: function(arr){ 
            $("#gifButtons").empty();
            for(var i = 0; i <arr.length; i++){
                //create newbutton
                var btn = $("<button>");
                //add a class
                btn.addClass("data-gif");
                // give it an attr value
                btn.attr('data-value', arr[i]);
                //label
                btn.text(arr[i]).css("text-transform", "uppercase");
                //add favorite symbol
                if(i > 3){
                    var toLove = $('<button>');
                    toLove.attr("data-love", arr[i])
                    toLove.addClass("love");
                    toLove.text('♡');
                    btn = btn.prepend(toLove);
                    //add delete symbol
                    var remove = $('<button>');
                    remove.attr("data-remove", i);
                    remove.addClass("delete");
                    remove.text('X');
                    btn = btn.append(remove);
                }
                //append btn
                $("#gifButtons").append(btn);
            }
        },// end of dynamicButtons

     }// end of obj

    //create function that adds element to cartoons arr 
    $("#submitBtn").on("click", function(event){ 
        event.preventDefault();
        var newCartoon = $("#gifInput").val().trim();
        //prevent empty string
         if(newCartoon){
            obj.cartoons.push(newCartoon);
            obj.dynamicButtons(obj.cartoons);
            $("#gifInput").val("");
        }
       
    })

    // add favorite to array permanantly  
    $(document).on('click', '.love', function(event){
          event.preventDefault();
          var newFavorite = $(this).attr("data-love");
          localStorage.setItem("favorite", JSON.stringify(obj.cartoons));
      })
      
      //delete favorite
      $(document).on('click', '.delete', function(event){
          event.preventDefault();
          var deleteIndex = $(this).attr("data-remove");
          obj.cartoons.splice(deleteIndex, 1);
          obj.dynamicButtons(obj.cartoons);
          localStorage.setItem("favorite", JSON.stringify(obj.cartoons));
      })


    //display images using ajax
    function displayGif (){
        var gif = $(this).attr("data-value"); 

        //intentionally pulling 9 images for esthetic reasons
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=9";
  
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data; 
  
            for (var i = 0; i < results.length; i++) {
                
              var gifDiv = $("<div>");
  
              stillState = results[i].images.fixed_height_still.url 
              animateState = results[i].images.fixed_height.url 
             
               // nice to have but upsets up the flow and I have no time to fix... might revisit
               //title = results[i].title
               //title=  title.replace("GIF", "")
               // var gifTitle = $("<p>").text(title).css("text-transform", "capitalize");
               //gifDiv.append(gifTitle);
  
              var cartoonImage = $("<img>");
              cartoonImage.addClass('cartoon');
              cartoonImage.attr('data-state', 'still');  
              cartoonImage.attr("src", stillState);
              cartoonImage.attr("data-still", stillState);
              cartoonImage.attr("data-animate", animateState);
              gifDiv.prepend(cartoonImage);
              $("#gifPlacement").prepend(gifDiv);
            }
          });
        }
      
      // still and animate logic  
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
    obj.cartoons = JSON.parse(localStorage.getItem("favorite"));

    if (!Array.isArray(obj.cartoons)) {
        obj.cartoons = [];
      }
    obj.dynamicButtons(obj.cartoons);
    
})//end of ducument.ready
