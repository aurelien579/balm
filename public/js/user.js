$(function() {
    function ajax(url, callback) {
        $.ajax({
            url: url,
            success: function(result) {
                $("#ajaxContent").html(result);
                if (callback) callback();
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

    $('#reservationsButton').click(function() {
        ajax('/user/reservations', function() {
            const $form = $("#commentForm");
            $form.submit(function(event) {
                event.preventDefault();
                const $form = $(this);
                const url = $form.attr('action');
                $.post(url, {
                    offerId: $("#commentForm").attr("offer-id"),
                    rating: $('#rating').val(),
                    content: $('#content').val()
                });

                $("#" + $form.attr('modal-id')).modal('toggle');
            });
        });

        setActive($('#reservationsButton'));
    });

    $('#demandsButton').click(function() {
        ajax('/user/demands');
        setActive($('#demandsButton'));
    });

    ajax('/user/infos');
    setActive($('#userInfoButton'));
});
