if (Meteor.isClient) {
  console.log($("#foo"));
  $("#foo").on("click", function() {
    console.log("voo");
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
