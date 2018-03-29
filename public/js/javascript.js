// runs the database to see if there is any information to obtain and then dispay on the screen
runData()


function runData() {
    $.get("/api/notComplete", function(data) {
        console.log(data);
        $("#todoItems").empty();
        $("#tasks").empty();
        if (data.length > 0) {
            $("#tasks").html("Tasks:")
        }

        for (i = 0; i < data.length; i++) {
            var id = data[i].id;
            var action = data[i].action;

            dataToPage(id, action, "#todoItems", "buttonComplete", "complete", "success")

        }


    })

    $.get("/api/completed", function(data) {
        console.log(data);
        $("#completedItems").empty();
        $("#taskComp").empty();


        if (data.length > 0) {
            $("#taskComp").html("Completed:")
        }


        for (i = 0; i < data.length; i++) {
            var id = data[i].id;
            var action = data[i].action;

            dataToPage(id, action, "#completedItems", "buttonDelete", "Delete", "danger")

        }
    })
}




// this takes the information passed to it and will move it to either the completed side or not completed side
function dataToPage(id, action, divId, buttonClass, buttonName, buttonStyle) {
    var row = "<div class='col-lg-12'><ul class='list-group'>";
    row += "<li class='list-group-item'>" + action + "</li>";
    row += "<li class='list-group-item'><button type='button'";
    row += "class='btn btn-" + buttonStyle + " btn-lg btn-block " + buttonClass + "'";
    row += "data-id=" + id + ">" + buttonName + "</button></li>";
    row += "</ul></div>";

    $(divId).append(row);



    // if complete button is selected then it will change the completed 
    // section in database and move info to completed side

    $(".buttonComplete").on("click", function() {
        console.log("complete button pushed");
        var updateS = {
            id: ($(this).data("id"))

        }
        console.log("id:" + id);

        $.ajax({
            method: "PUT",
            url: "/api/todo",
            data: updateS
        }).done(function() {
            console.log("updating")
            runData()
        })
    })



    // if delete button is selected then it will remove the information from the database

    $(".buttonDelete").on("click", function() {
        console.log("delete works")

        var id = ($(this).data("id"));
        console.log(id)

        $.ajax({
            method: "DELETE",
            url: "/api/todo/" + id
        })
        runData()
    })
}




$(".submit").on("click", function() {

    // getting value of post and the date with which the post occured
    //in future app development date and time will be used to provide user with more data
    var action = $("#todo").val()
    var d = new Date();
    var day = d.getDate()
    var year = d.getFullYear();
    var month = d.getMonth()
    var date = month + "/" + day + "/" + year;

    if ((action === "") || (action === " ")) {
        alert("Please enter something to do")
    } else {
        // placing the values into an object
        var info = {
            action: action,
            date: date
        }

        $("#todo").val("")

        //    sending the information to the server to be placed into the database
        $.post("/api/todo", info, function() {
            console.log("added")
            runData()
        })

    }
})