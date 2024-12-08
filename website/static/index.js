$(document).ready(function () {
  $(".add-btn").on("click", function () {
    var productid = $(this).data("productid");
    var userid = $(this).data("userid");
    var url = "/addtocart/" + userid + "/" + productid;

    $.ajax({
      type: "POST",
      url: url,
      success: function (data) {
        console.log("success!!");
      },
    });
  });
});
