const getColumn = (colNumber, lines) =>
{
    const col = [];
    for (let i = 0; i < lines.length; ++i)
    {
        const line = lines[i];
        col.push(line[colNumber]);
    }
    return col;
};

const getAllowed = (column, picks) =>
{
    const choosable = [];
    for (let i = 0; i < picks.length; ++i)
    {
        const pick = picks[i];
        if (!column.includes(pick))
        {
            choosable.push(pick);
        }
    }
    return choosable;
};

function getSquare(colNumber, lineNumber, lines)
{
    const detected = [];
    if (!lineNumber)
    {
        return detected;
    }

    let startCol = Math.floor(colNumber / 3) * 3;
    let endCol = startCol + 3;

    let startLine = Math.floor(lineNumber / 3) * 3;
    let endLine = Math.min(startLine + 3, lines.length);

    for (let i = startCol; i < endCol; ++i)
    {
        for (let j = startLine; j < endLine; ++j)
        {
            const item = lines[j][i];
            if (item !== undefined)
            {
                detected.push(item);
            }
        }
    }

    return detected;
}

const generateRandomLine = (lines) =>
{
    const line = [];
    let selectables = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < 9; ++i)
    {
        const column = getColumn(i, lines);

        let allowed;

        // Remove column items
        allowed = getAllowed(column, [1, 2, 3, 4, 5, 6, 7, 8, 9]);

        // Remove line items
        allowed = getAllowed(line, allowed);

        // remove square items
        const square = getSquare(i, lines.length, lines);
        allowed = getAllowed(square, allowed);

        const random = allowed.length > 1 ? Math.floor(Math.random() * allowed.length) : 0;

        const chosen = allowed[random];
        if (chosen === undefined)
        {
            return false;
        }
        line.push(chosen);

        selectables.splice(selectables.indexOf(chosen), 1);
    }

    return line;
};

const generateGrid = () =>
{
    let iterations;
    do
    {
        const grid = [];
        iterations = 0;
        do
        {
            ++iterations;
            if (iterations > 500)
            {
                iterations = -1;
                // Invalid
                break;
            }

            const line = generateRandomLine(grid);
            if (!line)
            {
                continue;
            }
            grid.push(line);


        } while (grid.length < 9);

        if (iterations !== -1)
        {
            return grid;
        }

    } while (true);

};


const displayGrid = () =>
{
    const grid = generateGrid();

    for (let i = 0; i < grid.length; ++i)
    {
        const line = grid[i];
        console.log(JSON.stringify(line));
    }
};

// displayGrid(); 
//let x = generateGrid(); 
//console.log(x); 

export function toString() {
    let board = generateGrid(); 
    let result = ['', '', '', '', '', '', '', '', '',];
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            result[row] = "" + result[row] + board[row][col]; 
        }
    } 
    return result; 
}

// console.log(toString()); 
