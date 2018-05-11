$(function() {
    function ajax(url) {
        $.ajax({
            url: url,
            success: function(result) {
                $("#ajaxContent").html(result);
            }
        });
    }

    function setActive(elem) {
        $('#cardHeader a').removeClass('active');
        elem.addClass('active');
    }

    $('#userInfoButton').click(function() {
        ajax('/user/infos');
        setActive($('#userInfoButton'));
    });

    $('#commentsButton').click(function() {
        ajax('/user/comments');
        setActive($('#commentsButton'));
    });

    $('#offersButton').click(function() {
        ajax('/user/offers');
        setActive($('#offersButton'));
    });

    ajax('/user/infos');
    setActive($('#userInfoButton'));
});
