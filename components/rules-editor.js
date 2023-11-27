import './carota-min';

export const rulesEditor = () => {
    var elem = document.querySelector('#exampleEditor');
        var exampleEditor = carota.editor.create(elem);

        // Set up our custom inline - a smiley emoji
        var smiley = document.querySelector('.circle-icon');

        exampleEditor.customCodes = function(obj) {
            if (obj.smiley) {
                // Must return an object that encapsulates the inline
                return {
                    // measure: must return width, ascent and descent
                    measure: function(/*formatting*/) {
                        return {
                            width: 24,
                            ascent: 24,
                            descent: 0
                        };
                    },
                    // draw: implements the appearance of the inline on canvas
                    draw: function(ctx, x, y, width, ascent, descent, formatting) {
                        ctx.drawImage(smiley, x, y - ascent, width, ascent);
                    }
                }
            }
        };

        // Setting up the button so user can insert a smiley
        carota.dom.handleEvent(document.querySelector('#smiley'), 'click', function() {
            exampleEditor.insert({ smiley: true });
        });

        // Wire up undo/redo commands
        var undo = document.querySelector('#undo'),
            redo = document.querySelector('#redo');

        carota.dom.handleEvent(undo, 'click', function() {
            exampleEditor.performUndo(false);
        });

        carota.dom.handleEvent(redo, 'click', function() {
            exampleEditor.performUndo(true);
        });

        // var updateUndo = function() {
        //     undo.disabled = !exampleEditor.canUndo(false);
        //     redo.disabled = !exampleEditor.canUndo(true);
        // };

        // Wire up the toolbar controls
        ['font', 'size', 'bold', 'italic', 'underline',
         'strikeout', 'align', 'script', 'color'].forEach(function(id) {
            var elem = document.querySelector('#' + id);

            // When the control changes value, update the selected range's formatting
            carota.dom.handleEvent(elem, 'change', function() {
                var range = exampleEditor.selectedRange();
                var val = elem.nodeName === 'INPUT' ? elem.checked : elem.value;
                range.setFormatting(id, val);
            });

            // When the selected range coordinates change, update the control
            exampleEditor.selectionChanged(function(getFormatting) {
                var formatting = getFormatting();
                var val = id in formatting ? formatting[id] : carota.runs.defaultFormatting[id];
                if (elem.nodeName === 'INPUT') {
                    if (val === carota.runs.multipleValues) {
                        elem.indeterminate = true;
                    } else {
                        elem.indeterminate = false;
                        elem.checked = val;
                    }
                } else {
                    elem.value = val;
                }
            });
        });

        var valign = document.querySelector('#valign')
        carota.dom.handleEvent(valign, 'change', function() {
            exampleEditor.setVerticalAlignment(valign.value);
        });
        
        // // We don't update the JSON view until half a second after the last change
        // // to avoid slowing things down too much
        // var persistenceTextArea = document.querySelector('#examplePersistence textarea');
        // var updateTimer = null;
        // var updatePersistenceView = function() {
        //     if (updateTimer !== null) {
        //         clearTimeout(updateTimer);
        //     }
        //     updateTimer = setTimeout(function() {
        //         updateTimer = null;
        //         persistenceTextArea.value = JSON.stringify(exampleEditor.save(), null, 4);
        //     }, 500);
        // };

        // var manuallyChangingJson = 0;
        // carota.dom.handleEvent(persistenceTextArea, 'input', function() {
        //     try {
        //         manuallyChangingJson++;
        //         exampleEditor.load(JSON.parse(persistenceTextArea.value), false);
        //     } catch (x)  {
        //         // ignore if syntax errors
        //     } finally {
        //         manuallyChangingJson--;
        //     }
        // });

        // Whenever the document changes, re-display the JSON format and update undo buttons
        // exampleEditor.contentChanged(function() {
        //     updateUndo();
        //     if (!manuallyChangingJson) {
        //         updatePersistenceView();
        //     }
        // });

        // Load one of the hidden chunks of HTML
        var html = document.querySelector('welcome');
        if (html) {
            var runs = carota.html.parse(html, {
                carota: { color: 'orange', bold: true, size: 14 }
            });
            exampleEditor.load(runs);
        }
    }
