'use client';

import { Box, LinearProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

export default function Loading() {

  // const [topOffset, setTopOffset] = useState(0); 

  // useEffect(() => {

  //   const header = document.getElementById('header');
  //   if (header) {    
  //     setTopOffset(header.offsetHeight);
  //   }
    
  // }, []);

  return (
      <Box sx={{ width: '100%',position: 'absolute',  top: 0,
      left: 0,
      zIndex: 1002  }}>
        <LinearProgress />
      </Box>
  );
}