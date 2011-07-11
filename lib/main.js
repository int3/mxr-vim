const pageMod = require("page-mod");
const data = require("self").data;
const prefs = require("preferences-service");
const {Cc, Ci} = require("chrome");

function setFirstTime(name, value) {
  if (!prefs.has(name))
    prefs.set("extensions.mxr-vim." + name, value);
}
setFirstTime("sh-path", "/bin/sh");
setFirstTime("vim-path", "/usr/local/bin/mvim");
setFirstTime("src-dir", "");

function getPref(name) {
  return prefs.get("extensions.mxr-vim." + name, null);
}

pageMod.PageMod({
  include: ["http://mxr.mozilla.org/*"],
  contentScriptWhen: "start",
  contentScriptFile: data.url("mxr.js"),
  onAttach: function(worker) {
    worker.port.on("openFile", function(fdata) {
      var srcDir = getPref("src-dir");
      var shPath = getPref("sh-path");
      var vimPath = getPref("vim-path");
      var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
      var programFile = Cc["@mozilla.org/file/local;1"].createInstance(Ci.nsILocalFile);
      programFile.initWithPath(shPath);
      process.init(programFile);
      process.run(false, [vimPath, "--remote", "+" + fdata.line, srcDir + "/" + fdata.name], 4);
    });
  }
});
