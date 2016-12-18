import React from 'react';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import { HexNum, digits } from './HexNum';

class SettingsDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }
  }

  toggle() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  render() {
    const { open } = this.state;
    const {
      hexFormat, setHexFormat,
      halfedTable, setHalfedTable,
      allowedFactors, setAllowedFactor,
    } = this.context;

    const prefixes = [
      ['None', null],
      ['C-Style', 'c'],
      ['ASM-Style', 'asm'],
    ];

    return (
      <Drawer
        docked={false}
        open={open}
        onRequestChange={open => this.setState({ open })}
      >
        <Subheader>Number Format Prefix</Subheader>
        {prefixes.map( ([title, key]) =>
          <MenuItem
            key={key}
            primaryText={title}
            checked={hexFormat == key}
            onTouchTap={e => { e.stopPropagation(); setHexFormat(key); }}
            insetChildren
          />
        )}
        <Subheader>Table Options</Subheader>
        <MenuItem
          primaryText="Show halfed Table"
          checked={halfedTable}
          onTouchTap={e => { e.stopPropagation(); setHalfedTable(!halfedTable); }}
          insetChildren
        />
        <Subheader>Test Options</Subheader>
        <MenuItem
          primaryText="Allowed Factors"
          rightIcon={<ArrowDropRight />}
          menuItems={digits.map(a =>
            <MenuItem
              primaryText={<HexNum value={a} width={2} />}
              checked={allowedFactors[a]}
              onTouchTap={e => { e.stopPropagation(); setAllowedFactor(a, !allowedFactors[a]); }}
              insetChildren
            />
          )}
          insetChildren
        />
      </Drawer>
    );
  }
};

SettingsDrawer.contextTypes = {
  hexFormat: React.PropTypes.string,
  setHexFormat: React.PropTypes.func.isRequired,
  halfedTable: React.PropTypes.bool,
  setHalfedTable: React.PropTypes.func.isRequired,
  allowedFactors: React.PropTypes.arrayOf(React.PropTypes.bool).isRequired,
  setAllowedFactor: React.PropTypes.func.isRequired,
};

export default SettingsDrawer;
