import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import { ToolbarGroup } from 'material-ui/Toolbar';

const digits = Array.from(Array(16), (_, n) => n+1);

const HexNum = ({ value, width, onClick }) => {
  const string = value.toString(16).toUpperCase();
  const Element = onClick ? 'a' : 'span';
  const click = onClick && (() => onClick( value ));

  return (
    <Element
      className="hexnum"
      onClick={click}
    >
      {width && width - string.length
        ? <span className="pad">{new Array(width - string.length + 1).join('0')}</span>
        : null
      }
      {string}
    </Element>
  );
};

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

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'table',
      series: 2,
    };
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(lightTheme)
    };
  }

  setActiveTab(activeTab) {
    this.setState({ activeTab });
  }

  onDigitSelected(series) {
    console.log(series);
    this.setState({
      activeTab: 'series',
      series,
    });
  }

  render() {
    const { activeTab, series } = this.state;

    return (
      <div>
        <AppBar title="F×F"/>
        <Tabs
          value={activeTab}
          onChange={this.setActiveTab.bind(this)}
        >
          <Tab label="Table" value="table">
            <MultiplicationTable
              onDigitSelected={this.onDigitSelected.bind(this)}
            />
          </Tab>
          <Tab label="Series" value="series">
            <MultiplicationSeries
              digit={series}
              onDigitSelected={this.onDigitSelected.bind(this)}
            />
          </Tab>
          <Tab label="Test" value="test" />
        </Tabs>
      </div>
    );
  }
}

Application.childContextTypes = {
  muiTheme: React.PropTypes.object
};

export default Application;
