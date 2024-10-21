import { useEffect, useRef } from "react";
import { IBusLayout, IColumn, IDeck, ISeat } from "../interfaces";
import "./style.css";

interface ISeatMapProps {
  layout: IBusLayout;
}

//Seat drawing function on canvas
const drawSeat = (
  ctx: CanvasRenderingContext2D,
  seat: ISeat,
  x: number,
  y: number
) => {
  const seatWidth = seat.type === "sleeper" ? 60 : 40;
  const seatHeight = 30;
  ctx.beginPath();
  if (seat.type === "sleeper") {
    ctx.rect(x, y, seatWidth, seatHeight);
    ctx.rect(x + seatWidth - 10, y + seatHeight / 3 - 5, 10, 20);
  } else {
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";
    ctx.lineWidth = 1;

    // 1. First Path (Outline Path)
    ctx.beginPath();
    ctx.moveTo(x + 25.4722, y + 4.36863);
    ctx.bezierCurveTo(
      x + 25.25,
      y + 3.32106,
      x + 24.3333,
      y + 2.5,
      x + 23.1944,
      y + 2.5
    );
    ctx.lineTo(x + 11.3611, y + 2.5);
    ctx.bezierCurveTo(
      x + 10.25,
      y + 2.5,
      x + 9.30556,
      y + 3.29275,
      x + 9.08333,
      y + 4.34032
    );
    ctx.lineTo(x + 4.36111, y + 4.34032);
    ctx.bezierCurveTo(
      x + 3.33333,
      y + 4.36863,
      x + 2.5,
      y + 5.18969,
      x + 2.5,
      y + 6.23726
    );
    ctx.lineTo(x + 2.5, y + 23.7061);
    ctx.bezierCurveTo(
      x + 2.5,
      y + 24.7537,
      x + 3.33333,
      y + 25.5747,
      x + 4.36111,
      y + 25.5747
    );
    ctx.lineTo(x + 9.05556, y + 25.5747);
    ctx.bezierCurveTo(
      x + 9.25,
      y + 26.6789,
      x + 10.1944,
      y + 27.5,
      x + 11.3333,
      y + 27.5
    );
    ctx.lineTo(x + 23.1944, y + 27.5);
    ctx.bezierCurveTo(
      x + 24.25,
      y + 27.5,
      x + 25.1389,
      y + 26.7922,
      x + 25.4167,
      y + 25.8579
    );
    ctx.bezierCurveTo(
      x + 26.5833,
      y + 25.7446,
      x + 27.5,
      y + 24.7537,
      x + 27.5,
      y + 23.5362
    );
    ctx.lineTo(x + 27.5, y + 6.66195);
    ctx.bezierCurveTo(
      x + 27.5,
      y + 5.50113,
      x + 26.6111,
      y + 4.51019,
      x + 25.4722,
      y + 4.36863
    );
    ctx.closePath();
    ctx.fill(); // Fill the shape with white
    ctx.stroke(); // Stroke the outline with black

    // 2. Second Path (Middle shape)
    ctx.beginPath();
    ctx.moveTo(x + 9.08333, y + 24.7537);
    ctx.lineTo(x + 4.36111, y + 24.7537);
    ctx.bezierCurveTo(
      x + 3.77778,
      y + 24.7537,
      x + 3.30556,
      y + 24.2724,
      x + 3.30556,
      y + 23.7061
    );
    ctx.lineTo(x + 3.30556, y + 6.23726);
    ctx.bezierCurveTo(
      x + 3.30556,
      y + 5.6427,
      x + 3.77778,
      y + 5.18969,
      x + 4.36111,
      y + 5.18969
    );
    ctx.lineTo(x + 9.05556, y + 5.18969);
    ctx.bezierCurveTo(
      x + 9.22222,
      y + 6.3222,
      x + 10.1944,
      y + 7.17157,
      x + 11.3333,
      y + 7.17157
    );
    ctx.lineTo(x + 22.8333, y + 7.17157);
    ctx.lineTo(x + 22.8333, y + 22.8851);
    ctx.lineTo(x + 11.3611, y + 22.8851);
    ctx.bezierCurveTo(
      x + 10.2222,
      y + 22.8567,
      x + 9.27778,
      y + 23.6778,
      x + 9.08333,
      y + 24.7537
    );
    ctx.closePath();
    ctx.fill(); // Fill with white
    ctx.stroke(); // Stroke with black

    // 3. Third Path (Right rectangle)
    ctx.beginPath();
    ctx.moveTo(x + 26.6944, y + 23.5362);
    ctx.bezierCurveTo(
      x + 26.6944,
      y + 24.3573,
      x + 26.0278,
      y + 25.0368,
      x + 25.1944,
      y + 25.0368
    );
    ctx.bezierCurveTo(
      x + 24.3611,
      y + 25.0368,
      x + 23.6944,
      y + 24.3573,
      x + 23.6944,
      y + 23.5362
    );
    ctx.lineTo(x + 23.6944, y + 6.66195);
    ctx.bezierCurveTo(
      x + 23.6944,
      y + 5.84088,
      x + 24.3611,
      y + 5.16138,
      x + 25.1944,
      y + 5.16138
    );
    ctx.bezierCurveTo(
      x + 26.0278,
      y + 5.16138,
      x + 26.6944,
      y + 5.84088,
      x + 26.6944,
      y + 6.66195
    );
    ctx.lineTo(x + 26.6944, y + 23.5362);
    ctx.closePath();
    ctx.fill(); // Fill with white
    ctx.stroke(); // Stroke with black

    // 4. Fourth Path (Top rounded rectangle)
    ctx.beginPath();
    ctx.moveTo(x + 11.3611, y + 3.32106);
    ctx.lineTo(x + 23.2222, y + 3.32106);
    ctx.bezierCurveTo(
      x + 23.9167,
      y + 3.32106,
      x + 24.4722,
      y + 3.77407,
      x + 24.6667,
      y + 4.39694
    );
    ctx.bezierCurveTo(
      x + 23.75,
      y + 4.62344,
      x + 23.0556,
      y + 5.38788,
      x + 22.9167,
      y + 6.3222
    );
    ctx.lineTo(x + 11.3611, y + 6.3222);
    ctx.bezierCurveTo(
      x + 10.5278,
      y + 6.3222,
      x + 9.86111,
      y + 5.6427,
      x + 9.86111,
      y + 4.82163
    );
    ctx.bezierCurveTo(
      x + 9.86111,
      y + 4.00057,
      x + 10.5278,
      y + 3.32106,
      x + 11.3611,
      y + 3.32106
    );
    ctx.closePath();
    ctx.fill(); // Fill with white
    ctx.stroke(); // Stroke with black

    // 5. Fifth Path (Bottom rounded rectangle)
    ctx.beginPath();
    ctx.moveTo(x + 23.1944, y + 26.7072);
    ctx.lineTo(x + 11.3611, y + 26.7072);
    ctx.bezierCurveTo(
      x + 10.5278,
      y + 26.7072,
      x + 9.86111,
      y + 26.0277,
      x + 9.86111,
      y + 25.2067
    );
    ctx.bezierCurveTo(
      x + 9.86111,
      y + 24.3856,
      x + 10.5278,
      y + 23.7061,
      x + 11.3611,
      y + 23.7061
    );
    ctx.lineTo(x + 22.8889, y + 23.7061);
    ctx.bezierCurveTo(
      x + 22.9444,
      y + 24.7254,
      x + 23.6667,
      y + 25.5464,
      x + 24.6111,
      y + 25.8012
    );
    ctx.bezierCurveTo(
      x + 24.3611,
      y + 26.3109,
      x + 23.8333,
      y + 26.7072,
      x + 23.1944,
      y + 26.7072
    );
  }

  // ctx.rect(x, y, seatWidth, seatHeight);

  // Set color based on seat activation status
  ctx.fillStyle = seat.isActive ? "#ffffff" : "#ff0000";
  ctx.fill();
  ctx.strokeStyle = "#000"; // Black border
  ctx.stroke();

  // Draw seat name inside the seat
  ctx.fillStyle = "#000"; // Text color
  ctx.font = "12px Arial";
  ctx.fillText(seat.seat_name, x + 5, y + 18);
};

