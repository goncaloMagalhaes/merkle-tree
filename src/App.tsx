import React, { useState, useEffect } from 'react';
import { Typography, TextField, Box, Grid } from '@material-ui/core';

import { mySha256 } from './utils/HashFunctions';
import Node from './components/Node/Node';

import './App.css';


const App = () => {

  const [rootHash, setRootHash] = useState<string>('');
  const secondLevel = [useState<string>(''), useState<string>('')];
  const thirdLevel = [useState<string>(''), useState<string>(''), useState<string>(''), useState<string>('')];

  const changeHash = (newInput: string, nodeIndex: number) => {
    const newThirdLevelHash = mySha256(newInput)
    thirdLevel[nodeIndex][1](newThirdLevelHash);

    const secondLevelIndex = Math.floor(nodeIndex / 2);
    const nodeSiblingIndex = nodeIndex === secondLevelIndex * 2 ? nodeIndex + 1 : nodeIndex - 1;
    const nodeSiblingHash = thirdLevel[nodeSiblingIndex][0];

    const newSecondLevelHash = mySha256(nodeIndex < nodeSiblingIndex ? newThirdLevelHash + nodeSiblingHash : nodeSiblingHash + newThirdLevelHash);
    secondLevel[secondLevelIndex][1](newSecondLevelHash);

    const secondLevelSiblingIndex = secondLevelIndex === 1 ? 0 : 1;
    const secondLevelSiblingHash = secondLevel[secondLevelSiblingIndex][0];

    const newRootHash = mySha256(secondLevelIndex === 0 ? newSecondLevelHash + secondLevelSiblingHash : secondLevelSiblingHash + newSecondLevelHash);
    setRootHash(newRootHash);
  }

  useEffect(() => {
    ['', '', '', ''].forEach((input, index) => changeHash(input, index));
  }, []);

  return (
    <Grid container direction="column" justifyContent="space-evenly" alignItems="center">
      <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
        <Node hash={rootHash} />
      </Grid>
      <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
        {secondLevel.map((nodeState) => (
          <Node hash={nodeState[0]} />
        ))}
      </Grid>
      <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
        {thirdLevel.map((nodeState, i) => (
          <Box component="span" sx={{ p: 2, border: '1px dashed grey', maxWidth: 300 }}>
            <Typography variant='subtitle2' style={{ wordWrap: "break-word" }} >{nodeState[0]}</Typography>
            <TextField 
              id={`hash-input-${i}`} 
              label="Input" 
              variant="outlined" 
              onChange={(e) => changeHash(e.target.value, i)} 
            />
          </Box>
        ))}
      </Grid>
    </Grid>
  );
}

export default App;
