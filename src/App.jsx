import { useState } from 'react'
import './styles/main.less';
import React from 'react';
import LoadingCover from './components/Container/LoadingCover/LoadingCover.jsx';
import Navbar from './components/Container/Navbar/Navbar.jsx';
import GalleryContainer from './components/Container/GalleryContainer/GalleryContainer.jsx';
import Container from './components/Container/Container.jsx';

function App() {
  const [isSingleColumn, setIsSingleColumn] = useState(false);
  return (
    <>
      <LoadingCover />
      <Navbar isSingleColumn={isSingleColumn} setIsSingleColumn={setIsSingleColumn} />
      <GalleryContainer isSingleColumn={isSingleColumn} />
    </>
  );
}

export default App;