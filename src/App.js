import React from 'react';
import logo from './logo.svg';
import './App.css';


var data = require('./your_file.json');

class App extends React.Component {



    renderTableHeader() {
      let header = Object.keys(data[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

   renderTableData() {
      return data.map((student, index) => {
         const { namn, apk, Varugrupp, nr } = student //destructuring
         var link ='https://www.systembolaget.se/'+nr
         return (
            <tr key={apk}>
               <td><a target="_blank" rel="noopener noreferrer" href={link}>{namn}</a></td>
               <td>{apk}</td>
               <td>{Varugrupp}</td>
               <td><a target="_blank" rel="noopener noreferrer" href={link}>{nr}</a></td>
            </tr>
         )
      })
   }

   render() {
      return (
         <div>
            <h1 id='title'>Bäst APK på systemet!</h1>
            <table id='students'>
               <tbody>
                  <tr>{this.renderTableHeader()}</tr>
                  {this.renderTableData()}
               </tbody>
            </table>
         </div>
      )
   }
}
export default App;
