function changePage(obj){
    dot_left="";
    id=$(obj).attr("id");
    if(id=="nav-home"){
        href="#";
        dot_left="20px";
    }
    else if (id=="nav-info"){
        href="#";
        dot_left="235px"
    }
    else if (id=="nav-news"){
        href="#";
        dot_left="475px"
    }
    else if (id=="nav-project"){
        href="#";
        dot_left="715px"
    }
    else if (id=="nav-tools"){
        href="#";
        dot_left="960px"
    }
    else ;

    pre=$(".nav-active")[0];
    dot=$("#nav-dot");
    $(dot).css("left",dot_left);
    $(pre).removeClass("nav-active");
    $(obj).addClass("nav-active");
    window.location.href=href;
}