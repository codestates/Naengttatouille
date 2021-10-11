import React from 'react';

import './Loading.css';

export default function Loading() {
  return (
    <div className='loadingpage'>
      <div className='lodingContent'>
        <span className='loadingText'>Loading . . .</span>
        <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  )
}
