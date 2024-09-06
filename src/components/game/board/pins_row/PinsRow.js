import { useSelector } from "react-redux";
import Pin from "#/components/pin/Pin";
import styles from "./PinsRow.module.css";

const PinsRow = ({ number }) => {
  const { cipher, cells, activeCell, isGameOver } = useSelector(
    (state) => state.game
  );

  const getColorIds = () => {
    const cipherCopy = cipher.slice();
    const rowCopy = cells[number].slice();
    const colorIds = [0, 0, 0, 0, 0];
    for (let i = 0; i < 5; i++) {
      if (cipherCopy[i] !== rowCopy[i]) continue;
      colorIds[i] = 2;
      cipherCopy[i] = NaN;
      rowCopy[i] = NaN;
    }
    for (let i = 0; i < 5; i++) {
      const matchedIdx = cipherCopy.findIndex((c) => c === rowCopy[i]);
      if (matchedIdx < 0) continue;
      colorIds[i] = 1;
      cipherCopy[matchedIdx] = null;
    }
    return colorIds.toSorted().toReversed();
  };

  const colorIds =
    number < activeCell.row || (isGameOver && number <= activeCell.row)
      ? getColorIds()
      : [0, 0, 0, 0, 0];

  return (
    <div className={styles.pinsRow}>
      {colorIds.map((colorId, i) => (
        <Pin key={i} colorId={colorId} />
      ))}
    </div>
  );
};

export default PinsRow;
