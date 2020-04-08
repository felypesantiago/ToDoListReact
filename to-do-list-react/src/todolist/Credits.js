import React from 'react';

import './Credits.css';

const Credits = () => {
  return (
    <div className="card">
      <div className="card-header">
          Credits
      </div>
      <div className="card-body">
          <div className="container-fluid">
              <div className="text-center">Developed by:</div>
              <div className="text-center">
                  <h3>Felype Santiago Ferreira</h3>
              </div>

              <div className="text-center">
                  <a href="mailto:felype.ferreira@gmail.com">felype.ferreira@gmail.com</a>
              </div>
          </div>
      </div>
    </div>
  );
}

export default Credits;
