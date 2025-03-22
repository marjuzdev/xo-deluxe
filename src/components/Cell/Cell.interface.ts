import { PlayerMark } from '@models/game';

export interface CellProps {
    value: PlayerMark;
    rowIndex: number;
    onClick: () => void;
    isWinningCell: boolean;
    isLastMove: boolean;
}