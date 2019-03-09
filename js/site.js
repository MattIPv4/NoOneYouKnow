function generateCard(image, title, info, link) {
    var card = document.createElement("div");
    card.className = "card";

    // If image, create the cover image
    if (typeof image === "string" && image.length) {
        // If link, make cover a link too
        if (typeof link === "string" && link.length) {
            var cover = document.createElement("a");
            cover.target = "_blank";
            cover.href = link.toString();
        } else {
            var cover = document.createElement("div");
        }
        cover.className = "image";
        cover.style.backgroundImage = "url(\"" + image + "\")";
        card.appendChild(cover);
    }

    // If title or info, create h4
    if ((typeof title === "string" && title.length) || (typeof info === "string" && info.length)) {
        var h4 = document.createElement("h4");

        // If title, add text
        if (typeof title === "string" && title.length) {
            h4.innerText = title.toString();
            // If title and info, add br
            if (typeof info === "string" && info.length) {
                h4.appendChild(document.createElement("br"));
            }
        }

        // If info, add small
        if (typeof info === "string" && info.length) {
            var small = document.createElement("small");
            small.innerText = info.toString();
            h4.appendChild(small);
        }

        // Save to card
        card.appendChild(h4);
    }

    // If link, create a
    if (typeof link === "string" && link.length) {
        var a = document.createElement("a");
        a.innerText = "See more";
        a.target = "_blank";
        a.href = link.toString();
        card.appendChild(a);
    }

    // Save card to column and return
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
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // Parse & validate
            if (!this.responseText || !this.responseText.length) return console.error("[Projects] Failed to fetch JSON");
            try {
                var projects = JSON.parse(this.responseText);
            } catch (e) {
                return console.error("[Projects] Failed to parse JSON");
            }
            if (!projects) return console.warn("[Projects] Parsed JSON empty");
            if (!Array.isArray(projects)) return console.error("[Projects] Expecting array, got " + typeof projects);

            // Generate
            var cards = [];
            for (var i = 0; i < projects.length; i++) {
                if (typeof projects[i] !== "object") {
                    console.warn("[Projects] [" + i.toString() + "] Expecting object, got " + typeof projects[i]);
                    continue;
                }
                cards.push(generateCard(
                    projects[i].image,
                    projects[i].title,
                    projects[i].info,
                    projects[i].link
                ));
            }
            renderCards(cards);
        }
    };
    xmlhttp.open("GET", "projects.json", true);
    xmlhttp.send();
});
