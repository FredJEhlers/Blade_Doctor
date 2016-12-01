function enableEmail(bEnable){
  document.getElementById('userEmail').disabled = !bEnable;
}


var ref = new Firebase("https://blade-doctor.firebaseio.com");
// Thanks to https://gist.github.com/hurjas/2660489#file-timestamp-js-L26
function timeStamp() {
  var now = new Date();
  var date = [now.getMonth() + 1, now.getDate(), now.getFullYear()];
  var time = [now.getHours(), now.getMinutes()];
  var suffix = (time[0] < 12) ? "AM" : "PM";
  time[0] = (time[0] < 12) ? time[0] : time[0] - 12;

  for (var i = 1; i < 3; i++) {
    if (time[i] < 10) {
      time[i] = "0" + time[i];
    }
  }

  return date.join("/") + ", " + time.join(":") + " " + suffix;
}

function postComment() {
  var userName = document.getElementById("name").value,
      userComment = document.getElementById("comment").value,
      chk = document.getElementById("contactMe").checked,
      userEmail = document.getElementById("userEmail").value,
      userTime = timeStamp();

  if (chk && userName && userComment && userEmail){
    ref.child('Comments').push({ "Name": userName, "Commented": userComment, "Time": userTime, "Email": userEmail });
  }
  else if (!chk){
    ref.child('Comments').push({ "Name": userName, "Commented": userComment, "Time": userTime});
  }

  document.getElementById("name").value = '';
  document.getElementById("comment").value = '';
  document.getElementById("contactMe").checked = false;
  document.getElementById("userEmail").value = '';
}

var query = firebase.database().ref("Comments").orderByKey();
query.on("child_added", function(snapshot) {
      var childData = snapshot.val();
      addComment(childData.Name, childData.Commented, childData.Time);
  });

function addComment(name, comment, timeStamp) {
  var comments = document.getElementById("comments");
  comments.innerHTML = "<hr><h4 id='hcomments'>" + name + " said on the:  <span class='commentSpan'>" + timeStamp + "</span></h4><p class='comments'>" + comment + "</p>" + comments.innerHTML;
}

function updateCount(){
  var query = firebase.database().ref("Visitor");
  query.on("child_added", function(snapshot){
  var childData = snapshot.val();
    var intVal = parseInt(childData.Count,10);
    intVal = intVal + 1;

   ref.child('Visitor').child('Counter').set({ "Count": intVal});

    var node = document.getElementById("foot");
    node.innerHTML = "<p class='large_paragraph'> Number of page visits: " + intVal + "</p>" + node.innerHTML;
    }
  );
}

$(document).ready(function () {
    $(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("navbar-collapse in");
        if (_opened === true && !clickover.hasClass("navbar-toggle")) {
            $("button.navbar-toggle").click();
        }
    });

    $("#bKnifePop").on("click", function() {
    $('#imagepreview').attr('src', $('#bKnife').attr('src')); 
    $('#previewModal').modal('show');});

    $("#aKnifePop").on("click", function() {
    $('#imagepreview').attr('src', $('#aKnife').attr('src')); 
    $('#previewModal').modal('show');});


    $("#bBayPop").on("click", function() {
    $('#imagepreview').attr('src', $('#bBay').attr('src')); 
    $('#previewModal').modal('show');});

    $("#aBayPop").on("click", function() {
    $('#imagepreview').attr('src', $('#aBay').attr('src')); 
    $('#previewModal').modal('show');});

    $("#sirVicPop").on("click", function() {
    $('#vicpreview').attr('src', $('#sirVicAd').attr('src')); 
    $('#modal').modal('show');});       

    $('.navbar-collapse .menuEnd').click(function(){
    $(".navbar-collapse").collapse('hide');}); 

    updateCount();
});


