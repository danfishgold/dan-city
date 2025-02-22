export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default class LayoutEngine {
  rows: number;
  columns: number;
  gridContainer: HTMLElement;

  constructor(parent: HTMLElement, rows: number, columns?: number) {
    this.rows = rows;
    this.columns = (columns && columns) || rows;
    this.gridContainer = this.createGridContainer();
    parent.appendChild(this.gridContainer);
  }

  private createGridContainer() {
    const gridContainer = document.createElement("div");
    gridContainer.style.display = "grid";
    gridContainer.style.position = "fixed";
    gridContainer.style.top = "0";
    gridContainer.style.left = "0";
    gridContainer.style.gridAutoFlow = "dense";
    gridContainer.style.gridTemplateRows = `repeat(${this.rows}, 1px)`;
    gridContainer.style.gridTemplateColumns = `repeat(${this.columns}, 1px)`;
    gridContainer.style.gridAutoRows = "1px";
    gridContainer.classList.add("debug");
    return gridContainer;
  }

  addRect({ width, height }: { width: number; height: number }): null | Rect {
    const child = document.createElement("div");
    child.style.gridRow = `span ${height}`;
    child.style.gridColumn = `span ${width}`;
    this.gridContainer.appendChild(child);
    const rect = {
      x: child.offsetLeft,
      y: child.offsetTop,
      width,
      height,
    };

    if (
      rect.x + rect.width <= this.columns &&
      rect.y + rect.height <= this.rows
    ) {
      return rect;
    } else {
      child.remove();
      return null;
    }
  }

  remove() {
    this.gridContainer.remove();
  }
}
