import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import { ToolbarGroup } from 'material-ui/Toolbar';

import { restoreState, storeState } from '../storage';
import settingsStore from './settingsStore';
import SettingsDrawer from './SettingsDrawer';
import MultiplicationTable from './MultiplicationTable';
import MultiplicationSeries from './MultiplicationSeries';

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = restoreState('appstate', {
      activeTab: 'table',
      series: 2,
    });
  }

  componentWillUpdate(props, state) {
    storeState('appstate', state);
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(lightTheme),
    };
  }

  setActiveTab(activeTab) {
    this.setState({ activeTab });
  }

  onDigitSelected(series) {
    this.setState({
      activeTab: 'series',
      series,
    });
  }

  toggleSettings() {
    this.refs.settings.toggle();
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
          <Tab label="Test" value="test">
              @TODO: add random calculation test (w/ selectable max number size?)
          </Tab>
        </Tabs>
      </div>
    );
  }
}

Application.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

export default settingsStore(Application);
