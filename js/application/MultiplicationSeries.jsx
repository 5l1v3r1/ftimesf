import React from 'react';

import { HexNum, digits } from './HexNum';

const MultiplicationSeries = ({ digit, onDigitSelected }) => (
  <table>
    <tbody>
      <tr className="row">
        <th>×</th>
        {digits.map(a =>
          <th key={a} className="header">
            <HexNum value={a} onClick={onDigitSelected} />
          </th>
        )}
      </tr>
      <tr className="row">
        <th className="header">
          <HexNum value={digit} />
        </th>
        {digits.map(b =>
          <td key={b}>
            <HexNum value={digit * b} width={2} />
          </td>
        )}
      </tr>
    </tbody>
  </table>
);

export default MultiplicationSeries;
