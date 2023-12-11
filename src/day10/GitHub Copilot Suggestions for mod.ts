Synthesizing 10/10 solutions (Duplicates hidden)

=======
Suggestion 1

if (cell.char === ".") {
    return null;
  } // NS

=======
Suggestion 2

if (cell.char === ".") {
    return null;
  } // vertical

=======
Suggestion 3

if (cell.char === ".") {
    return null;
  } // north south

=======
Suggestion 4

if (cell.char === ".") {
    return null;
  } // north

=======
Suggestion 5

if (cell.char === ".") {
    if (prev === "up") {
      return board.cells[cell.y - 1][cell.x];
    } else if (prev === "down") {
      return board.cells[cell.y + 1][cell.x];
    } else if (prev === "left") {
      return board.cells[cell.y][cell.x - 1];
    } else if (prev === "right") {
      return board.cells[cell.y][cell.x + 1];
    }
  } // north-south
