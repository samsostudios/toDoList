var config = {
    apiKey: "AIzaSyBytHCyNtGtUpVHiCmfpPpPBPYtG3oVHvE",
    authDomain: "todolist-10937.firebaseapp.com",
    databaseURL: "https://todolist-10937.firebaseio.com",
    projectId: "todolist-10937",
    storageBucket: "todolist-10937.appspot.com",
    messagingSenderId: "138550645138"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var todoRef = database.ref("todoItems");

  $('#addBtn').click(function(){
    var item = $('#inputItem').val();
    // console.log(item);

    if(item != ''){
        todoRef.push({
            tdItem: item
        });

        $('#inputItem').val("");
    }else{
        alert("Please enter an item!");
    }
  });

  function getInfo(){
    return todoRef.once('value').then(function(snapshot) {
        console.log(snapshot.val());

        for(item in snapshot.val()){
            // console.log(snapshot.val()[item].tdItem)
            var activity =  snapshot.val()[item].tdItem;
            $('#todoItems').append("<div class='tdItems'><h1>"+ activity + "</h1> <button class='deleteBtn'>Delete</button></div>");
        }
      });
  }
  $("#todoItems").on('click', ".deleteBtn", function(){
    key = this.className.split(" ")[1]
    
    // console.log(todoRef.child(key));
    todoRef.child(key).remove()

    
    // console.log($(this).parent());
    $(this).parent().remove();
  });

  todoRef.on("child_added", function(snapshot){
    // console.log(snapshot.key);
    var activity =  snapshot.val().tdItem;
    $('#todoItems').append("<div class='tdItems'><h1>"+ activity + "</h1> <button class='deleteBtn " + snapshot.key + "'>Delete</button></div>");
});
