
$.ajax({
    type: "get",
    url: "http://118.24.43.47:8089/news_preview?N=9",
    dataType: "json",
    success: function (data) {
        var news_preview_loc = $("#news1");
        var news_preview_template = $("#news1");
        for (var i = data.length - 1; i >= 0; i--) {
            var news_preview = news_preview_template.clone();
            news_preview.attr("id", data[i].id);
            if (data[i].previewImage == null)
                news_preview.find(".newsImage").attr("src", "static/image/news1.png");
            else
                news_preview.find(".newsImage").attr("src", data[i].previewImage);
            news_preview.find(".news-preview-title").text(data[i].title);
            news_preview.find(".news-preview-content").text(data[i].previewContent);
            news_preview.click(
                function () {
                    var id = $(this).attr("id");
                    $(function () {
                        $.ajax({
                            type: "get",
                            url: "http://118.24.43.47:8089/news?id=" + id,
                            dataType: "json",
                            success: function (data) {
                                $("#title").text(data.title);
                                $("#time").text(new Date(data.time).toLocaleDateString());
                                $("#detail").html(data.content);
                                $("#article1").fadeIn(200);
                            }
                        })
                    });

                }
            );
            time = new Date(data[i].time);
            news_preview.find(".news-preview-time").text(time.toLocaleString());
            news_preview_loc.after(news_preview);
            news_preview.fadeIn(200);

        }
        news_preview_template.remove();
    }
});


$(function(){
    window.onscroll=function(){
        var top1=document.body.scrollTop||document.documentElement.scrollTop;
        if(top1>=300)
            $(".article").css("top",top1);  
        else
            $(".article").css("top",300);
    }
});

