'use strict';
 import React  from 'react'
 import ReactDOM from 'react-dom'
 import logo from './images/logo.png'
 import './search.less'

 class Search extends React.Component{
     render(){
         return <div className="search-text">
             Search Text 的文字1<img src={ logo } />
        </div>
     }
 }

 ReactDOM.render(
     <Search />,
     document.getElementById('root')
 )