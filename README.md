mxr-vim
=======

Old workflow: Search MXR for identifier -> click on a result (nsISomething.cpp
line 500) -> wait for a 6000-line file to load -> decide that you want to edit
this file -> open this file in vim

New workflow: Search MXR for identifier -> click on a result -> result opens in
vim.

Setup
-----
mxr-vim can be [downloaded here][1]. Alternatively, you can
download the source and build it by activating the Addon SDK and typing `cfx
xpi`.

mxr-vim needs to know three things:
    1. where the source tree on your disk is located (no default)
    2. where your shell is located (default /bin/sh)
    3. where vim is located (default /usr/local/bin/mvim)

These pieces of information can be set via about:config. They are located under
`extensions.mxr-vim.*`

To complete the circle of mxr-vim integration, I use the following mappings in
my .vimrc, which fire off a search of MXR for the word under the cursor:

    nnoremap <c-f>i :! open -a Aurora.app 'http://mxr.mozilla.org/mozilla-central/ident?i=<cword>'<cr><cr>
    nnoremap <c-f>f :! open -a Aurora.app 'http://mxr.mozilla.org/mozilla-central/search?string=<cword>'<cr><cr>

[1]: https://addons.mozilla.org/en-US/firefox/addon/mxr-vim/
