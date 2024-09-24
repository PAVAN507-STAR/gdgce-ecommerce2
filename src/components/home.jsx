import React, { useEffect, useState } from 'react';
import Imgcard from './productcard';

function Home({products}) {
  
  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 col-sm-6 col-lg-3 mb-4">
            <Imgcard data={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
