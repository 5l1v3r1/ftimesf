import React from 'react';

import { restoreState, storeState } from '../storage';

import { digits } from './HexNum';

const settingsStore = WrappedComponent => {
  class SettingsStore extends React.Component {
    constructor(props) {
      super(props);

      this.setHexFormat = this.setHexFormat.bind(this);
      this.setHalfedTable = this.setHalfedTable.bind(this);
      this.setAllowedFactor = this.setAllowedFactor.bind(this);

      this.state = restoreState('settings', {
        halfedTable: false,
        hexFormat: 'c',
        allowedFactors: digits.map(() => true),
      });
    }

    componentWillUpdate(props, state) {
      storeState('settings', state);
    }

    getChildContext() {
      const { hexFormat, halfedTable, allowedFactors } = this.state;
      return {
        hexFormat,
        setHexFormat: this.setHexFormat,
        halfedTable,
        setHalfedTable: this.setHalfedTable,
        allowedFactors,
        setAllowedFactor: this.setAllowedFactor,
      };
    }

    setHexFormat(hexFormat) {
      this.setState({ hexFormat });
    }

    setHalfedTable(halfedTable) {
      this.setState({ halfedTable });
    }

    setAllowedFactor(factor, allowed) {
      const { allowedFactors } = this.state;

      const newAllowedFactors = [ ...allowedFactors ];
      newAllowedFactors[factor] = allowed;
      this.setState({ allowedFactors: newAllowedFactors });
    }

    render() {
      return (<WrappedComponent {...this.props} />);
    }
  }

  SettingsStore.childContextTypes = {
    hexFormat: React.PropTypes.string,
    setHexFormat: React.PropTypes.func,
    halfedTable: React.PropTypes.bool,
    setHalfedTable: React.PropTypes.func,
    allowedFactors: React.PropTypes.arrayOf(React.PropTypes.bool),
    setAllowedFactor: React.PropTypes.func,
  };

  return SettingsStore;
};

export default settingsStore;
