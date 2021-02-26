import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import  MenuItem from '../menu-item/menu-item.component'
import './directory.styles.scss';

import { selecDirectorySections } from '../../redux/directory/directory.selector';


const Directory = ({sections}) => {
  return(
    <div className='directory-menu'>
    {sections.map(({id,...otherSectionProps}) =>(
      <MenuItem key={id} {...otherSectionProps}/>
    ))}
  </div>
  )
};
  
const mapStateToProps = createStructuredSelector({
  sections: selecDirectorySections
})

export default connect(mapStateToProps)(Directory);