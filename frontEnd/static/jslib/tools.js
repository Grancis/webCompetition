$(function () {
    $(".show").animate({opacity: '0.92'});
    $("#menu li").click(function () {
        $(this).addClass("active")
            .siblings().removeClass("active");
        $(".show li").click(function () {
            $(this).addClass("active")
                .siblings().removeClass("active");
        });
        $("#menu" + this.id).removeClass("hide").addClass("show").animate({opacity: '0.92'})
            .siblings().animate({opacity: '0'}).addClass("hide").removeClass("show");
    $("#content"+this.id).fadeIn(200)
        .siblings().fadeOut(200);
    });

$("#menu2 li").click(function () {
    $(this).addClass("active")
        .siblings().removeClass("active");
    $("#11"+this.id).removeClass("article-hide").addClass("article-active").animate({opacity: '0.92'})
        .siblings().animate({opacity: '0'}).addClass("article-hide").removeClass("article-active");
});


$("#menu3 li").click(function () {
    $(this).addClass("active")
        .siblings().removeClass("active");
    $("#11"+this.id).removeClass("article-hide").addClass("article-active").animate({opacity: '0.92'})
        .siblings().animate({opacity: '0'}).addClass("article-hide").removeClass("article-active");
});

$("#menu4 li").click(function () {
    $(this).addClass("active")
        .siblings().removeClass("active");
    $("#11"+this.id).removeClass("article-hide").addClass("article-active").animate({opacity: '0.92'})
        .siblings().animate({opacity: '0'}).addClass("article-hide").removeClass("article-active");

});
$("#menu5 li").click(function () {
    $(this).addClass("active")
        .siblings().removeClass("active");
    $("#11"+this.id).removeClass("article-hide").addClass("article-active").animate({opacity: '0.92'})
        .siblings().animate({opacity: '0'}).addClass("article-hide").removeClass("article-active");

});
$("#menu1 li").click(function () {
    $(this).addClass("active")
        .siblings().removeClass("active");
    $("#11"+this.id).removeClass("article-hide").addClass("article-active").animate({opacity: '0.92'})
        .siblings().animate({opacity: '0'}).addClass("article-hide").removeClass("article-active");
})
});
