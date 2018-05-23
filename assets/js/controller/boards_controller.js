class boards_controller {

    static show() {

        let event = "boards";

        // ask to fetch views and trigger the event
        view.fetch_all(["boards", "boards/board-card"], event);

        // listen to event to get views
        $(document).unbind(event).on(event, function () {

            // views
            let view_data = view.get_loaded_view(event);

            let boards_view = view_data[0];
            let board_card_view = view_data[1];

            // get boards from DB
            let boards = DB.queryAll("boards");

            // create board-cards populated with datas
            let cards_html = boards_controller.get_populated_cards(board_card_view, boards);

            boards_view = boards_view.replace("{boards}", cards_html.join(""));

            view.replace(null, "Boards", boards_view);

        });

    }

    static get_populated_cards(template, datas) {

        let cards = [];

        datas.forEach(function (elm) {

            let card = template;

            card = card.replace("{ID}", elm.ID);
            card = card.replace("{title}", elm.title);
            card = card.replace("{description}", elm.description);

            cards.push(card);

        });

        return cards;

    }

    static create(data) {

        let create_board = DB.insert("boards", {
            title: data.title,
            description: data.description,
            created_by: 1,
            created_at: Date.now()
        });

        DB.commit();

        return create_board;

    }

}