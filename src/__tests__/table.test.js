import { describe, it, expect, beforeAll } from 'vitest';
import { extractTableData } from '../utils.js';

describe('extractTableData', () => {
  beforeAll(() => {
    // Mock HTMLCanvasElement.prototype.getContext for JSDOM env
    HTMLCanvasElement.prototype.getContext = () => ({
      fillStyle: '',
      clearRect: () => {},
      fillRect: () => {},
      getImageData: () => ({ data: [0, 0, 0, 0] }),
    });
  });

  it('extracts table rows and columns correctly', () => {
    const table = document.createElement('table');
    table.innerHTML = `
      <tr>
        <td>Cell 1</td>
        <td>Cell 2</td>
      </tr>
    `;
    document.body.appendChild(table);

    const data = extractTableData(table, 1);
    expect(data.rows.length).toBe(1);
    expect(data.rows[0].length).toBe(2);
    expect(data.rows[0][0].text[0].text).toBe('Cell 1');

    document.body.removeChild(table);
  });

  it('maps writing-mode to textDirection in table cells', () => {
    const table = document.createElement('table');
    table.innerHTML = `
      <tr>
        <td style="writing-mode: vertical-rl;">Vertical Cell</td>
        <td style="writing-mode: vertical-lr; text-orientation: upright;">Upright Cell</td>
        <td>Normal Cell</td>
      </tr>
    `;
    document.body.appendChild(table);

    const data = extractTableData(table, 1);
    expect(data.rows[0][0].options.textDirection).toBe('vert');
    expect(data.rows[0][1].options.textDirection).toBe('wordArtVert');
    expect(data.rows[0][2].options.textDirection).toBeUndefined();

    document.body.removeChild(table);
  });
});
