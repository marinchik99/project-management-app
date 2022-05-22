import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Button, ButtonGroup } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import { Column } from '../../store/reducers/columnsReducer';

export default function ColumnList(props: Column) {
  //const dispatch = useAppDispatch();
  const { id, title, order } = props;
  const [changeTitle, setTitle] = useState(false);
  const { columnList } = useAppSelector(({ columnsReducer }) => columnsReducer);

  return (
    <div className="list-container">
      <div className="list-block">
        <div className="title-container">
          <div className="list-title">
            {!changeTitle ? (
              <h3 onClick={() => setTitle(true)}> {title} </h3>
            ) : (
              <div className="list-input-container">
                <input className="list-input" type="text" />
                <ButtonGroup
                  className="list-input-buttons"
                  variant="outlined"
                  size="small"
                  aria-label="small button group"
                >
                  <Button onClick={() => setTitle(false)}>Submit</Button>
                  <Button onClick={() => setTitle(false)}>Cansel</Button>
                </ButtonGroup>
              </div>
            )}
          </div>
          <CloseIcon className="list-close" />
        </div>
        <div className="list">
          <div className="list__item">Карточка с содержимым</div>
        </div>
        <Button className="add-card">
          <AddIcon fontSize="small" />
          Добавить карточку
        </Button>
      </div>
    </div>
  );
}
