var urlRegex = /.*mozilla-central\/source\/([^#]*)#(\d+)/;
// this works even if the DOM hasn't finished loading
window.addEventListener("click", function(e) {
    var el = e.target;
    if (el.nodeName !== "A")
        return;

    if (el.innerHTML.substr(0, 4) === "line") {
        var [all, fname, line] = urlRegex.exec(el.href);
        self.port.emit("openFile", { name: fname, line: line });
        e.preventDefault();
    }

}, true);
