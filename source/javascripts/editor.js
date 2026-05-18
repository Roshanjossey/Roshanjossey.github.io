(function () {
  'use strict';

  function initEditor(root) {
    var cursor = root.querySelector('[data-cursor]');
    var status = root.querySelector('[data-status]');
    var body = root.querySelector('.editor__body');
    var linesContainer = root.querySelector('[data-lines]');
    var lines = [];
    var lineIndex = 0;
    var colIndex = 0;
    var charWidth = 0;
    var lineHeight = 0;

    function refreshLines() {
      var code = Array.prototype.slice.call(
        linesContainer.querySelectorAll('.editor-line:not([data-pad])')
      );
      var pad = Array.prototype.slice.call(
        linesContainer.querySelectorAll('.editor-line[data-pad]')
      );
      lines = code.concat(pad);
    }

    function removePadLines() {
      linesContainer.querySelectorAll('[data-pad]').forEach(function (el) {
        el.remove();
      });
    }

    function codeLineCount() {
      return linesContainer.querySelectorAll('.editor-line:not([data-pad])').length;
    }

    function padLines() {
      removePadLines();

      var codeLineEls = linesContainer.querySelectorAll(
        '.editor-line:not([data-pad])'
      );
      if (!codeLineEls.length) return;

      lineHeight = codeLineEls[0].offsetHeight;
      if (!lineHeight) return;

      var bodyHeight = body.clientHeight;
      var totalCodeHeight = 0;
      for (var i = 0; i < codeLineEls.length; i++) {
        totalCodeHeight += codeLineEls[i].offsetHeight;
      }

      var remaining = bodyHeight - totalCodeHeight;
      var padCount = Math.max(0, Math.floor(remaining / lineHeight));
      var startNum = codeLineEls.length;

      for (var p = 0; p < padCount; p++) {
        var num = startNum + p + 1;
        var el = document.createElement('div');
        el.className = 'editor-line editor-line--pad';
        el.setAttribute('data-pad', '');
        el.setAttribute('data-line', String(num));
        el.innerHTML =
          '<span class="editor-line__gutter" data-gutter aria-hidden="true">' +
          num +
          '</span><code class="editor-line__content"></code>';
        linesContainer.appendChild(el);
      }

      refreshLines();
    }

    function lineText(index) {
      return lines[index].querySelector('.editor-line__content').textContent || '';
    }

    function lineLength(index) {
      return lineText(index).length;
    }

    function clampCol() {
      var max = lineLength(lineIndex);
      if (colIndex < 0) colIndex = 0;
      if (colIndex > max) colIndex = max;
    }

    function measure() {
      if (!lines.length) return;
      var sample = lines[0].querySelector('.editor-line__content');
      var style = window.getComputedStyle(sample);
      lineHeight = lines[0].offsetHeight || parseFloat(style.lineHeight) || 22;

      var probe = document.createElement('span');
      probe.textContent = '0';
      probe.style.visibility = 'hidden';
      probe.style.position = 'absolute';
      probe.style.whiteSpace = 'pre';
      probe.style.font = style.font;
      sample.appendChild(probe);
      charWidth = probe.getBoundingClientRect().width || 8;
      sample.removeChild(probe);
    }

    function updateRelativeNumbers() {
      lines.forEach(function (line, index) {
        var gutter = line.querySelector('[data-gutter]');
        var distance = Math.abs(index - lineIndex);
        gutter.textContent =
          index === lineIndex ? String(index + 1) : String(distance);
        line.classList.toggle('editor-line--current', index === lineIndex);
      });
    }

    function syncGutterWidth() {
      var maxWidth = 0;
      lines.forEach(function (line) {
        var gutter = line.querySelector('[data-gutter]');
        gutter.style.minWidth = '';
        maxWidth = Math.max(maxWidth, gutter.offsetWidth);
      });
      var width = Math.max(maxWidth, 56) + 'px';
      lines.forEach(function (line) {
        line.querySelector('[data-gutter]').style.minWidth = width;
      });
    }

    function updateCursor() {
      if (!lines.length) return;

      clampCol();
      updateRelativeNumbers();
      syncGutterWidth();

      var line = lines[lineIndex];
      var gutter = line.querySelector('.editor-line__gutter');
      var bodyRect = body.getBoundingClientRect();
      var lineRect = line.getBoundingClientRect();
      var gutterRect = gutter.getBoundingClientRect();

      var top = lineRect.top - bodyRect.top + body.scrollTop;
      var left =
        gutterRect.right - bodyRect.left + body.scrollLeft + colIndex * charWidth;
      var height = lineRect.height;

      cursor.style.transform = 'translate(' + left + 'px, ' + top + 'px)';
      cursor.style.width = charWidth + 'px';
      cursor.style.height = height + 'px';
      cursor.hidden = false;

      if (status) {
        status.textContent =
          'Line ' + (lineIndex + 1) + ', column ' + (colIndex + 1);
      }

      var lineTop = top;
      var lineBottom = top + height;
      var viewTop = body.scrollTop;
      var viewBottom = viewTop + body.clientHeight;
      if (lineBottom > viewBottom) {
        body.scrollTop = lineBottom - body.clientHeight + 8;
      } else if (lineTop < viewTop) {
        body.scrollTop = Math.max(0, lineTop - 8);
      }
    }

    function move(deltaLine, deltaCol) {
      lineIndex = Math.max(0, Math.min(lines.length - 1, lineIndex + deltaLine));
      colIndex += deltaCol;
      clampCol();
      updateCursor();
    }

    function layout() {
      refreshLines();
      if (!codeLineCount()) return;
      padLines();
      measure();
      if (lineIndex >= lines.length) {
        lineIndex = lines.length - 1;
      }
      updateCursor();
    }

    root.addEventListener('keydown', function (event) {
      if (!root.contains(document.activeElement) && document.activeElement !== root) {
        return;
      }

      var key = event.key;
      var handled = false;

      if (key === 'h' || key === 'H' || key === 'ArrowLeft') {
        move(0, -1);
        handled = true;
      } else if (key === 'l' || key === 'L' || key === 'ArrowRight') {
        move(0, 1);
        handled = true;
      } else if (key === 'j' || key === 'J' || key === 'ArrowDown') {
        var nextCol = colIndex;
        move(1, 0);
        colIndex = Math.min(nextCol, lineLength(lineIndex));
        handled = true;
      } else if (key === 'k' || key === 'K' || key === 'ArrowUp') {
        var prevCol = colIndex;
        move(-1, 0);
        colIndex = Math.min(prevCol, lineLength(lineIndex));
        handled = true;
      } else if (key === '0') {
        colIndex = 0;
        updateCursor();
        handled = true;
      } else if (key === '$') {
        colIndex = lineLength(lineIndex);
        updateCursor();
        handled = true;
      }

      if (handled) {
        event.preventDefault();
      }
    });

    root.addEventListener('click', function () {
      root.focus();
    });

    window.addEventListener('resize', layout);

    layout();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var editors = document.querySelectorAll('[data-editor]');
    editors.forEach(initEditor);
  });
})();
