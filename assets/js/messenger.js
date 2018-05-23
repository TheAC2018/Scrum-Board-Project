class messenger {

    static show(message, type) {
        let alert = '' +
            '<div class="alert alert-' + type + ' alert-dismissible fade show" role="alert">\n' +
            message +
            '  <button type="button" class="close" data-dismiss="alert" aria-label="Close">\n' +
            '    <span aria-hidden="true">&times;</span>\n' +
            '  </button>\n' +
            '</div>'
        ;

        $("#messenger").append(alert);

        setTimeout(function () {
            $("#messanger .alert:first").remove();
        }, 5000);
    }

    static info(message) {
        messenger.show(message, "info");
    }

}