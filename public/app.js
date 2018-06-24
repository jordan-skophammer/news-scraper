$(document).on("click", "#getPosts", function(event) {

    $("#post").html(" ");

    $.getJSON("/posts", (data) => {
        
        for (var i = 0; i < data.length; i++) {
            
            $("#post").append("<div class='post-body'><p>" + data[i].title + "<br />" + data[i].link + "</p><button id='add-to-fav' class='btn btn-primary' data-id='"+ data[i]._id + "'>Favorite</button></div>");
        }
    });
})

$(document).on("click", "#add-to-fav", function(event) {
    
    var favPostID= $(this).attr("data-id")  

    $.ajax({
        method: "GET",
        url: "/posts/" + favPostID
    })
    .then(function(data) {
        $("#fav-posts").append("<div class='fav-body'><p>" + data[i].title + "<br />" + data[i].link + "</p></div>");
    })
})
