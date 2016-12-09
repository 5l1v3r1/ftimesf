import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import { ToolbarGroup } from 'material-ui/Toolbar';

import SettingsDrawer from './SettingsDrawer';
import MultiplicationTable from './MultiplicationTable';
import MultiplicationSeries from './MultiplicationSeries';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'table',
      series: 2,
      halfedTable: true,
      hexFormat: 'c',
    };
  }

  getChildContext() {
    const { hexFormat, halfedTable } = this.state;
    return {
      muiTheme: getMuiTheme(lightTheme),
      hexFormat,
      setHexFormat: this.setHexFormat.bind(this),
      halfedTable,
      setHalfedTable: this.setHalfedTable.bind(this)
    };
  }

  setActiveTab(activeTab) {
    this.setState({ activeTab });
  }

  onDigitSelected(series) {
    this.setState({
      activeTab: 'series',
      series
    });
  }

  setHalf(e) {
    const { half } = this.state;
    e.stopPropagation();
    this.setState({ half: !half });
  }

  toggleSettings() {
    this.refs.settings.toggle();
  }

  setHexFormat(hexFormat) {
    this.setState({ hexFormat });
  }

  setHalfedTable(halfedTable) {
    this.setState({ halfedTable });
  }

  render() {
    const {
      activeTab,
      series,
    } = this.state;

    return (
      <div>
        <SettingsDrawer ref="settings" />
        <AppBar
          title="F×F"
          onLeftIconButtonTouchTap={this.toggleSettings.bind(this)}
        />
        <Tabs
          value={activeTab}
          onChange={this.setActiveTab.bind(this)}
        >
          <Tab label="Table" value="table">
            <div className="container">
              <MultiplicationTable
                onDigitSelected={this.onDigitSelected.bind(this)}
              />
            </div>
          </Tab>
          <Tab label="Series" value="series">
            <div className="container">
              <MultiplicationSeries
                digit={series}
                onDigitSelected={this.onDigitSelected.bind(this)}
              />
            </div>
          </Tab>
          <Tab label="Test" value="test">
            <div className="container">
              @TODO: add random calculation test (w/ selectable max number size?)
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

Application.childContextTypes = {
  muiTheme: React.PropTypes.object,
  hexFormat: React.PropTypes.string,
  setHexFormat: React.PropTypes.func,
  halfedTable: React.PropTypes.bool,
  setHalfedTable: React.PropTypes.func
};

export default Application;
