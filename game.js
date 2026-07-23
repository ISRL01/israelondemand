/* =========================================================================
   Tic-tac-toe — two-player and an unbeatable computer (minimax).
   Exposes window.mountTicTacToe(element). No dependencies.
   ========================================================================= */

(function () {
  var LINES = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],   // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],   // columns
    [0, 4, 8], [2, 4, 6]               // diagonals
  ];

  /* Returns null while the game is live, else { player, line }.
     A draw comes back as { player: null, line: null }. */
  function result(b) {
    for (var i = 0; i < LINES.length; i++) {
      var a = LINES[i][0], c = LINES[i][1], d = LINES[i][2];
      if (b[a] && b[a] === b[c] && b[a] === b[d]) return { player: b[a], line: LINES[i] };
    }
    for (var j = 0; j < 9; j++) if (!b[j]) return null;
    return { player: null, line: null };
  }

  /* Minimax: the computer ("O") maximises. Depth is included so it prefers
     winning sooner and losing later, which makes it feel less robotic. */
  function minimax(b, isMax, depth) {
    var res = result(b);
    if (res) {
      if (res.player === "O") return 10 - depth;
      if (res.player === "X") return depth - 10;
      return 0;
    }
    var best = isMax ? -Infinity : Infinity;
    for (var i = 0; i < 9; i++) {
      if (b[i]) continue;
      b[i] = isMax ? "O" : "X";
      var score = minimax(b, !isMax, depth + 1);
      b[i] = null;
      best = isMax ? Math.max(best, score) : Math.min(best, score);
    }
    return best;
  }

  function bestMove(b) {
    var best = -Infinity, move = -1;
    for (var i = 0; i < 9; i++) {
      if (b[i]) continue;
      b[i] = "O";
      var score = minimax(b, false, 0);
      b[i] = null;
      if (score > best) { best = score; move = i; }
    }
    return move;
  }

  window.mountTicTacToe = function (root) {
    if (!root) return;

    var state = {
      board: new Array(9).fill(null),
      turn: "X",
      mode: "cpu",          // "cpu" | "2p"
      over: false,
      winner: null,
      winLine: null,
      thinking: false,
      score: { X: 0, O: 0, D: 0 }
    };

    function reset(clearScore) {
      state.board = new Array(9).fill(null);
      state.turn = "X";
      state.over = false;
      state.winner = null;
      state.winLine = null;
      state.thinking = false;
      if (clearScore) state.score = { X: 0, O: 0, D: 0 };
      render();
    }

    function statusText() {
      if (state.over) {
        if (state.winner === "draw") return "Draw";
        if (state.mode === "cpu") return state.winner === "X" ? "You win" : "Computer wins";
        return state.winner + " wins";
      }
      if (state.mode === "cpu") return state.turn === "X" ? "Your turn" : "Computer thinking\u2026";
      return state.turn + " to play";
    }

    function finish(res) {
      state.over = true;
      state.winner = res.player || "draw";
      state.winLine = res.line;
      if (res.player) state.score[res.player]++; else state.score.D++;
      render();
    }

    function play(i) {
      state.board[i] = state.turn;
      var res = result(state.board);
      if (res) { finish(res); return; }

      state.turn = state.turn === "X" ? "O" : "X";
      render();

      if (state.mode === "cpu" && state.turn === "O") {
        state.thinking = true;
        render();
        setTimeout(function () {
          state.thinking = false;
          var m = bestMove(state.board);
          if (m >= 0) play(m);
        }, 320);           // a beat, so it doesn't feel instant
      }
    }

    function render() {
      var cells = state.board.map(function (v, i) {
        var win = state.winLine && state.winLine.indexOf(i) !== -1 ? " is-win" : "";
        var disabled = (v || state.over || state.thinking) ? " disabled" : "";
        var mark = v ? '<span class="ttt-mark ttt-' + v.toLowerCase() + '">' + v + "</span>" : "";
        return '<button class="ttt-cell' + win + '" data-i="' + i + '"' + disabled +
               ' aria-label="Square ' + (i + 1) + (v ? ", " + v : ", empty") + '">' + mark + "</button>";
      }).join("");

      root.innerHTML =
        '<div class="ttt">' +
          '<div class="ttt-bar">' +
            '<div class="ttt-modes" role="group" aria-label="Game mode">' +
              '<button class="ttt-mode' + (state.mode === "cpu" ? " is-on" : "") + '" data-mode="cpu">vs Computer</button>' +
              '<button class="ttt-mode' + (state.mode === "2p" ? " is-on" : "") + '" data-mode="2p">2 Player</button>' +
            "</div>" +
            '<button class="ttt-reset" data-reset>New game</button>' +
          "</div>" +
          '<p class="ttt-status" aria-live="polite">' + statusText() + "</p>" +
          '<div class="ttt-board">' + cells + "</div>" +
          '<div class="ttt-score">' +
            "<span><b>" + state.score.X + "</b> " + (state.mode === "cpu" ? "You" : "X") + "</span>" +
            "<span><b>" + state.score.D + "</b> Draw</span>" +
            "<span><b>" + state.score.O + "</b> " + (state.mode === "cpu" ? "Computer" : "O") + "</span>" +
          "</div>" +
        "</div>";
    }

    /* One delegated listener — survives every re-render. */
    root.addEventListener("click", function (e) {
      var modeBtn = e.target.closest("[data-mode]");
      if (modeBtn) {
        if (modeBtn.dataset.mode !== state.mode) { state.mode = modeBtn.dataset.mode; reset(true); }
        return;
      }
      if (e.target.closest("[data-reset]")) { reset(false); return; }

      var cell = e.target.closest(".ttt-cell");
      if (!cell || state.over || state.thinking) return;
      var i = Number(cell.dataset.i);
      if (state.board[i]) return;
      play(i);
    });

    render();
  };
})();
