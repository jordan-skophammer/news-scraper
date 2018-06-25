$(document).on("click", "#getPosts", function(event) {

    $("#post").html(" ");

    $.getJSON("/posts", (data) => {
        
        for (var i = 0; i < data.length; i++) {
            
            $("#post").append("<div class='post-body'><p>" + data[i].title + "<br /><a href='"+ data[i].link +"'target='_black'>" + data[i].link + "</a></p><button id='add-to-fav' class='btn btn-primary' data-id='"+ data[i]._id + "'>Favorite</button></div>");
        }
    });
})

$(document).on("click", "#add-to-fav", function(event) {
    
    let favPostID= $(this).attr("data-id")  

    $.ajax({
        method: "GET",
        url: "/posts/" + favPostID
    })
    .then(function(data) {
        $("#fav-posts").append("<div class='fav-body'><p>" + data.title + "<br /><a href='"+ data.link +"'target='_blank'>" + data.link + "</a></p><div class='panel panel-default'><div class='panel-heading'><h4 class='panel-title'><a data-toggle='collapse' data-parent='#accordion' href='#"+ data._id +"'>Comments</a></h4></div><div id='" + data._id +"' class='panel-collapse collapse'><div class='panel-body'><div id='comment-area'><p id='fav-comments'></p><textarea class='form-control' id='comment-textarea' rows='3'></textarea></br><button id='save-comments' class='btn btn-primary' data-id='"+ data._id +"'>Save Comment</button></div></div></div></div><button id='delete-fav' class='btn btn-danger'>Delete</button><div id='fav-comments'></div></div>");

        if (data.notes) {

        $("#commentarea").val(data.notes.body);
  }
    })
})

$(document).on("click", "#save-comments", function(event) {

    var commentPostID = $(this).attr("data-id")

    $.ajax({
        method: "POST",
        url: "/posts/" + commentPostID,
        data: {
            body: $("#comment-textarea").val()
        }
    })
    .then(function(data) {
        console.log(data);

       //$("#comment-area").append("<p id='fav-comments'>" + $("#comment-textarea").val() + "</p><button id='delete-comment' class='btn btn-danger'>Delete Comment</button>")

        //$("#comment-textarea").toggle()

        //$(this).remove() 
    });
    
})

$(document).on("click", "#delete-comment", function(event) {

    $(this).remove()

    $("#fav-comments").html(" ")

    $("#comment-textarea").val("")

    $("#comment-area").html("<textarea class='form-control' id='comment-textarea' rows='3'></textarea></br><button id='save-comments' class='btn btn-primary'>Save Comment</button>")

})

$(document).on("click", "#delete-fav", function(event) {

    let deletePost = $(this).parent().html("");

    console.log(deletePost)
})