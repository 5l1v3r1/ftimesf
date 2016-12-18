import React from 'react';

import TextField from 'material-ui/TextField';

export const digits = Array.from(Array(16), (_, n) => n+1);

export const HexNum = ({ value, width, onClick }, { hexFormat }) => {
  const string = value.toString(16).toUpperCase();
  const Element = onClick ? 'a' : 'span';
  const click = onClick && (() => onClick( value ));

  return (
    <Element
      className={'hexnum' + (hexFormat ? ` hexfmt-${hexFormat}` : '')}
      onClick={click}
    >
      {width && width - string.length
        ? <span className="pad">
            {new Array(width - string.length + 1).join('0')}
          </span>
        : null
      }
      {string}
    </Element>
  );
};

HexNum.propTypes = {
  value: React.PropTypes.number.isRequired,
  width: React.PropTypes.number,
  onClick: React.PropTypes.func,
};

HexNum.contextTypes = {
  hexFormat: React.PropTypes.string,
};

export const HexNumField = (props, { hexFormat }) => (
  <span
    className={'hexnum' + (hexFormat ? ` hexfmt-${hexFormat}` : '')}
  >
    <TextField {...props} />
  </span>
);

HexNumField.contextTypes = {
  hexFormat: React.PropTypes.string,
};
