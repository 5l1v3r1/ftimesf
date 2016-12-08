import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import { ToolbarGroup } from 'material-ui/Toolbar';

import MultiplicationTable from './MultiplicationTable';
import MultiplicationSeries from './MultiplicationSeries';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'table',
      series: 2,
      half: false
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
    this.setState({
      activeTab: 'series',
      series
    });
  }

  setHalf(event) {
    const { half } = this.state;
    event.stopPropagation();
    this.setState({ half: !half });
  }

  render() {
    const { activeTab, series, half } = this.state;

    return (
      <div>
        <AppBar title="F×F" />
        <Tabs
          value={activeTab}
          onChange={this.setActiveTab.bind(this)}
        >
          <Tab label="Table" value="table">
            <div className="container">
              <MultiplicationTable
                half={half}
                setHalf={this.setHalf.bind(this)}
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
  muiTheme: React.PropTypes.object
};

export default Application;
