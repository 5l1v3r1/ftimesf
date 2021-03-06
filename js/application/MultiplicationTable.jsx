import React from 'react';

import { HexNum, digits } from './HexNum';

const MultiplicationTable = ({ onDigitSelected }, { halfedTable }) => (
  <div className="container">
    <h1>Multiplication Table</h1>
    <table>
      <tbody>
        <tr className="row">
          <th>×</th>
          {digits.map(a =>
            <th key={a} className="header">
              <HexNum value={a} width={2} onClick={onDigitSelected} />
            </th>
          )}
        </tr>
        {digits.map(a =>
          <tr key={a} className="row">
            <th>
              <HexNum value={a} width={2} onClick={onDigitSelected} />
            </th>
            {digits.map(b => halfedTable && a < b
              ? <td key={b} className="empty" />
              : (<td key={b}><HexNum value={a * b} width={2} /></td>)
            )}
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

MultiplicationTable.propTypes = {
  onDigitSelected: React.PropTypes.func.isRequired,
};

MultiplicationTable.contextTypes = {
  halfedTable: React.PropTypes.bool,
};

export default MultiplicationTable;
