import { AIDifficulty, GameBoard, PlayerMark } from '../../models/game';
import { WINNING_COMBINATIONS } from '../../constants/game';
import { getRandomInt } from '../helpers';

interface Move {
  row: number;
  col: number;
  score?: number;
}

// Check if a player has won
export function checkWinner(board: GameBoard, player: PlayerMark): any[] {
  for (const combination of WINNING_COMBINATIONS) {
    const [[row1, col1], [row2, col2], [row3, col3]] = combination;
    if (
      board[row1][col1] === player &&
      board[row2][col2] === player &&
      board[row3][col3] === player
    ) {
      return [
        { row: row1, col: col1 },
        { row: row2, col: col2 },
        { row: row3, col: col3 }
      ];
    }
  }
  return [];
}

// Check if the board is full
function isBoardFull(board: GameBoard): boolean {
  return board.every((row) => row.every((cell) => cell !== null));
}

// Get available moves
function getAvailableMoves(board: GameBoard): Move[] {
  const moves: Move[] = [];
  
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === null) {
        moves.push({ row, col });
      }
    }
  }
  
  return moves;
}

// Minimax algorithm
function minimax(
  board: GameBoard,
  depth: number,
  isMaximizing: boolean,
  alpha: number = -Infinity,
  beta: number = Infinity
): number {
  // AI is 'O', player is 'X'
  const aiPlayer: PlayerMark = 'O';
  const humanPlayer: PlayerMark = 'X';
  
  // Terminal conditions
  if (checkWinner(board, aiPlayer).length > 0) return 10 - depth;
  if (checkWinner(board, humanPlayer).length > 0) return depth - 10;
  if (isBoardFull(board)) return 0;
  if (depth >= 9) return 0; // Maximum depth reached
  
  if (isMaximizing) {
    let bestScore = -Infinity;
    const availableMoves = getAvailableMoves(board);
    
    for (const move of availableMoves) {
      // Make move
      board[move.row][move.col] = aiPlayer;
      
      // Recursively evaluate
      const score = minimax(board, depth + 1, false, alpha, beta);
      
      // Undo move
      board[move.row][move.col] = null;
      
      // Update best score
      bestScore = Math.max(score, bestScore);
      
      // Alpha-beta pruning
      alpha = Math.max(alpha, bestScore);
      if (beta <= alpha) break;
    }
    
    return bestScore;
  } else {
    let bestScore = Infinity;
    const availableMoves = getAvailableMoves(board);
    
    for (const move of availableMoves) {
      // Make move
      board[move.row][move.col] = humanPlayer;
      
      // Recursively evaluate
      const score = minimax(board, depth + 1, true, alpha, beta);
      
      // Undo move
      board[move.row][move.col] = null;
      
      // Update best score
      bestScore = Math.min(score, bestScore);
      
      // Alpha-beta pruning
      beta = Math.min(beta, bestScore);
      if (beta <= alpha) break;
    }
    
    return bestScore;
  }
}

// Get best move
function getBestMove(board: GameBoard, maxDepth: number = Infinity): Move {
  const aiPlayer: PlayerMark = 'O';
  const availableMoves = getAvailableMoves(board);
  let bestMove: Move = { row: -1, col: -1 };
  let bestScore = -Infinity;
  
  for (const move of availableMoves) {
    // Make move
    board[move.row][move.col] = aiPlayer;
    
    // Evaluate
    const score = minimax(board, 0, false);
    move.score = score;
    
    // Undo move
    board[move.row][move.col] = null;
    
    // Update best move
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  
  return bestMove;
}

// Get a random move
function getRandomMove(board: GameBoard): Move {
  const availableMoves = getAvailableMoves(board);
  
  if (availableMoves.length === 0) {
    return { row: -1, col: -1 };
  }
  
  const randomIndex = getRandomInt(0, availableMoves.length - 1);
  return availableMoves[randomIndex];
}

// Get AI move based on difficulty
export function getAIMove(
  board: GameBoard, 
  difficulty: AIDifficulty,
  lastMove: { row: number; col: number } | null
): Move {

  switch (difficulty) {
    case AIDifficulty.EASY:
      // 80% random move, 20% best move
      return Math.random() < 0.8 ? getRandomMove(board) : getBestMove(board, 2);
      
    case AIDifficulty.MEDIUM:
      // 50% random move from top 3 best moves, 50% best move with limited depth
      const availableMoves = getAvailableMoves(board);
      
      // Calculate scores for all moves
      for (const move of availableMoves) {
        board[move.row][move.col] = 'O';
        move.score = minimax(board, 0, false);
        board[move.row][move.col] = null;
      }
      
      // Sort by score
      availableMoves.sort((a, b) => (b.score || 0) - (a.score || 0));
      
      if (Math.random() < 0.5) {
        // Choose randomly from top 3 moves (or fewer if less available)
        const topCount = Math.min(3, availableMoves.length);
        const randomIndex = getRandomInt(0, topCount - 1);
        return availableMoves[randomIndex];
      } else {
        return getBestMove(board, 3);
      }
      
    case AIDifficulty.HARD:
      // 80% best move, 20% second best move
      const moves = getAvailableMoves(board);
      
      // Calculate scores for all moves
      for (const move of moves) {
        board[move.row][move.col] = 'O';
        move.score = minimax(board, 0, false);
        board[move.row][move.col] = null;
      }
      
      // Sort by score
      moves.sort((a, b) => (b.score || 0) - (a.score || 0));
      
      // Choose best or second best
      const index = Math.random() < 0.8 ? 0 : Math.min(1, moves.length - 1);
      return moves[index];
      
    case AIDifficulty.SUPER_HARD:
      // Always choose the best move
      return getBestMove(board);
      
    default:
      return getBestMove(board);
  }
}