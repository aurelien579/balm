

$('#demo').pagination({
    dataSource: [1, 2, 3, 4, 5, 6, 7, ... , 100],
    pageSize: 8,
    formatResult: function(data) {
        var result = [];
        for (var i = 0, len = data.length; i < len; i++) {
            result.push(data[i] + ' - good guys');
        }
        return result;
    },
    callback: function(data, pagination) {
        // template method of yourself
        var html = template(data);
        dataContainer.html(html);
    }
})
