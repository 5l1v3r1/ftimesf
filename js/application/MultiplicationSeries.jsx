import React from 'react';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import { HexNum, digits } from './HexNum';

const MultiplicationSeries = ({ digit, onDigitSelected }) => (
  <div className="container">
    <h1>Multiples of 
      <DropDownMenu
        value={digit}
        className="dropdown"
        onChange={(e, _, value) => { e.stopPropagation; onDigitSelected(value) }}
      >
      {digits.map(a =>
        <MenuItem key={a} value={a} primaryText={<HexNum value={a} />} />
      )}
      </DropDownMenu>
    </h1>
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
            <td key={b} className="fullgrid">
              <HexNum value={digit * b} width={2} />
            </td>
          )}
        </tr>
      </tbody>
    </table>
  </div>
);

MultiplicationSeries.propTypes = {
  digit: React.PropTypes.number.isRequired,
  onDigitSelected: React.PropTypes.func.isRequired,
};

export default MultiplicationSeries;
