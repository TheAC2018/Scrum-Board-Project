class view {

    static fetch(view, event) {

        $.ajax({
            url: "/views/" + view + ".html",
            success: function (result, status, xhr) {

                // save the data with the name of the event
                localStorage.setItem(event, result);

                // let the listener be inform that event is finished
                $(document).trigger(event);

            },
            error: function (xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
                messenger("View couldn't be load.", "warning");
            }
        })

    };

    static fetch_all(views, event) {

        let view_len = views.length;
        let fired_len = 0;
        let total_data = {};

        for (let i = 0; i < view_len; i++) {

            let derived_event = event + "_" + i;

            view.fetch(views[i], derived_event);

            $(document).unbind(derived_event).on(derived_event, function () {

                fired_len++;

                total_data[i] = localStorage.getItem(derived_event);

                if (fired_len === view_len) {

                    // save the data with the name of the event
                    localStorage.setItem(event, JSON.stringify(total_data));

                    $(document).trigger(event);

                }

                localStorage.removeItem(derived_event);
            });

        }
    };

    static get_loaded_view(event) {
        return JSON.parse(localStorage.getItem(event));
    };

    static replace(location = null, title, view_content) {
        location = location == null ? "#dynamic-content-area" : location;

        $("#view-title h1").html(title);

        $(location).html(view_content);

    };

}