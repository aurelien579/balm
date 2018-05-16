$(function() {
    $('.datepicker').each((i, elem) => {
        let $elem = $(elem);
        let $date = new Date($elem.attr('mydate'));

        console.log($date);

        $elem.datepicker({
            format: 'dd M yyyy',
            language: 'fr'
        });

        $elem.datepicker('setDate', $date);
    });
});
