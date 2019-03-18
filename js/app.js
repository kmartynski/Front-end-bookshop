$(function() {

var tbody = $("#books");

tbody.on("click", ".details", function(event) {

    event.preventDefault();

    var link = $(this);
    var tr = $(event.target).closest("tr");

    if (link.text() === "show") {
        link.text("hide");
        var bookId = link.data("id");
        $.get(`http://localhost:8000/book/${bookId}`)
            .done(function(book) {

                var GENRES = {
                    1: "Romans",
                    2: "Obyczajowa",
                    3: "Sci-fi i fantasy",
                    4: "Literatura faktu",
                    5: "Popularnonaukowa",
                    6: "Poradnik",
                    7: "Kryminał, sensacja"
                    };

                var details = $('<tr class="bookDetails">');

                var p1 = $(`<p><b>ISBN</b>: ${book.isbn}</p>`);
                var p2 = $(`<p><b>Publisher</b>: ${book.publisher}</p>`);
                var p3 = $(`<p><b>Genre</b>: ${GENRES[book.genre]}</p>`);
                var p4 = $(`<p><b>ID</b>: ${book.id}</p>`);

                details.append(
                    $('<td colspan="3">').append(p1)
                                         .append(p2)
                                         .append(p3)
                                         .append(p4)

                );

                details.insertAfter(tr);
            })
            .fail(function() {
                alert("Nie można połączyć się z serwerem");
            });
    } else {
        link.text("show");
        tr.next().remove();
    }
});

$.get("http://localhost:8000/book/")
    .done(function(books) {

        tbody.empty();

        for (var i = 0; i < books.length; i++) {

            var tr = $("<tr>");
            tr.append($(`<td>${books[i].author}</td>`));
            tr.append($(`<td>${books[i].title}</td>`));
            tr.append($(`<td><a class="details" href="#" data-id="${books[i].id}">show</a></td>`));
            tr.append($(`<td><a href="#" class="delete">delete</a></td>`));

            tbody.append(tr);
        }
    });

$("form").on("submit", function( event ) {
    event.preventDefault();
    var formData = $("form").serialize();
    console.log(formData);

    $.post("http://localhost:8000/book/", formData)
        .done(function () {
            console.log("Poszło")
        })
});
$(".delete").click(function () {
    $.ajax({
        url: `http://localhost:8000/book/${$(".delete").attr("id")}`,
        data: {},
        type: "Delete",
        dataType: "json"
    });
    console.log("Delete poszlo");
    location.reload()
});
});


