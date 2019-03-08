function generateCard(title, info, link) {
    var h4 = document.createElement("h4");
    h4.innerText = title.toString();
    h4.appendChild(document.createElement("br"));

    var small = document.createElement("small");
    small.innerText = info.toString();
    h4.appendChild(small);

    var a = document.createElement("a");
    a.innerText = "See more";
    a.target = "_blank";
    a.href = link.toString();

    var card = document.createElement("div");
    card.className = "card";
    card.appendChild(h4);
    card.appendChild(a);

    var column = document.createElement("div");
    column.className = "three columns";
    column.appendChild(card);
    return column
}

function renderCards(cards) {
    var projects = document.querySelector(".projects");
    var row = null;

    function addNewRow() {
        var newRow = document.createElement("div");
        newRow.className = "row";
        projects.appendChild(newRow);
        row = newRow;
    }

    for (var i = 0; i < cards.length; i++) {
        setTimeout(function (j) {
            if (j % 4 === 0) addNewRow();
            row.appendChild(cards[j]);
        }, 500 * i, i);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var cards = [];
    for (var i = 0; i < 10; i++) {
        cards.push(generateCard("Project title", "Some project info", ""));
    }
    renderCards(cards);
});
