

function changePage(obj){
    pre=$(".nav-active")[0];
    $(pre).removeClass("nav-active");
    $(obj).addClass("nav-active");
    // window.location.href=href;
}

