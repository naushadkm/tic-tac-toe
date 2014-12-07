/*
    The MIT License (MIT)

    Copyright (c) 2014 Naushad Kinya Moidin

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
 */


/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50, browser: true */
/*global */

function TicTacToe(parentElement) {
    "use strict";

    this.numOfRows = 3;
    this.numOfCols = 3;
    this.totalAttempts = 0;
    this.parentElement = parentElement || document.getElementById('game-area');
    this.resultElement = document.createElement('div');
    this.resultElement.setAttribute("class", "result");

    this.handleGame = this.handleGame.bind(this);
    this.setGamePoints = this.setGamePoints.bind(this);
    this.nextTurn = this.nextTurn.bind(this);

    this.player1 = {
        name: "Player1",
        symbol: "O"
    };
    this.player2 = {
        name: "Player2",
        symbol: "X"
    };

    this.generate();
}

TicTacToe.prototype.generate = function () {
    "use strict";

    this.table = document.createElement('table');
    this.table.setAttribute('id', 'game-table');

    var row,
        col,
        tr,
        td;
    for (row = 0; row < this.numOfRows; row++) {
        tr = document.createElement('tr');
        this.table.appendChild(tr);
        for (col = 0; col < this.numOfCols; col++) {
            td = document.createElement('td');
            td.id = row + "-" + col;
            td.addEventListener("click", this.handleGame, false);
            tr.appendChild(td);
        }
    }

    this.parentElement.innerHTML = "";
    this.resultElement.innerHTML = "";

    this.parentElement.appendChild(this.table);
    this.parentElement.appendChild(this.resultElement);

    this.gamePoints = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    this.currentPlayer = this.player1;
    this.totalAttempts = 0;
};

TicTacToe.prototype.nextTurn = function (event) {
    "use strict";

    if (this.currentPlayer.name === "Player1") {
        this.currentPlayer = this.player2;
    } else {
        this.currentPlayer = this.player1;
    }
};

TicTacToe.prototype.printMessage = function (msg) {
    "use strict";

    this.resultElement.innerHTML = msg;
    this.resultElement.style.display = "block";

    window.setTimeout(function () {
        this.resultElement.innerHTML = "";
        this.resultElement.style.display = "none";
    }.bind(this), 1500);
};

TicTacToe.prototype.handleGame = function (event) {
    "use strict";

    if (event.target.innerHTML === this.player1.symbol || event.target.innerHTML === this.player2.symbol) {
        this.printMessage("Already in use!, Please select empty box.");
        return;
    }

    this.totalAttempts += 1;

    if (this.currentPlayer.name === "Player1") {
        event.target.innerHTML = this.currentPlayer.symbol;
        this.setGamePoints(event, this.currentPlayer.symbol);
    } else {
        event.target.innerHTML = this.currentPlayer.symbol;
        this.setGamePoints(event, this.currentPlayer.symbol);
    }

    var result = false;

    if (this.checkGameByRow() || this.checkGameByColumn() || this.checkGameByDiagonal()) {
        this.printMessage("Hurray " + this.currentPlayer.name + " (" + this.currentPlayer.symbol + ") wins!");
        this.reGenerate();
    } else if (this.totalAttempts === 9) {
        this.printMessage("Game over, nobody won!");
        this.reGenerate();
    } else {
        this.nextTurn();
    }
};

TicTacToe.prototype.checkGameByDiagonal = function () {
    "use strict";

    //check diagonal 1
    var match = false;
    if (this.gamePoints[0][0] === this.gamePoints[1][1] && this.gamePoints[1][1] === this.gamePoints[2][2]) {
        match = true;
    }
    //check diagonal 2
    if (this.gamePoints[0][2] === this.gamePoints[1][1] && this.gamePoints[1][1] === this.gamePoints[2][0]) {
        match = true;
    }

    return match;
};

TicTacToe.prototype.checkGameByRow = function () {
    "use strict";

    var row = 0,
        col = 0,
        match = true;

    for (row = 0; row < this.numOfRows; row++) {
        match = true;
        for (col = 0; col < this.numOfCols; col++) {
            if (this.gamePoints[row][col + 1]) {
                if (match && this.gamePoints[row][col + 1] === this.gamePoints[row][col]) {
                    match = true;
                } else {
                    match = false;
                    break;
                }
            }
        }

        if (match) {
            break;
        }
    }

    return match;
};

TicTacToe.prototype.checkGameByColumn = function () {
    "use strict";

    var row = 0,
        col = 0,
        match = true;

    for (col = 0; col < this.numOfCols; col++) {
        match = true;
        for (row = 0; row < this.numOfRows; row++) {
            if (this.gamePoints[row + 1]) {
                if (match && this.gamePoints[row + 1][col] === this.gamePoints[row][col]) {
                    match = true;
                } else {
                    match = false;
                    break;
                }
            }
        }

        if (match) {
            break;
        }
    }
    return match;
};

TicTacToe.prototype.setGamePoints = function (event, val) {
    "use strict";

    var coords = event.target.id.split("-");
    this.gamePoints[coords[0]][coords[1]] = val;
};

TicTacToe.prototype.reGenerate = function () {
    "use strict";
    window.setTimeout(function () {
        this.generate();
    }.bind(this), 1500);
};