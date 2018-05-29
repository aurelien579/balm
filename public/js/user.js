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

    function setupUserInfo() {
        console.log('setup');

        const $button = $('#modifyButton');
        const $divPassword = $('#divPassword');
        const $modifyForm = $('#modifyForm');

        $button.click(() => {
            /* Parcours les inputs */
            $('input').each((i, elem) => {
                $elem = $(elem);

                if ($elem.is('[readonly]')) {
                    $elem.attr('readonly', false);
                } else {
                    $elem.attr('readonly', true);
                }
            });

            if ($button.innerText == 'Modifier') {
                $button.innerText = 'Valider';
            } else {
                $button.innerText = 'Modifier';
            }

            if ($divPassword.is('[hidden]')) {
                $divPassword.attr('hidden', false);
            } else {
                $divPassword.attr('hidden', true);
            }
        });

        $modifyForm.submit((event) => {
            event.preventDefault();

            /*const url = $modifyForm.attr('action');
            $.post(url, {
                offerId: $("#commentForm").attr("offer-id"),
                rating: $('#rating').val(),
                content: $('#content').val()
            });

            $("#" + $form.attr('modal-id')).modal('toggle');*/
        });
    }

    $('#userInfoButton').click(function() {
        ajax('/user/infos', setupUserInfo);
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

    function loadReservations() {
        ajax('/user/reservations', function() {
            const $form = $("form");
            $form.submit(function(event) {
                event.preventDefault();

                const $form = $(this);
                const url = $form.attr('action');

                $("#" + $form.attr('modal-id')).modal('toggle');
                console.log($form.attr("reservation-id"));

                $.post({
                    url: url,
                    data: {
                        reservationId: $form.attr("reservation-id"),
                        rating: $form.find('#rating').val(),
                        content: $form.find('#content').val()
                    },
                    success: loadReservations
                });
            });
        });
    }

    $('#reservationsButton').click(function() {
        loadReservations();
        setActive($('#reservationsButton'));
    });

    $('#demandsButton').click(function() {
        ajax('/user/demands');
        setActive($('#demandsButton'));
    });

    ajax('/user/infos', setupUserInfo);
    setActive($('#userInfoButton'));
});