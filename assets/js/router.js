class router {

    static load(controller) {

        let rest_of_args = _.drop(arguments);

        switch (controller) {
            case "boards":
                boards_controller.show(...rest_of_args);
                break;
            case "board":
                board_controller.show(...rest_of_args);
                break;
        }

    }

}