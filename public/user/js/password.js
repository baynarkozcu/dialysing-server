//LOGIN PASSWORD EYE
$(document).ready(function () {
    // değiştir göz ikonuna tıklandığında
    $("#degistir").click(function () {
        // eğer type niteliği password ise
        if ($(".password").attr("type") == "password") {
            // type niteliğini text olarak değiştir
            $(".password").attr("type", "text");
        }
        // password değil text ise
        else {
            // type niteliğini password olarak değiştir
            $(".password").attr("type", "password");
        }
    });
});

//REGISTER PASSWORD EYE
$(document).ready(function () {
    // değiştir göz ikonuna tıklandığında
    $("#register-degistir").click(function () {
        // eğer type niteliği password ise
        if ($(".password").attr("type") == "password") {
            // type niteliğini text olarak değiştir
            $(".password").attr("type", "text");
        }
        // password değil text ise
        else {
            // type niteliğini password olarak değiştir
            $(".password").attr("type", "password");
        }
    });
});