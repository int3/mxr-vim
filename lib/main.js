var pageMod = require("page-mod");
var data = require("self").data;
const {Cc, Ci} = require("chrome");

const srcdir = "/Users/jez/src/mozilla-central";

pageMod.PageMod({
    include: ["http://mxr.mozilla.org/*"],
    contentScriptWhen: "start",
    contentScriptFile: data.url("mxr.js"),
    onAttach: function(worker) {
        worker.port.on("openFile", function(fdata) {
            var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
            var programFile = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
            programFile.initWithPath("/bin/sh");
            process.init(programFile);
            process.run(false, ["/usr/local/bin/mvim", "--remote", "+" + fdata.line, srcdir + "/" + fdata.name], 4);
        });
    }
});
