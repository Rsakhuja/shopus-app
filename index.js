
// Upload Image
$(document).ready(function() {
  var productType;

  $("#product-type-selector a").on('click', function() {
    productType = ($(this).text());
  });

  $("#submit-button").on("click", function handler() {
    var videoSelector = document.getElementById('video-selector');
    var video = videoSelector.files[0];
    var video_name = video["name"];

    var productUrl = $("#product-url").val();

    // Figure out a way to get product rating from html

    var productReview = $("#product-review").val();

    // var postRequestBody = {"file_name": video, "product_url": productUrl, "product_type": productType, "product_review": productReview};

    var psURLRequestBody = {"file_name": video_name};

    $.ajax({
        type: "POST",
        crossdomain: true,
        dataType:"json",
        url: "https://xknu4gvvof.execute-api.us-east-1.amazonaws.com/first-test/posts",
        data: JSON.stringify(psURLRequestBody),
        contentType: "application/json",
        success: function (result) {
          console.log(result.body.url);
          $.ajax({
            url: result.body.url + "/" + video_name,
            type:'PUT',
            data:video,
            processData: false,
            contentType: video.type,
            dataType: "xml",
            crossdomain: true,
            success: function (result) {
              console.log("Upload Successful!");
            },
            error: function (result) {
              console.log(result["responseText"]);
            }
          });
        },
    });
    alert("Review Posted!");
  });

});
