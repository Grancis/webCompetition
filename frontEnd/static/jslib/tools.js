$(function () {

    function nav() {
        $(".show").animate({opacity: '0.92'});
        var $current = $("#menu>.active"),

            $target = $("#menu li"),
            $slider = $("#animate1");

        $target.mouseenter(function () {
            var posL = $(this).position().left;
            $slider.animate({'left': posL}, "fast")
        });
        $target.mouseleave(function (cur) {
            cur = $current.position().left;
            $slider.stop(true, true).animate({
                "left": cur
            }, "fast")
        });


        var $current1 = $("#menu1>.active"),
            $target1 = $("#menu1 li"),
            $slider1 = $("#animate2");

        $target1.mouseenter(function () {
            var posL = $(this).position().left;
            $slider1.animate({'left': posL}, "fast")
        });
        $target1.mouseleave(function (cur) {
            cur = $current1.position().left;
            $slider1.stop(true, true).animate({
                "left": cur
            }, "fast")
        });

        var $current2 = $("#menu2>.active"),
            $target2 = $("#menu2 li"),
            $slider2 = $("#animate3");

        $target2.mouseenter(function () {
            var posL = $(this).position().left;
            $slider2.animate({'left': posL}, "fast")
        });
        $target2.mouseleave(function (cur) {
            cur = $current2.position().left;
            $slider2.stop(true, true).animate({
                "left": cur
            }, "fast")
        });


        var $current3 = $("#menu3>.active"),
            $target3 = $("#menu3 li"),
            $slider3 = $("#animate4");

        $target3.mouseenter(function () {
            var posL = $(this).position().left;
            $slider3.animate({'left': posL}, "fast")
        });
        $target3.mouseleave(function (cur) {
            cur = $current3.position().left;
            $slider3.stop(true, true).animate({
                "left": cur
            }, "fast")
        });


        var $current4 = $("#menu4>.active"),
            $target4 = $("#menu4 li"),
            $slider4 = $("#animate5");

        $target4.mouseenter(function () {
            var posL = $(this).position().left;
            $slider4.animate({'left': posL}, "fast")
        });
        $target4.mouseleave(function (cur) {
            cur = $current4.position().left;
            $slider4.stop(true, true).animate({
                "left": cur
            }, "fast")
        });
        var $current5 = $("#menu5>.active"),
            $target5 = $("#menu5 li"),
            $slider5 = $("#animate6");

        $target5.mouseenter(function () {
            var posL = $(this).position().left;
            $slider5.animate({'left': posL}, "fast")
        });
        $target5.mouseleave(function (cur) {
            cur = $current5.position().left;
            $slider5.stop(true, true).animate({
                "left": cur
            }, "fast")
        });
    }
    nav();
        $("#menu li").click(function () {
            $(this).addClass("active")
                .siblings().removeClass("active");
nav();
            $(".show li").click(function () {
                $(this).addClass("active")
                    .siblings().removeClass("active");
            });
            $("#menu" + this.id).removeClass("hide").addClass("show").animate({opacity: '0.92'})
                .siblings().animate({opacity: '0'}).addClass("hide").removeClass("show");
            $("#content" + this.id).fadeIn(200)
                .siblings().fadeOut(200);
        });

        $("#menu2 li").click(function () {
            $(this).addClass("active")
                .siblings().removeClass("active");
            nav();
            $("#11" + this.id).removeClass("article-hide").addClass("article-active").animate({opacity: '0.92'})
                .siblings().animate({opacity: '0'}).addClass("article-hide").removeClass("article-active");
        });


        $("#menu3 li").click(function () {
            $(this).addClass("active")
                .siblings().removeClass("active");
            nav();
            $("#11" + this.id).removeClass("article-hide").addClass("article-active").animate({opacity: '0.92'})
                .siblings().animate({opacity: '0'}).addClass("article-hide").removeClass("article-active");
        });

        $("#menu4 li").click(function () {
            $(this).addClass("active")
                .siblings().removeClass("active");
            nav();
            $("#11" + this.id).removeClass("article-hide").addClass("article-active").animate({opacity: '0.92'})
                .siblings().animate({opacity: '0'}).addClass("article-hide").removeClass("article-active");

        });
        $("#menu5 li").click(function () {
            $(this).addClass("active")
                .siblings().removeClass("active");
            nav();
            $("#11" + this.id).removeClass("article-hide").addClass("article-active").animate({opacity: '0.92'})
                .siblings().animate({opacity: '0'}).addClass("article-hide").removeClass("article-active");

        });
        $("#menu1 li").click(function () {
            $(this).addClass("active")
                .siblings().removeClass("active");
            nav();
            $("#11" + this.id).removeClass("article-hide").addClass("article-active").animate({opacity: '0.92'})
                .siblings().animate({opacity: '0'}).addClass("article-hide").removeClass("article-active");
            if (("#11" + this.id).children('div').hasClass("process")) {
                ("#11" + this.id).css('background-color', '');
            }
        })
    });

