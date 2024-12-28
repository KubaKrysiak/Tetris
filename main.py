import webview
def close():
    import os
    os._exit(0)

def rotade(T,d):
    if d not in [-1,1]:
        raise ValueError
    if len(T)!=4 or any(len(row)!=4 for row in T):
        raise ValueError
    if d==1:
        return [[T[3 - j][i] for j in range(4)] for i in range(4)]
    elif d==-1:
        return [[T[j][3 - i] for j in range(4)] for i in range(4)]
def print_rotaded(T,d):
    rotaded=rotade(T,d)
    for row in rotaded:
        print(row)


def apply_piece_to_board(board, piece, column):
    rows, cols = len(board), len(board[0])

    piece_shape = []
    for i in range(4):
        for j in range(4):
            if piece[i][j] != []:
                piece_shape.append((i, j, piece[i][j]))

    lowest_row = rows - 1
    for r in range(rows):
        for row_piece, col_piece, color in piece_shape:
            board_row = r + row_piece
            board_col = column + col_piece

            if board_row >= rows or board[board_row][board_col] != []:
                lowest_row = r - 1
                break
        else:
            continue
        break
    if lowest_row < 0:
        return "Game Over"

    new_board = [row[:] for row in board]

    for row_piece, col_piece, color in piece_shape:
        new_board[lowest_row + row_piece][column + col_piece] = color

    return new_board
