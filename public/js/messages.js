$(function() {
    function ajax(url, callback) {
        $.ajax({
            url: url,
            success: function(result) {
                $("#messageContent").html(result);
                if (callback) callback();
            }
        });
    }

    function setActive(elem) {
        $('a[reservationId]').removeClass('active');
        elem.addClass('active');
    }

    function updateConv(reservationId) {
        ajax('/message/' + reservationId);
    }

    function setupConv(reservationId) {
        window.reservationId = reservationId;

        const $form = $("#sendMessage");

        $form.submit((event) => {
            event.preventDefault();

            const url = $form.attr('action');

            console.log(url);

            $.post({
                url: url.toString(),
                data: {
                    destUserId: $form.attr("destUserId"),
                    sourceUserId: $form.attr("sourceUserId"),
                    reservationId: $form.attr("reservationId"),
                    content: $("#content").val()
                },
                dataType: 'text',
                success: (result) => {
                    updateConv(reservationId);
                }
            });
        });
    }

    $('a[reservationId]').each((i, elem) => {
        const $elem = $(elem);
        const reservationId = $elem.attr('reservationId');

        $elem.click(function() {
            ajax('/message/' + reservationId, () => {
                setupConv(reservationId);
            });
            setActive($elem);
        });
    });

    function windowUpdate() {
        if (typeof window.reservationId != 'undefined')
            updateConv(window.reservationId);
        window.setTimeout(windowUpdate, 5000);
    }

    window.setTimeout(windowUpdate, 5000);


    //ajax('/user/infos');
    //setActive($('#userInfoButton'));
});
