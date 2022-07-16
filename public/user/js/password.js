$(document).ready(function () {
    // değiştir göz ikonuna tıklandığında
    $("#degistir").click(function () {
        // eğer type niteliği password ise
        if ($(".sifre").attr("type") == "password") {
            // type niteliğini text olarak değiştir
            $(".sifre").attr("type", "text");
        }
        // password değil text ise
        else {
            // type niteliğini password olarak değiştir
            $(".sifre").attr("type", "password");
        }
    });
});