import React from 'react';
import ApiComponent from './components/ApiComponent';
import VideoList from './components/VideoList';
import FilteredVideoList from './components/FilteredVideoList';
//<VideoList />
const App = () => {
  return (
    <div>
      <ApiComponent />
      <VideoList/>
    </div>
  );
};

export default App;


