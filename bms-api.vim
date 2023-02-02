let SessionLoad = 1
if &cp | set nocp | endif
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +127 /media/source/git/github/BMSProject/bms_connector/schemas.py
badd +101 /media/source/git/github/BMSProject/bms_connector/models.py
badd +347 /media/source/git/github/BMSProject/bms_connector/crud.py
badd +269 /media/source/git/github/BMSProject/bms_connector/main.py
badd +42 /media/source/git/github/BMSProject/bms_connector/Readme.md
badd +129 gitlab/sql/mariadb/panamericano/bms.sql
badd +9 /media/source/git/github/BMSProject/bms_connector/database.py
badd +156 .local/share/luakit/styles/global_dark.css
badd +5 /media/source/git/github/BMSProject/bms_connector/test.py
badd +290 gitlab/sql/sistemas/truncate_sql_log.sql
badd +2 .local/share/luakit/styles/programiz.css
badd +27 gitlab/bms/README.md
badd +11 gitlab/sql/mariadb/ocs/ediq_usr.sql
badd +37 /media/source/git/github/Ambagasdowa/mkforms/src/index.html
badd +109 /media/source/git/github/Ambagasdowa/mkforms/src/js/index.js
badd +5 /media/source/git/github/Ambagasdowa/mkforms/src/css/sqrjs.css
badd +2 /media/source/git/github/Ambagasdowa/mkforms/src/js/dragndrop.js
badd +21 /media/source/git/github/Ambagasdowa/mkforms/src/dragndrop.html
badd +1 gitlab/sql/mariadb/panamericano/bms_test.sql
badd +100 gitlab/sql/mariadb/panamericano/bms_book_view.sql
badd +778 gitlab/sql/mariadb/panamericano/bms_bulk_data.sql
badd +125 gitlab/notes/src/Development/bookstore.md
badd +2 /media/source/git/github/Ambagasdowa/mkforms/README.md
badd +2 /media/source/git/github/Ambagasdowa/mkforms/src/js/base.js
badd +6 /media/source/git/github/Ambagasdowa/mkforms/src/modal.html
badd +2 gitlab/notes/src/Development/js_windows.md
badd +1 /media/source/git/github/Ambagasdowa/mkforms/gitlab/notes/src/Development/js_windows.md
badd +18 /media/source/git/github/Ambagasdowa/mkforms/src/fusion.html
badd +19 /media/source/git/github/Ambagasdowa/mkforms/src/js/dashboard.js
badd +17 /media/source/git/github/Ambagasdowa/mkforms/src/modules/frames.js
badd +224 /media/source/git/github/Ambagasdowa/mkforms/src/modules/lib.js
badd +3 /media/source/git/github/Ambagasdowa/mkforms/src/modules/frames_add.js
badd +16 /media/source/git/github/Ambagasdowa/mkforms/src/iframe.html
badd +211 /media/source/git/github/Ambagasdowa/mkforms/src/css/dashboard.css
badd +7 /media/source/git/github/Ambagasdowa/mkforms/src/upload.html
badd +1 /media/source/git/github/Ambagasdowa/mkforms/src/js/upload.js
badd +4 /media/source/git/github/Ambagasdowa/mkforms/src/modules/uploadModule.js
badd +18 /media/source/git/github/Ambagasdowa/mkforms/src/editor.html
badd +11 /media/source/git/github/Ambagasdowa/mkforms/src/list.html
badd +117 /media/source/git/github/Ambagasdowa/mkforms/src/js/list.js
badd +10 /media/source/git/github/Ambagasdowa/mkforms/src/modules/listModule.js
badd +1 /media/source/git/github/Ambagasdowa/mkforms/src/modules/extend.js
badd +1 /media/source/git/github/Ambagasdowa/mkforms/src/modules/jsmodal_es6.js
badd +157 /media/source/git/github/Ambagasdowa/mkforms/src/css/list.css
badd +133 /media/source/git/github/Ambagasdowa/mkforms/src/js/editor.js
badd +1 /media/source/git/github/Ambagasdowa/mkforms/src/modules/editor.Module.js
badd +765 /media/source/git/github/Ambagasdowa/mkforms/src/modules/editorModule.js
badd +97 /media/source/git/github/turn.js/demos/bible/index.html
badd +32 /media/source/git/github/Ambagasdowa/mkforms/src/css/editor.css
badd +20 /media/source/git/github/Ambagasdowa/mkforms/src/editor_beta.html
argglobal
%argdel
edit /media/source/git/github/Ambagasdowa/mkforms/src/modules/editorModule.js
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 86 + 87) / 174)
exe 'vert 2resize ' . ((&columns * 87 + 87) / 174)
argglobal
balt /media/source/git/github/Ambagasdowa/mkforms/src/js/index.js
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=1
setlocal fml=1
setlocal fdn=10
setlocal nofen
let s:l = 613 - ((18 * winheight(0) + 15) / 31)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 613
normal! 0
lcd /media/source/git/github/Ambagasdowa/mkforms
wincmd w
argglobal
if bufexists(fnamemodify("/media/source/git/github/Ambagasdowa/mkforms/src/modules/editorModule.js", ":p")) | buffer /media/source/git/github/Ambagasdowa/mkforms/src/modules/editorModule.js | else | edit /media/source/git/github/Ambagasdowa/mkforms/src/modules/editorModule.js | endif
balt /media/source/git/github/Ambagasdowa/mkforms/src/css/dashboard.css
setlocal fdm=indent
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=1
setlocal fml=1
setlocal fdn=10
setlocal nofen
let s:l = 109 - ((20 * winheight(0) + 15) / 31)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 109
normal! 0
lcd /media/source/git/github/Ambagasdowa/mkforms
wincmd w
2wincmd w
exe 'vert 1resize ' . ((&columns * 86 + 87) / 174)
exe 'vert 2resize ' . ((&columns * 87 + 87) / 174)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
