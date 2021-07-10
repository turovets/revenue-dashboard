import React, { Dispatch, memo, SetStateAction } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

import './Switcher.scss';

type SwitcherItem = string;
type SwitcherProps = {
  disabled?: boolean;
  activeItem: SwitcherItem;
  items: string[];
  // TODO: make switcher generic to pass data type
  onChangeHandler: Dispatch<SetStateAction<any>>;
};

const Switcher = ({
  disabled,
  items,
  onChangeHandler,
  activeItem,
}: SwitcherProps) => {
  const onBtnClick = (item: SwitcherItem) => () => {
    onChangeHandler(item);
  };

  return (
    <ButtonGroup disabled={disabled}>
      {
        items.map((item) => (
          <Button
            key={item}
            style={{ width: `calc(100% / ${items.length})` }}
            className={`Switcher-btn ${activeItem === item ? 'Switcher-selected' : ''}`}
            onClick={onBtnClick(item)}
          >
            {item}
          </Button>
        ))
      }
    </ButtonGroup>
  );
};

export default memo(Switcher);
