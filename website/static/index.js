$(document).ready(function () {
  $(".add-btn").click(function () {
      const productId = $(this).data("productid");
      const userId = $(this).data("userid");

      // AJAX POST Request
      $.ajax({
          url: `/addtocart/${userId}/${productId}`,
          type: "POST",
          success: function (response) {
              $("#messages").html(`
                  <div class="alert alert-success alert-dismissible fade show" role="alert">
                      Added to cart successfully!
                  </div>
              `).show().fadeOut(1000);
          },
          error: function () {
              $("#messages").html(`
                  <div class="alert alert-danger alert-dismissible fade show" role="alert">
                      Failed to add to cart.
                  </div>
              `).show().fadeOut(1000);
          }
      });
  });

  $("#increase_stock").click(function() {
      const increase_by = $("#stock_added").val();
      const productId = $(this).data("productid");

      console.log(productId);

      $.ajax({
          url: `/admin/products/increase_stock/${productId}/${increase_by}`,
          type: "POST",
          success: function (response) {
              $("#messages").html(`
                  <div class="alert alert-success alert-dismissible fade show" role="alert">
                      Stock increased successfully!
                  </div>
              `).show().fadeOut(1000);
          },
          error: function () {
              $("#messages").html(`
                  <div class="alert alert-danger alert-dismissible fade show" role="alert">
                      Failed to increase stock.
                  </div>
              `).show().fadeOut(1000);
          }
      });
  });

  $("#reduce_stock").click(function() {
      const decrease_by = $("#stock_reduced").val();
      const productId = $(this).data("productid");

      console.log(productId);

      $.ajax({
          url: `/admin/products/reduce_stock/${productId}/${decrease_by}`,
          type: "POST",
          success: function (response) {
              $("#messages").html(`
                  <div class="alert alert-success alert-dismissible fade show" role="alert">
                      Stock reduced successfully!
                  </div>
              `).show().fadeOut(1000);
          },
          error: function () {
              $("#messages").html(`
                  <div class="alert alert-danger alert-dismissible fade show" role="alert">
                      Failed to reduce stock.
                  </div>
              `).show().fadeOut(1000);
          }
      });
  });
});