// Column drawing
const drawColumn = (
  ctx: CanvasRenderingContext2D,
  column: IColumn,
  totalRows: number,
  columnIndex: number
) => {
  const columnGap = 40;
  const rowHeight = 30;
  const baseY = columnIndex * 40;

  const seatsInColumn = new Array(totalRows).fill(null);
  column.alignment.forEach((seat) => {
    seatsInColumn[seat.row - 1] = seat;
  });

  seatsInColumn.forEach((seat, rowIndex) => {
    const baseX = rowIndex * (rowHeight + columnGap);
    if (seat) {
      drawSeat(ctx, seat, baseX, baseY);
    }
  });
};

const drawDeck = (
  ctx: CanvasRenderingContext2D,
  deck: IDeck,
  canvasWidth: number
) => {
  const columns = Object.keys(deck.columns);
  // const columnHeight =
  (canvasWidth - 10 * (columns.length - 1)) / columns.length;

  columns.forEach((colKey, colIndex) => {
    const column = deck.columns[colKey];
    if (column) {
      drawColumn(ctx, column, deck.total_rows, colIndex);
    }
  });
};

const SeatMap = ({ layout }: ISeatMapProps) => {
  const lowerDeckRef = useRef<HTMLCanvasElement>(null);
  const upperDeckRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const lowerCanvas = lowerDeckRef.current;
    if (lowerCanvas) {
      const ctx = lowerCanvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, lowerCanvas.width, lowerCanvas.height);
        drawDeck(ctx, layout.lower_deck, lowerCanvas.width);
      }
    }

    const upperCanvas = upperDeckRef.current;
    if (upperCanvas && layout.upper_deck) {
      const ctx = upperCanvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, upperCanvas.width, upperCanvas.height);
        drawDeck(ctx, layout.upper_deck, upperCanvas.width);
      }
    }
  }, [layout]);

  return (
    <div>
      <h3>Lower Deck</h3>
      <canvas
        ref={lowerDeckRef}
        width={800}
        height={250}
        style={{ background: "#efefef", padding: "20px" }}
      />

      {layout.upper_deck && (
        <>
          <h3>Upper Deck</h3>
          <canvas
            ref={upperDeckRef}
            width={800}
            height={250}
            style={{ background: "#efefef", padding: "20px" }}
          />
        </>
      )}
    </div>
  );
};

export default SeatMap;
