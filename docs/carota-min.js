!function(u){"use strict";var h,d,i,p,v,o={".js":[],".json":[],".css":[],".html":[]},c="function"==typeof require?require:null;return p=function(t){var e=new Error("Could not find module '"+t+"'");return e.code="MODULE_NOT_FOUND",e},v=function(t,e,n){var r,i;if("function"==typeof t[e+n])return e+n;for(r=0;i=o[n][r];++r)if("function"==typeof t[e+i])return e+i;return null},h=function(t,e,n,r,i,o){var a,s,u,c,l,f;for("."!==(a=(n=n.split("/")).pop())&&".."!==a||(n.push(a),a="");null!=(s=n.shift());)if(s&&"."!==s&&(".."===s?(t=e.pop(),o=o.slice(0,o.lastIndexOf("/"))):(e.push(t),t=t[s],o+="/"+s),!t))throw p(r);if(a&&"function"!=typeof t[a]&&((f=v(t,a,".js"))||(f=v(t,a,".json")),f||(f=v(t,a,".css")),f||(f=v(t,a,".html")),f?a=f:2!==i&&"object"==typeof t[a]&&(e.push(t),t=t[a],o+="/"+a,a="")),!a)return 1!==i&&t[":mainpath:"]?h(t,e,t[":mainpath:"],r,1,o):h(t,e,"index",r,2,o);if(!(l=t[a]))throw p(r);return l.hasOwnProperty("module")?l.module.exports:(u={},l.module=c={exports:u,id:o+"/"+a},l.call(u,u,c,d(t,e,o)),c.exports)},i=function(t,e,n,r){var i,o=n,a=n.charAt(0),s=0;if("/"===a){if(o=o.slice(1),!(t=u["/"])){if(c)return c(n);throw p(n)}r="/",e=[]}else if("."!==a){if(i=o.split("/",1)[0],!(t=u[i])){if(c)return c(n);throw p(n)}r=i,e=[],(o=o.slice(i.length+1))||(s=(o=t[":mainpath:"])?1:(o="index",2))}return h(t,e,o,n,s,r)},(d=function(e,n,r){return function(t){return i(e,[].concat(n),t,r)}})(u,[],"")}({carota:{src:{"carota.js":function(t,e,n){var r={node:n("./node"),editor:n("./editor"),document:n("./doc"),dom:n("./dom"),runs:n("./runs"),html:n("./html"),frame:n("./frame"),text:n("./text"),rect:n("./rect")};if(e.exports=r,"undefined"!=typeof window&&window.document){if(window.carota)throw new Error("Something else is called carota!");window.carota=r}},"characters.js":function(t,e,n){var s=n("./runs"),r=function(t,e){if(t._runs!==e._runs)throw new Error("Characters for different documents")},i={equals:function(t){return r(this,t),this._run===t._run&&this._offset===t._offset},cut:function(o){r(this,o);var a=this;return function(n){for(var t=a._run;t<=o._run;t++){var r=a._runs[t];if(r){var e=t===a._run?a._offset:0,i=t===o._run?o._offset:s.getTextLength(r.text);e<i&&s.getSubText(function(t){var e=Object.create(r);e.text=t,n(e)},r.text,e,i-e)}}}}};function o(t,e,n){return Object.create(i,{_runs:{value:t},_run:{value:e},_offset:{value:n},char:{value:e>=t.length?null:s.getTextChar(t[e].text,n)}})}function a(t,e){for(;e<t.length;e++)if(0!=s.getTextLength(t[e].text))return o(t,e,0);return o(t,t.length,0)}e.exports=function(n){return function(t){for(var e=a(n,0);!t(e)&&null!==e.char;)e=e._offset+1<s.getTextLength(n[e._run].text)?o(n,e._run,e._offset+1):a(n,e._run+1)}}},"codes.js":function(t,e,n){var u=n("./text"),d=n("./frame"),p=n("./node"),v=n("./rect"),o=n("./util"),g=p.derive({parent:function(){return this._parent},draw:function(t){this.inline.draw(t,this.left,this.baseline,this.measured.width,this.measured.ascent,this.measured.descent,this.formatting)},position:function(t,e,n){this.left=t,this.baseline=e,n&&(this._bounds=n)},bounds:function(){return this._bounds||v(this.left,this.baseline-this.measured.ascent,this.measured.width,this.measured.ascent+this.measured.descent)},byCoordinate:function(t,e){return t<=this.bounds().center().x?this:this.next()}}),i={number:function(t,e){var s=e+1+".";return{measure:function(t){return u.measure(s,t)},draw:function(t,e,n,r,i,o,a){u.draw(t,s,a,e,n,r,i,o)}}}};i.listNext=i.listEnd=function(t){return o.derive(t,{eof:!0,measure:function(t){return{width:18,ascent:0,descent:0}},draw:function(t,e,n){}})},i.listStart=function(i,t,h){return o.derive(i,{block:function(o,a,r,s,t,e){var u,c,l,f=p.generic("list",t,o,a),n=function(t,e){u=p.generic("item",f);var n=h(t.marker||{$:"number"},f.children().length);(l=function(t,e,n,r,i){if(!t.draw||!t.measure)throw new Error;return Object.create(g,{inline:{value:t},_parent:{value:e},ordinal:{value:n},length:{value:r},formatting:{value:i},measured:{value:t.measure(i)}})}(n,u,s,1,e)).block=!0,c=d(o+50,a,r-50,s+1,u,function(t){return"listEnd"===t.$},l.measured.ascent)};return n(i,e),function(t){if(c?c(function(t){s=t.ordinal+t.length;var e=t.bounds(),n=t.first(),r=o+50-10-l.measured.width,i=v(o,a,50,e.h);"baseline"in n?l.position(r,n.baseline,i):l.position(r,a+l.measured.ascent,i),a=e.t+e.h,u.children().push(l),u.children().push(t),u.finalize(),f.children().push(u),u=c=l=null},t):s++,!c){var e=t.code();if(e){if("listEnd"==e.$)return f.finalize(),f;"listNext"==e.$&&n(e,t.codeFormatting())}}}}})},e.exports=t=function(t,e,n){var r=i[t.$];return r&&r(t,e,n)},t.editFilter=function(r){var i=0;if(!r.words.some(function(t,e){var n=t.code();if(n)switch(n.$){case"listStart":i++;break;case"listNext":if(0===i)return r.spliceWordsWithRuns(e,1,[o.derive(t.codeFormatting(),{text:{$:"listStart",marker:n.marker}})]),!0;break;case"listEnd":0===i&&r.spliceWordsWithRuns(e,1,[]),i--}})&&0<i){for(var t=[];0<i;)i--,t.push({text:{$:"listEnd"}});r.spliceWordsWithRuns(r.words.length-1,0,t)}}},"doc.js":function(t,e,n){var f=n("per"),s=n("./characters"),u=n("./split"),c=n("./word"),r=n("./node"),h=n("./runs"),i=n("./range"),o=n("./util"),a=n("./frame"),l=n("./codes"),d=n("./rect"),p=function(n,r,i,o){var a=n.selection.start,s=n.selection.end;return function(t){n._wordOrdinals=[];var e=Array.prototype.splice.apply(n.words,[r,i].concat(o));t(p(n,r,o.length,e)),n._nextSelection={start:a,end:s}}},v=function(t){var e=[],n=function(t){e.push(t),n.length=e.length};return t(n),function(t){t(v(function(t){for(;e.length;)e.pop()(t)}))}},g=function(t){if(t.isNewLine())return!0;var e=t.code();return!(!e||!e.block&&!e.eof)},m=r.derive({load:function(t,e){var n=this;this.undo=[],this.redo=[],this._wordOrdinals=[],this.words=f(s(t)).per(u(n.codes)).map(function(t){return c(t,n.codes)}).all(),this.layout(),this.contentChanged.fire(),this.select(0,0,e)},layout:function(){this.frame=null;try{this.frame=f(this.words).per(a(0,0,this._width,0,this)).first()}catch(t){console.error(t)}if(this.frame){if(this._nextSelection){var t=this._nextSelection;delete this._nextSelection,this.select(t.start,t.end)}}else console.error("A bug somewhere has produced an invalid state - rolling back"),this.performUndo()},range:function(t,e){return i(this,t,e)},documentRange:function(){return this.range(0,this.frame.length-1)},selectedRange:function(){return this.range(this.selection.start,this.selection.end)},save:function(){return this.documentRange().save()},paragraphRange:function(t,e){var n,r=this.wordContainingOrdinal(t);if(t=0,r&&!g(r.word))for(n=r.index;0<n;n--)if(g(this.words[n-1])){t=this.wordOrdinal(n);break}var i=this.wordContainingOrdinal(e);if(e=this.frame.length-1,i&&!g(i.word))for(n=i.index;n<this.words.length;n++)if(g(this.words[n])){e=this.wordOrdinal(n);break}return this.range(t,e)},insert:function(t,e){this.select(this.selection.end+this.selectedRange().setText(t),null,e)},modifyInsertFormatting:function(t,e){this.nextInsertFormatting[t]=e,this.notifySelectionChanged()},applyInsertFormatting:function(t){var n=this.nextInsertFormatting,r=Object.keys(n);r.length&&t.forEach(function(e){r.forEach(function(t){e[t]=n[t]})})},wordOrdinal:function(t){if(t<this.words.length){var e=this._wordOrdinals.length;if(e<t+1)for(var n=0<e?this._wordOrdinals[e-1]:0,r=e;r<=t;r++)this._wordOrdinals[r]=n,n+=this.words[r].length;return this._wordOrdinals[t]}},wordContainingOrdinal:function(n){var r,i=0;return this.words.some(function(t,e){if(i<=n&&n<i+t.length)return r={word:t,ordinal:i,index:e,offset:n-i},!0;i+=t.length}),r},runs:function(t,e){var n=this.wordContainingOrdinal(Math.max(0,e.start)),r=this.wordContainingOrdinal(Math.min(e.end,this.frame.length-1));if(n.index===r.index)n.word.runs(t,{start:n.offset,end:r.offset});else{n.word.runs(t,{start:n.offset});for(var i=n.index+1;i<r.index;i++)this.words[i].runs(t);r.word.runs(t,{end:r.offset})}},spliceWordsWithRuns:function(n,r,t){var i=this,o=f(s(t)).per(u(i.codes)).truthy().map(function(t){return c(t,i.codes)}).all(),a=!1;if("_filtersRunning"in i)i._filtersRunning++;else{for(var e=0;e<r;e++)this.words[n+e].code()&&(a=!0);a||(a=o.some(function(t){return!!t.code()}))}this.transaction(function(t){if(p(i,n,r,o)(t),a){i._filtersRunning=0;try{for(;;){var e=i._filtersRunning;if(!i.editFilters.some(function(t){return t(i),e!==i._filtersRunning}))break}}finally{delete i._filtersRunning}}})},splice:function(t,e,n){if("string"==typeof n){var r=Math.max(0,t-1),i=f({start:r,end:r+1}).per(this.runs,this).first();n=[i?Object.create(i,{text:{value:n}}):{text:n}]}else Array.isArray(n)||(n=[{text:n}]);this.applyInsertFormatting(n);var o,a,s=this.wordContainingOrdinal(t),u=this.wordContainingOrdinal(e);if(t===s.ordinal)if(0<s.index&&!g(this.words[s.index-1])){s.index--;var c=this.words[s.index];o=f({}).per(c.runs,c).all()}else o=[];else o=f({end:s.offset}).per(s.word.runs,s.word).all();e===u.ordinal?e===this.frame.length-1||g(u.word)?(a=[],u.index--):a=f({}).per(u.word.runs,u.word).all():a=f({start:u.offset}).per(u.word.runs,u.word).all();var l=this.frame.length;return this.spliceWordsWithRuns(s.index,u.index-s.index+1,f(o).concat(n).concat(a).per(h.consolidate()).all()),this.frame?this.frame.length-l:0},registerEditFilter:function(t){this.editFilters.push(t)},width:function(t){if(0===arguments.length)return this._width;this._width=t,this.layout()},children:function(){return[this.frame]},toggleCaret:function(){var t=this.caretVisible;return this.selection.start===this.selection.end&&(this.selectionJustChanged?this.selectionJustChanged=!1:this.caretVisible=!this.caretVisible),this.caretVisible!==t},getCaretCoords:function(t){var e,n=this.byOrdinal(t);if(n){if(n.block&&0<t){var r=this.byOrdinal(t-1);if(r.newLine){var i=r.bounds(),o=r.parent().parent().bounds();e=d(o.l,o.b,1,i.h)}else e=r.bounds(),e=d(e.r,e.t,1,e.h)}else e=(e=n.bounds()).h?d(e.l,e.t,1,e.h):d(e.l,e.t,e.w,1);return e}},byCoordinate:function(t,e){for(var n=this.frame.byCoordinate(t,e).ordinal,r=this.getCaretCoords(n);r.b<=e&&n<this.frame.length-1;)n++,r=this.getCaretCoords(n);for(;r.t>=e&&0<n;)n--,r=this.getCaretCoords(n);return this.byOrdinal(n)},drawSelection:function(e,t){if(this.selection.end===this.selection.start){if(this.selectionJustChanged||t&&this.caretVisible){var n=this.getCaretCoords(this.selection.start);n&&(e.save(),e.fillStyle="black",n.fill(e),e.restore())}}else e.save(),e.fillStyle=t?"rgba(0, 100, 200, 0.3)":"rgba(160, 160, 160, 0.3)",this.selectedRange().parts(function(t){t.bounds(!0).fill(e)}),e.restore()},notifySelectionChanged:function(t){var e=null,n=this;this.selectionChanged.fire(function(){return e||(e=n.selectedRange().getFormatting()),e},t)},select:function(t,e,n){this.frame&&(this.selection.start=Math.max(0,t),this.selection.end=Math.min("number"==typeof e?e:this.selection.start,this.frame.length-1),this.selectionJustChanged=!0,this.caretVisible=!0,this.nextInsertFormatting={},this.notifySelectionChanged(n))},performUndo:function(t){var e=t?this.redo:this.undo,n=t?this.undo:this.redo,r=e.pop();r&&(r(function(t){n.push(t)}),this.layout(),this.contentChanged.fire())},canUndo:function(t){return t?!!this.redo.length:!!this.undo.length},transaction:function(e){if(this._currentTransaction)e(this._currentTransaction);else{for(var n=this;50<this.undo.length;)n.undo.shift();this.redo.length=0;var r=!1;this.undo.push(v(function(t){n._currentTransaction=t;try{e(t)}finally{r=0<t.length,n._currentTransaction=null}})),r&&(n.layout(),n.contentChanged.fire())}},type:"document"});e.exports=function(){var n=Object.create(m);return n._width=0,n.selection={start:0,end:0},n.caretVisible=!0,n.customCodes=function(t,e,n){},n.codes=function(t,e){return l(t,e,n.codes)||n.customCodes(t,e,n.codes)},n.selectionChanged=o.event(),n.contentChanged=o.event(),n.editFilters=[l.editFilter],n.load([]),n}},"dom.js":function(i,t,e){i.isAttached=function(t){for(var e=t;e.parentNode;)e=e.parentNode;return!!e.body},i.clear=function(t){for(;t.firstChild;)t.removeChild(t.firstChild)},i.setText=function(t,e){i.clear(t),t.appendChild(document.createTextNode(e))},i.handleEvent=function(t,e,n){t.addEventListener(e,function(t){!1===n(t)&&t.preventDefault()})},i.handleMouseEvent=function(n,t,r){i.handleEvent(n,t,function(t){var e=n.getBoundingClientRect();return r(t,t.clientX-e.left,t.clientY-e.top)})},i.effectiveStyle=function(t,e){return document.defaultView.getComputedStyle(t).getPropertyValue(e)}},"editor.js":function(t,e,n){n("per");var M=n("./doc"),S=n("./dom"),R=n("./rect");setInterval(function(){var t=document.querySelectorAll(".carotaEditorCanvas"),e=document.createEvent("Event");e.initEvent("carotaEditorSharedTimer",!0,!0);for(var n=0;n<t.length;n++)t[n].dispatchEvent(e)},200),t.create=function(a){"absolute"!==S.effectiveStyle(a,"position")&&(a.style.position="relative"),a.innerHTML='<div class="carotaSpacer"><canvas width="100" height="100" class="carotaEditorCanvas" style="position: absolute;"></canvas></div><div class="carotaTextArea" style="overflow: hidden; position: absolute; height: 0;"><textarea autocorrect="off" autocapitalize="off" spellcheck="false" tabindex="0" style="position: absolute; padding: 0px; width: 1000px; height: 1em; outline: none; font-size: 4px;"></textarea>';var s=a.querySelector("canvas"),u=a.querySelector(".carotaSpacer"),c=a.querySelector(".carotaTextArea"),l=a.querySelector("textarea"),d=M(),p=0,v=null,g=null,f=null,m=null,h="",y=null,w=null,b={66:"bold",73:"italic",85:"underline",83:"strikeout"},i=function(t,e){return e<0?t<=0:t>=d.frame.length-1},o=function(t,e){return t.b<=e.t||e.b<=t.t},x=function(t,e){var n,r=d.getCaretCoords(t);for(g=null!==v?v:r.l;!i(t,e)&&(t+=e,n=d.getCaretCoords(t),!o(n,r)););for(r=n;!i(t,e)&&!(0<e&&n.l>=g||e<0&&n.l<=g);)if(t+=e,n=d.getCaretCoords(t),o(n,r)){t-=e;break}return t},C=function(t,e){for(var n,r=d.getCaretCoords(t);!i(t,e);)if(t+=e,n=d.getCaretCoords(t),o(n,r)){t-=e;break}return t},e=function(t,e,n){var r=d.selection.start,i=d.selection.end,o=d.frame.length-1,a=!1;if(g=null,e){if(!p)switch(t){case 37:case 38:case 36:case 33:p=-1;break;case 39:case 40:case 35:case 34:p=1}}else p=0;var s=1===p?i:r,u=!1;switch(t){case 37:if(e||r==i){if(0<s)if(n)s=(c=d.wordContainingOrdinal(s)).ordinal===s?0<c.index?d.wordOrdinal(c.index-1):0:c.ordinal;else s--}else s=r;u=!0;break;case 39:var c;if(e||r==i){if(s<o)if(n)s=(c=d.wordContainingOrdinal(s)).ordinal+c.word.length;else s++}else s=i;u=!0;break;case 40:s=x(s,1),u=!0;break;case 38:s=x(s,-1),u=!0;break;case 36:s=C(s,-1),u=!0;break;case 35:s=C(s,1),u=!0;break;case 33:u=!(s=0);break;case 34:s=o,u=!0;break;case 8:r===i&&0<r&&(d.range(r-1,r).clear(),m=r-1,d.select(m,m),a=!0);break;case 46:r===i&&r<o&&(d.range(r,r+1).clear(),a=!0);break;case 90:n&&(a=!0,d.performUndo());break;case 89:n&&(a=!0,d.performUndo(!0));break;case 65:n&&(a=!0,d.select(0,o));break;case 67:case 88:n&&(y=d.selectedRange().save(),w=d.selectedRange().plainText())}var l=b[t];if(n&&l){var f=d.selectedRange();f.setFormatting(l,!0!==f.getFormatting()[l]),E(),a=!0}if(u){switch(p){case 0:r=i=s;break;case-1:r=s;break;case 1:i=s}if(r===i)p=0;else if(i<r){p=-p;var h=i;i=r,r=h}m=s,d.select(r,i),a=!0}return v=g,a};S.handleEvent(l,"keydown",function(t){if(e(t.keyCode,t.shiftKey,t.ctrlKey))return!1;console.log(t.which)});var n="top";function _(){var t=d.frame.bounds().h;if(t<a.clientHeight)switch(n){case"middle":return(a.clientHeight-t)/2;case"bottom":return a.clientHeight-t}return 0}d.setVerticalAlignment=function(t){n=t,E()};var E=function(){var t=1*a.clientWidth;d.width()!==t&&d.width(t);var e=d.frame.bounds().h,n=Math.max(1,window.devicePixelRatio||1),r=Math.max(d.frame.actualWidth(),a.clientWidth),i=a.clientHeight;s.width=n*r,s.height=n*i,s.style.width=r+"px",s.style.height=i+"px",s.style.top=a.scrollTop+"px",u.style.width=r+"px",u.style.height=Math.max(e,a.clientHeight)+"px",e<a.clientHeight-50&&d.frame.actualWidth()<=t?a.style.overflow="hidden":a.style.overflow="auto";var o=s.getContext("2d");o.scale(n,n),o.clearRect(0,0,r,i),o.translate(0,_()-a.scrollTop),d.draw(o,R(0,a.scrollTop,r,i)),d.drawSelection(o,f||document.activeElement===l)};S.handleEvent(a,"scroll",E),S.handleEvent(l,"input",function(){var t=l.value;h!=t&&(h="",l.value="",t===w&&(t=y),d.insert(t))});var r=function(){m=null===m?d.selection.end:m;var t=d.byOrdinal(m);if(m=null,t){var e=t.bounds();c.style.left=e.l+"px",c.style.top=e.t+"px",l.focus();var n=Math.max(0,e.t+e.h-(a.scrollTop+a.clientHeight));n&&(a.scrollTop+=n);var r=Math.max(0,a.scrollTop-e.t);r&&(a.scrollTop-=r);var i=Math.max(0,e.l-(a.scrollLeft+a.clientWidth));i&&(a.scrollLeft+=i);var o=Math.max(0,a.scrollLeft-e.l);o&&(a.scrollLeft-=o)}h=d.selectedRange().plainText(),l.value=h,l.select(),setTimeout(function(){l.focus()},10)};function t(t,r){S.handleMouseEvent(u,t,function(t,e,n){r(d.byCoordinate(e,n-_()))})}d.selectionChanged(function(t,e){E(),f||!1!==e&&r()}),t("mousedown",function(t){f=t.ordinal,d.select(t.ordinal,t.ordinal),v=null}),t("dblclick",function(t){(t=t.parent())&&d.select(t.ordinal,t.ordinal+(t.word?t.word.text.length:t.length))}),t("mousemove",function(t){null!==f&&t&&(m=t.ordinal,f>t.ordinal?d.select(t.ordinal,f):d.select(f,t.ordinal))}),t("mouseup",function(t){v=f=null,r(),l.focus()});var O=(new Date).getTime(),k=!1,T=a.clientWidth,j=a.clientHeight,A=function(){var t=!1,e=document.activeElement===l;k!==e&&(k=e,t=!0);var n=(new Date).getTime();O<n&&(O=n+500,d.toggleCaret()&&(t=!0)),a.clientWidth===T&&a.clientHeight===j||(t=!0,T=a.clientWidth,j=a.clientHeight),t&&E()};return S.handleEvent(s,"carotaEditorSharedTimer",A),A(),d.sendKey=e,d}},"frame.js":function(t,e,n){var r=n("./node"),d=n("./wrap"),o=n("./rect"),p=r.derive({bounds:function(){if(!this._bounds){var t=0,e=0,n=0,r=0;if(this.lines.length){var i=this.lines[0].bounds();t=i.l,e=i.t,this.lines.forEach(function(t){var e=t.bounds();n=Math.max(n,e.l+e.w),r=Math.max(r,e.t+e.h)})}this._bounds=o(t,e,n-t,this.height||r-e)}return this._bounds},actualWidth:function(){if(!this._actualWidth){var e=0;this.lines.forEach(function(t){"number"==typeof t.actualWidth&&(e=Math.max(e,t.actualWidth))}),this._actualWidth=e}return this._actualWidth},children:function(){return this.lines},parent:function(){return this._parent},draw:function(n,r){var i=r?r.t:0,o=r?r.t+r.h:Number.MAX_VALUE;this.lines.some(function(t){var e=t.bounds();return!(e.t+e.h<i)&&(e.t>o||void t.draw(n,r))})},type:"frame"});e.exports=function(t,e,n,r,i,o,a,s){var u=[],c=Object.create(p,{lines:{value:u},_parent:{value:i},ordinal:{value:r}}),l=d(t,e,n,r,c,o,a,s),f=0,h=0;return function(t,e){if(l(function(t){"number"==typeof t?h=t:(f=t.ordinal+t.length-r,u.push(t))},e))return Object.defineProperty(c,"length",{value:f}),Object.defineProperty(c,"height",{value:h}),t(c),!0}}},"html.js":function(t,e,n){var i=n("./runs"),c=n("per"),r=function(n,r){return function(t,e){t.nodeName===n&&(e[r]=!0)}},o=function(r,i,o,a){return function(t,e){var n=t[r]&&t[r][i];n&&(a&&(n=a(n)),e[o]=n)}},a=function(t,e,n){return o("attributes",t,e,n)},s=function(t,e,n){return o("style",t,e,n)},u=function(n,r,i){return function(t,e){t.style&&t.style[n]===r&&(e[i]=!0)}},l=[6,7,9,10,12,16,20,30],f={left:!0,center:!0,right:!0,justify:!0},h=function(t){return f[t]?t:"left"},d=function(t){var e=t.split(/\s*,\s*/g);if(0==e.length)return t;var n=(t=e[0]).match(/^"(.*)"$/);return n?n[1].trim():(n=t.match(/^'(.*)'$/))?n[1].trim():t},p={H1:30,H2:20,H3:16,H4:14,H5:12},v=[r("B","bold"),r("STRONG","bold"),r("I","italic"),r("EM","italic"),r("U","underline"),r("S","strikeout"),r("STRIKE","strikeout"),r("DEL","strikeout"),u("fontWeight","bold","bold"),u("fontStyle","italic","italic"),u("textDecoration","underline","underline"),u("textDecoration","line-through","strikeout"),s("color","color"),s("fontFamily","font",d),s("fontSize","size",function(t){var e=t.match(/^([\d\.]+)pt$/);return e?parseFloat(e[1]):10}),s("textAlign","align",h),function(t,e){"SUB"===t.nodeName&&(e.script="sub")},function(t,e){"SUPER"===t.nodeName&&(e.script="super")},function(t,e){"CODE"===t.nodeName&&(e.font="monospace")},function(t,e){var n=p[t.nodeName];n&&(e.size=n)},a("color","color"),a("face","font",d),a("align","align",h),a("size","size",function(t){return l[t]||10})],g={};["BR","P","H1","H2","H3","H4","H5"].forEach(function(t){g[t]=!0}),t.parse=function(t,o){var e=t;"string"==typeof e&&((e=document.createElement("div")).innerHTML=t);var n=[],a=!0,r=c(i.consolidate()).into(n),s=function(t,e){r.submit(Object.create(e,{text:{value:t}}))},u=function(t,e){var n=(t=t.replace(/\n+\s*/g," ")).length;t=t.replace(/^\s+/,""),a?a=!1:n!==t.length&&(t=" "+t),(n=t.length)!==(t=t.replace(/\s+$/,"")).length&&(a=!0,t+=" "),s(t,e)};return function t(e,n){if(3==e.nodeType)u(e.nodeValue,n);else{n=Object.create(n);var r=e.attributes.class;if(r&&r.value.split(" ").forEach(function(e){(e=o[e])&&Object.keys(e).forEach(function(t){n[t]=e[t]})}),v.forEach(function(t){t(e,n)}),e.childNodes)for(var i=0;i<e.childNodes.length;i++)t(e.childNodes[i],n);g[e.nodeName]&&(s("\n",n),a=!0)}}(e,{}),n}},"line.js":function(t,e,n){var d=n("./positionedword"),r=n("./rect"),i=n("./node"),p=(n("./runs"),i.derive({bounds:function(t){if(t){var e=this.first().bounds(),n=this.last().bounds();return r(e.l,this.baseline-this.ascent,n.l+n.w-e.l,this.ascent+this.descent)}return r(this.left,this.baseline-this.ascent,this.width,this.ascent+this.descent)},parent:function(){return this.doc},children:function(){return this.positionedWords},type:"line"}));e.exports=function(t,e,n,r,i,o,a,s){var u=a[0].align(),c=Object.create(p,{doc:{value:t},left:{value:e},width:{value:n},baseline:{value:r*0.9},ascent:{value:i},descent:{value:o},ordinal:{value:s},align:{value:u}}),l=0;a.forEach(function(t){l+=t.width}),l-=a[a.length-1].space.width;var f=0,h=0;if(l<n)switch(u){case"right":f=n-l;break;case"center":f=(n-l)/2;break;case"justify":1<a.length&&!a[a.length-1].isNewLine()&&(h=(n-l)/(a.length-1))}return Object.defineProperty(c,"positionedWords",{value:a.map(function(t){var e=f;f+=t.width+h;var n=s;return s+=t.text.length+t.space.length,d(t,c,e,n,t.width+h)})}),Object.defineProperty(c,"actualWidth",{value:l}),Object.defineProperty(c,"length",{value:s-c.ordinal}),c}},"node.js":function(e,t,n){n("per"),n("./runs");var a=n("./rect"),r=n("./util");e.prototype={children:function(){return[]},parent:function(){return null},first:function(){return this.children()[0]},last:function(){return this.children()[this.children().length-1]},next:function(){for(var t=this;;){var e=t.parent();if(!e)return null;var n=e.children(),r=n[n.indexOf(t)+1];if(r){for(;;){var i=r.first();if(!i)break;r=i}return r}t=e}},previous:function(){var t=this.parent();if(!t)return null;var e=t.children(),n=e[e.indexOf(this)-1];if(n)return n;var r=t.previous();return r?r.last():null},byOrdinal:function(e){var n=null;return this.children().some(function(t){if(e>=t.ordinal&&e<t.ordinal+t.length&&(n=t.byOrdinal(e)))return!0})?n:this},byCoordinate:function(e,n){var r;if(this.children().some(function(t){if(t.bounds().contains(e,n)&&(r=t.byCoordinate(e,n)))return!0}),!r){for(r=this.last();r;){var t=r.last();if(!t)break;r=t}var i=r.next();i&&i.block&&(r=i)}return r},draw:function(e,n){this.children().forEach(function(t){t.draw(e,n)})},parentOfType:function(t){var e=this.parent();return e&&(e.type===t?e:e.parentOfType(t))},bounds:function(){var n=this._left,r=this._top,i=0,o=0;return this.children().forEach(function(t){var e=t.bounds();n=Math.min(n,e.l),r=Math.min(r,e.t),i=Math.max(i,e.l+e.w),o=Math.max(o,e.t+e.h)}),a(n,r,i-n,o-r)}},e.derive=function(t){return r.derive(e.prototype,t)};var i=e.derive({children:function(){return this._children},parent:function(){return this._parent},finalize:function(t,e){var n=Number.MAX_VALUE,r=0;this._children.forEach(function(t){n=Math.min(n,t.ordinal),r=Math.max(r,t.ordinal+t.length)}),Object.defineProperty(this,"ordinal",{value:n-(t||0)}),Object.defineProperty(this,"length",{value:(e||0)+r-n})}});e.generic=function(t,e,n,r){return Object.create(i,{type:{value:t},_children:{value:[]},_parent:{value:e},_left:{value:"number"==typeof n?n:Number.MAX_VALUE},_top:{value:"number"==typeof r?r:Number.MAX_VALUE}})}},"part.js":function(t,e,n){var a=n("./text"),s={measure:function(t){var e=e.measure("?",t);return{width:e.width+4,ascent:e.width+2,descent:e.width+2}},draw:function(t,e,n,r,i,o){t.fillStyle="silver",t.fillRect(e,n-i,r,i+o),t.strokeRect(e,n-i,r,i+o),t.fillStyle="black",t.fillText("?",e+2,n)}},u={draw:function(t,e,n){"string"==typeof this.run.text?a.draw(t,this.run.text,this.run,e,n,this.width,this.ascent,this.descent):this.code&&this.code.draw&&(t.save(),this.code.draw(t,e,n,this.width,this.ascent,this.descent,this.run),t.restore())}};e.exports=function(t,e){var n,r,i;n="string"==typeof t.text?(r=1===t.text.length&&"\n"===t.text[0],a.measure(r?a.nbsp:t.text,t)):(i=e(t.text)||s).measure?i.measure(t):{width:0,ascent:0,descent:0};var o=Object.create(u,{run:{value:t},isNewLine:{value:r},width:{value:r?0:n.width},ascent:{value:n.ascent},descent:{value:n.descent}});return i&&Object.defineProperty(o,"code",{value:i}),o}},"positionedword.js":function(t,e,n){var r=n("./rect"),c=n("./part"),i=n("./text"),o=n("./node"),l=(n("./word"),n("./runs")),a=function(t){return i.measure(i.enter,t).width},f=o.derive({bounds:function(){var t=this.word.bounds(),e=this.word.word.isNewLine()?a(this.word.word.run):this.width||this.part.width;return r(t.l+this.left,t.t,e,t.h)},parent:function(){return this.word},byOrdinal:function(){return this},byCoordinate:function(t,e){return t<=this.bounds().center().x?this:this.next()},type:"character"}),s=o.derive({draw:function(t){this.word.draw(t,this.line.left+this.left,this.line.baseline)},bounds:function(){return r(this.line.left+this.left,this.line.baseline-this.line.ascent,this.word.isNewLine()?a(this.word.run):this.width,this.line.ascent+this.line.descent)},parts:function(t){this.word.text.parts.some(t)||this.word.space.parts.some(t)},realiseCharacters:function(){if(!this._characters){var i=[],o=0,a=this,s=this.ordinal,u=this.parentOfType("document").codes;this.parts(function(r){l.pieceCharacters(function(t){var e=Object.create(r.run);e.text=t;var n=c(e,u);i.push(Object.create(f,{left:{value:o},part:{value:n},word:{value:a},ordinal:{value:s},length:{value:1}})),o+=n.width,s++},r.run.text)});var t=i[i.length-1];t&&(Object.defineProperty(t,"width",{value:this.width-t.left}),(this.word.isNewLine()||this.word.code()&&this.word.code().eof)&&Object.defineProperty(t,"newLine",{value:!0})),this._characters=i}},children:function(){return this.realiseCharacters(),this._characters},parent:function(){return this.line},type:"word"});e.exports=function(t,e,n,r,i){return Object.create(s,{word:{value:t},line:{value:e},left:{value:n},width:{value:i},ordinal:{value:r},length:{value:t.text.length+t.space.length}})}},"range.js":function(t,e,n){var r=n("per"),o=n("./runs");function i(t,e,n){this.doc=t,this.start=e,(this.end=n)<e&&(this.start=n,this.end=e)}i.prototype.parts=function(e,t){t=t||this.doc.children();var n=this;t.some(function(t){return!(t.ordinal+t.length<=n.start)&&(t.ordinal>=n.end||void(t.ordinal>=n.start&&t.ordinal+t.length<=n.end?e(t):n.parts(e,t.children())))})},i.prototype.clear=function(){return this.setText([])},i.prototype.setText=function(t){return this.doc.splice(this.start,this.end,t)},i.prototype.runs=function(t){this.doc.runs(t,this)},i.prototype.plainText=function(){return r(this.runs,this).map(o.getPlainText).all().join("")},i.prototype.save=function(){return r(this.runs,this).per(o.consolidate()).all()},i.prototype.getFormatting=function(){var t=this;if(t.start===t.end){var e=t.start;0<e&&e--,t.start=e,t.end=e+1}return r(t.runs,t).reduce(o.merge).last()||o.defaultFormatting},i.prototype.setFormatting=function(t,e){var n=this;if("align"===t&&(n=n.doc.paragraphRange(n.start,n.end)),n.start===n.end)n.doc.modifyInsertFormatting(t,e);else{var r=n.save(),i={};i[t]=e,o.format(r,i),n.setText(r)}},e.exports=function(t,e,n){return new i(t,e,n)}},"rect.js":function(t,e,n){var i={contains:function(t,e){return t>=this.l&&t<this.l+this.w&&e>=this.t&&e<this.t+this.h},stroke:function(t){t.strokeRect(this.l,this.t,this.w,this.h)},fill:function(t){t.fillRect(this.l,this.t,this.w,this.h)},offset:function(t,e){return r(this.l+t,this.t+e,this.w,this.h)},equals:function(t){return this.l===t.l&&this.t===t.t&&this.w===t.w&&this.h===t.h},center:function(){return{x:this.l+this.w/2,y:this.t+this.h/2}}},r=e.exports=function(t,e,n,r){return Object.create(i,{l:{value:t},t:{value:e},w:{value:n},h:{value:r},r:{value:t+n},b:{value:e+r}})}},"runs.js":function(s,t,e){s.formattingKeys=["bold","italic","underline","strikeout","color","font","size","align","script"],s.defaultFormatting={size:26,font:"EB Garamond, serif",color:"black",bold:!1,italic:!1,underline:!1,strikeout:!1,align:"left",script:"normal"},s.sameFormatting=function(e,n){return s.formattingKeys.every(function(t){return e[t]===n[t]})},s.clone=function(n){var r={text:n.text};return s.formattingKeys.forEach(function(t){var e=n[t];e&&e!=s.defaultFormatting[t]&&(r[t]=e)}),r},s.multipleValues={},s.merge=function(e,n){if(1===arguments.length)return Array.isArray(e)?e.reduce(s.merge):e;if(2<arguments.length)return s.merge(Array.prototype.slice.call(arguments,0));var r={};return s.formattingKeys.forEach(function(t){(t in e||t in n)&&(e[t]===n[t]?r[t]=e[t]:r[t]=s.multipleValues)}),r},s.format=function(e,n){Array.isArray(e)?e.forEach(function(t){s.format(t,n)}):Object.keys(n).forEach(function(t){n[t]!==s.multipleValues&&(e[t]=n[t])})},s.consolidate=function(){var n;return function(t,e){n&&s.sameFormatting(n,e)&&"string"==typeof n.text&&"string"==typeof e.text?n.text+=e.text:t(n=s.clone(e))}},s.getPlainText=function(t){if("string"==typeof t.text)return t.text;if(Array.isArray(t.text)){var e=[];return t.text.forEach(function(t){e.push(s.getPiecePlainText(t))}),e.join("")}return"_"},s.getPieceLength=function(t){return t.length||1},s.getPiecePlainText=function(t){return t.length?t:"_"},s.getTextLength=function(t){if("string"==typeof t)return t.length;if(Array.isArray(t)){var e=0;return t.forEach(function(t){e+=s.getPieceLength(t)}),e}return 1},s.getSubText=function(r,t,i,o){if(0!==o)if("string"!=typeof t)if(Array.isArray(t)){var a=0;t.some(function(t){if(o<=0)return!0;var e=s.getPieceLength(t);if(i<a+e)if(1===e)r(t),o-=1;else{var n=t.substr(Math.max(0,i-a),o);r(n),o-=n.length}a+=e})}else r(t);else r(t.substr(i,o))},s.getTextChar=function(t,e){var n;return s.getSubText(function(t){n=t},t,e,1),n},s.pieceCharacters=function(t,e){if("string"==typeof e)for(var n=0;n<e.length;n++)t(e[n]);else t(e)}},"split.js":function(t,e,n){e.exports=function(i){var o=null,a=null,s=!0;return function(t,e){var n;if(null===e.char)n=!0;else if(s&&(s=!(n=!0)),"string"==typeof e.char)switch(e.char){case" ":a||(a=e);break;case"\n":s=n=!0;break;default:a&&(n=!0)}else{var r=i(e.char);(r.block||r.eof)&&(s=n=!0)}if(n){if(o&&!o.equals(e)){if(!1===t({text:o,spaces:a||e,end:e}))return!1;a=null}null===e.char&&t(null),o=e}}}},"text.js":function(u,t,e){var n=e("./runs"),r=u.getFontString=function(t){var e=t&&t.size||n.defaultFormatting.size;if(t)switch(t.script){case"super":case"sub":e*=.8}return(t&&t.italic?"italic ":"")+(t&&t.bold?"bold ":"")+" "+e+"pt "+(t&&t.font||n.defaultFormatting.font)};u.applyRunStyle=function(t,e){t.fillStyle=e&&e.color||n.defaultFormatting.color,t.font=r(e)},u.prepareContext=function(t){t.textAlign="left",t.textBaseline="alphabetic"},u.getRunStyle=function(t){var e=["font: ",r(t),"; color: ",t&&t.color||n.defaultFormatting.color];if(t)switch(t.script){case"super":e.push("; vertical-align: super");break;case"sub":e.push("; vertical-align: sub")}return e.join("")};var a=u.nbsp=String.fromCharCode(160),o=(u.enter=a,u.measureText=function(t,e){var n,r,i;n=document.createElement("span"),r=document.createElement("div"),i=document.createElement("div"),r.style.display="inline-block",r.style.width="1px",r.style.height="0",i.style.visibility="hidden",i.style.position="absolute",i.style.top="0",i.style.left="0",i.style.width="500px",i.style.height="200px",i.appendChild(n),i.appendChild(r),document.body.appendChild(i);try{n.setAttribute("style",e),n.innerHTML="",n.appendChild(document.createTextNode(t.replace(/\s/g,a)));var o={};r.style.verticalAlign="baseline",o.ascent=r.offsetTop-n.offsetTop,r.style.verticalAlign="bottom",o.height=r.offsetTop-n.offsetTop,o.descent=o.height-o.ascent,o.width=n.offsetWidth}finally{i.parentNode.removeChild(i),i=null}return o}),i=u.createCachedMeasureText=function(){var i={};return function(t,e){var n=e+"<>!&%"+t,r=i[n];return r||(i[n]=r=o(t,e)),r}};u.cachedMeasureText=i(),u.measure=function(t,e){return u.cachedMeasureText(t,u.getRunStyle(e))},u.draw=function(t,e,n,r,i,o,a,s){switch(u.prepareContext(t),u.applyRunStyle(t,n),n.script){case"super":i-=a*(1/3);break;case"sub":i+=s/2}t.fillText("\n"===e?u.enter:e,r,i),n.underline&&t.fillRect(r,1+i,o,1),n.strikeout&&t.fillRect(r,1+i-a/2,o,1)}},"util.js":function(t,e,n){t.event=function(){var n=[],t=function(t){n.push(t)};return t.fire=function(){var e=Array.prototype.slice.call(arguments,0);n.forEach(function(t){t.apply(null,e)})},t},t.derive=function(t,e){var n={};return Object.keys(e).forEach(function(t){n[t]={value:e[t]}}),Object.create(t,n)}},"word.js":function(t,e,n){var i=n("per"),r=n("./part"),o=n("./runs"),a={isNewLine:function(){return 1==this.text.parts.length&&this.text.parts[0].isNewLine},code:function(){return 1==this.text.parts.length&&this.text.parts[0].code},codeFormatting:function(){return 1==this.text.parts.length&&this.text.parts[0].run},draw:function(e,n,r){i(this.text.parts).concat(this.space.parts).forEach(function(t){t.draw(e,n,r),n+=t.width})},plainText:function(){return this.text.plainText+this.space.plainText},align:function(){var t=this.text.parts[0];return t?t.run.align:"left"},runs:function(o,t){var a=t&&t.start||0,s=t&&t.end;"number"!=typeof s&&(s=Number.MAX_VALUE),[this.text,this.space].forEach(function(t){t.parts.some(function(t){if(s<=a||s<=0)return!0;var e=t.run,n=e.text;if("string"==typeof n){if(a<=0&&s>=n.length)o(e);else if(a<n.length){var r=Object.create(e),i=Math.max(0,a);r.text=n.substr(i,Math.min(n.length,s-i)),o(r)}a-=n.length,s-=n.length}else a<=0&&1<=s&&o(e),a--,s--})})}},s=function(t,e){var n={parts:i(t).map(function(t){return r(t,e)}).all(),ascent:0,descent:0,width:0,length:0,plainText:""};return n.parts.forEach(function(t){n.ascent=Math.max(n.ascent,t.ascent),n.descent=Math.max(n.descent,t.descent),n.width+=t.width,n.length+=o.getPieceLength(t.run.text),n.plainText+=o.getPiecePlainText(t.run.text)}),n};e.exports=function(t,e){var n,r;r=t?(n=t.text.cut(t.spaces),t.spaces.cut(t.end)):(n=[{text:"\n"}],[]),n=s(n,e),r=s(r,e);var i=Object.create(a,{text:{value:n},space:{value:r},ascent:{value:Math.max(n.ascent,r.ascent)},descent:{value:Math.max(n.descent,r.descent)},width:{value:n.width+r.width,configurable:!0},length:{value:n.length+r.length}});return t||Object.defineProperty(i,"eof",{value:!0}),i}},"wrap.js":function(t,e,n){var y=n("./line");e.exports=function(i,o,a,s,u,c,t,e){var l,f=[],h=0,n=t||0,r=e||0,d=0,p=o,v=function(t,e){f.push(t),h+=t.width,n=Math.max(n,t.ascent),r=Math.max(r,t.descent),t.isNewLine()&&(g(e),d=t.ascent+t.descent)},g=function(t){if(!l&&0!==f.length){var e=y(u,i,a,p+n,n,r,f,s);s+=e.length,l=t(e),p+=n+r,f.length=0,h=n=r=0}},m=null;return function(t,e){if(m){d=0;var n=m(e);n&&(m=null,s+=n.length,p+=n.bounds().h,Object.defineProperty(n,"block",{value:!0}),t(n))}else{var r=e.code();r&&r.block?(f.length?g(t):p+=d,m=r.block(i,p,a,s,u,e.codeFormatting()),d=0):r&&r.eof||e.eof?((!r||c&&c(r))&&v(e,t),f.length?(g(t),t(p-o)):t(p+d-o),l=!0):(d=0,f.length&&h+e.text.width>a&&g(t),v(e,t))}return l}}}}},per:{":mainpath:":"per.js","per.js":function(v,g,t){!function(t){function i(n,r){return"function"!=typeof n?Array.isArray(n)?function(t){return n.some(t)}:function(t){return t(n)}:r?function(t,e){n.call(r,t,e)}:n}function o(t,e){this.forEach=i(t,e)}function n(t,e){t(e)}function a(t,e){return 0===arguments.length?new o(n):t&&t instanceof o?t:new o(t,e)}function e(t){return"string"==typeof t?new Function("x","return "+t):t}function s(e,n){var t=e[n];return"function"==typeof t?t:function(t){e[n]=t}}function r(){}function u(t){return!!t}function c(t,e){return Math.min(t,e)}function l(t,e){return Math.max(t,e)}function f(t,e){return t+e}function h(t,e){return!(!t||!e)}function d(t,e){return!(!t&&!e)}function p(t){return!t}o.prototype.per=function(t,e){var n=this.forEach,r=i(t&&t.forEach||t,e);return a(function(e,t){return n(function(t){return r(e,t)},t)})},o.prototype.map=function(n){return n=e(n),this.per(function(t,e){return t(n(e))})},o.prototype.filter=function(n){return n=e(n),this.per(function(t,e){if(n(e))return t(e)})},o.prototype.concat=function(n,t){n=n instanceof o?n.forEach:i(n,t);var r=this.forEach;return a(function(t,e){r(t,e),n(t,e)})},o.prototype.skip=function(n){return this.per(function(t,e){return 0<n?(n--,!1):t(e)})},o.prototype.take=function(n){return this.per(function(t,e){return n<=0||(n--,t(e))})},o.prototype.listen=function(n){return this.per(function(t,e){return!!n(e)||t(e)})},o.prototype.flatten=function(){return this.per(function(e,t){return Array.isArray(t)?t.some(function(t){return e(t)}):e(t)})},o.prototype.reduce=function(n,t){var r=t,i=2==arguments.length;return this.per(function(t,e){t(r=i?n(r,e):e),i=!0})},o.prototype.multicast=function(t){return 1!==arguments.length&&(t=Array.prototype.slice.call(arguments,0)),t=t.map(function(t){return"function"==typeof t?t:t instanceof o?t.forEach:r}),this.listen(function(e){var n=!0;return t.forEach(function(t){t(r,e)||(n=!1)}),n})},o.prototype.into=function(e,n){if(!Array.isArray(e))throw new Error("into expects an array");var t;return n="number"!=typeof(t=n)?Number.MAX_VALUE:t,this.listen(function(t){if(n<=0)return!0;e.push(t),n--})},o.prototype.monitor=function(t){var e=0,n=s(t,"count"),r=s(t,"first"),i=s(t,"last"),o=t.limit;return"number"!=typeof o&&(o=Number.MAX_VALUE),o<1?this:this.listen(function(t){if(0===e&&r(t),n(++e),i(t),o<=e)return!0})},o.prototype.submit=function(t){return this.forEach(r,t)},o.prototype.all=function(){var t=[];return this.into(t).submit(),t},o.prototype.first=function(){var t={limit:1};return this.monitor(t).submit(),0<t.count?t.first:void 0},o.prototype.last=function(){var t={};return this.monitor(t).submit(),0<t.count?t.last:void 0},o.prototype.truthy=function(){return this.filter(u)},o.prototype.min=function(){return this.reduce(c,Number.MAX_VALUE)},o.prototype.max=function(){return this.reduce(l,Number.MIN_VALUE)},o.prototype.sum=function(){return this.reduce(f,0)},o.prototype.and=function(){return this.reduce(h,!0)},o.prototype.or=function(){return this.reduce(d,!1)},o.prototype.not=function(){return this.map(p)},a.pulse=function(n){var r=0;return a(function(e){!function t(){!0!==e(r++)&&setTimeout(t,n)}()})},function(t){void 0===v?this.per=t:g.exports=t}(a)}()}}})("carota/src/carota");