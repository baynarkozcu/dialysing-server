$(function() {

// $("#btn-all-remove").click(function(){
//     $(".uploaded-image").remove()
// });
$("#btn-all-remove").click(function(){
    $(".uploaded-image").empty()
});
$("#btn-single-remove").click(function(){
    $("img").remove('.select-upload-image')
});
})