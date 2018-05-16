function updateDateToSend(elem, value) {
    let alt = $("#" + elem.attr('id') + "Sent");
    alt.val(value);
}

function formatDate(date) {
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + '/' + (monthIndex + 1) + '/' + year;
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
            updateDateToSend(elem, e.date);
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

function dateAvailable(date, avails) {
    for (let i = 0; i < avails.length; i++) {
        let start = new Date(avails[i].start);
        let end = new Date(avails[i].end);

        if (date >= start && date <= end) {
            return true;
        }
    }

    return false;
}

function setAvailableDates(elem, dates) {
    let min = new Date(dates[0].start);
    let max = new Date(dates[0].end);
    let unavail = [];

    for (let i = 1; i < dates.length; i++) {
        let start = new Date(dates[i].start);
        let end = new Date(dates[i].end);

        if (start < min) min = start;
        if (end > max) max = end;
    }

    setStartDate(elem, min);
    setEndDate(elem, max);

    for (let currentDate = new Date(min); currentDate < max; currentDate.setDate(currentDate.getDate() + 1)) {
        if (!dateAvailable(currentDate, avail)) {
            unavail.push(formatDate(currentDate));
        }
    }

    elem.datepicker('setDatesDisabled', unavail);
}

function setStartDate(elem, date) {
    let actualStart = elem.datepicker('getStartDate');
    if (date > actualStart) {
        elem.datepicker('setStartDate', date);
        return true;
    }

    return false;
}

function setEndDate(elem, date) {
    let actualEnd = elem.datepicker('getEndDate');
    if (date < actualEnd) {
        elem.datepicker('setEndDate', date);
        return true;
    }

    return false;
}

$(function() {
    $('.datepicker').each((i, elem) => {
        setupDatepicker($(elem));
        if (avail !== undefined) {
            setAvailableDates($(elem), avail);
        }
    });
});