function updateDateToSend(elem, value) {
    let alt = $("#" + elem.attr('id') + "Sent");
    alt.val(value);

    console.log("update!");
}

function setupDatepicker(elem) {
    let date = Date.parse(elem.attr('mydate'));
    let now = Date.now();
    let startDate = now;
    let initialDate = now;

    if (!isNaN(date)) {
        if (date < now) {
            startDate = date;
        }

        initialDate = date;
    }

    elem.datepicker({
        format: 'dd/mm/yyyy',
        startDate: startDate.toString(),
        todayHighlight: true
    });

    elem.datepicker().on('changeDate', function(e) {
        if (e.dates.length > 0)
            updateDateToSend(elem, date.toString());
        else
            updateDateToSend(elem, "");
    });

    elem.datepicker('setDate', initialDate.toString());

    let endAttr = elem.attr('end');
    let startAttr = elem.attr('start');

    if (typeof endAttr !== typeof undefined && endAttr !== false) {
        let endElem = $("#" + endAttr);

        elem.datepicker().on('changeDate', function(e) {
            endElem.datepicker('setStartDate', e.date);
            if (endElem.datepicker('getDate') < e.date)
                endElem.datepicker('clearDates');
        });
    }

    if (typeof startAttr !== typeof undefined && startAttr !== false) {
        let startElem = $("#" + startAttr);

        elem.datepicker().on('changeDate', function(e) {
            startElem.datepicker('setEndDate', e.date);
            if (startElem.datepicker('getDate') > e.date)
                startElem.datepicker('clearDates');
        });
    }
}

$(function() {
    $('.datepicker').each((i, elem) => {
        setupDatepicker($(elem));
    });
});
