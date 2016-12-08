import React from 'react';

import { HexNum, digits } from './HexNum';

const MultiplicationTable = ({ onDigitSelected }) => (
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
          <th className="header">
            <HexNum value={a} width={2} onClick={onDigitSelected} />
          </th>
          {digits.map(b =>
            <td key={b}>
              <HexNum value={a * b} width={2} />
            </td>
          )}
        </tr>
      )}
    </tbody>
  </table>
);

export default MultiplicationTable;
