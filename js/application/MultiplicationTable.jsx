import React from 'react';

import Toggle from 'material-ui/Toggle';

import { HexNum, digits } from './HexNum';

const MultiplicationTable = ({ onDigitSelected, half = false }) => (
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
          {digits.map(b => half && a < b
            ? <td key={b} className="empty" />
            : (<td key={b}><HexNum value={a * b} width={2} /></td>)
          )}
        </tr>
      )}
    </tbody>
  </table>
);

export default ({ half, setHalf, onDigitSelected }) => (
  <div>
    <MultiplicationTable half={half} onDigitSelected={onDigitSelected} />
    <Toggle value={half} label="Show half only" value={half} onToggle={setHalf} />
  </div>
);
