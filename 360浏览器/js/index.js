window.onload = function () {
    new fullpage("#fullpage", {
        sectionsColor: [`#0da5d6`, `#2ab561`, `#de8910`, `#16ba9d`, `#0da5d6`],
        verticalCentered: false,
        afterLoad: function (origin, destination, direction ,trigger) {
            if (origin !== null){
                origin.item.className = origin.item.className.replace("current", "");
            }
            destination.item.className += " current";
        }
    });
}
