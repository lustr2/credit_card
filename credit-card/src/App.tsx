import  CardNumber from './components/CardNumber';

import './App.css';

function App() {

  return (
    <>
      <h2>Formulář</h2>
      <div className="container">
        <CardNumber />
         {/*<div className='block-row'>
          <div className='input-row'>
            <div className="label-row">
              <label className="label">Label 2</label>
              <input className="input-small" type="text" alt='1'/>
            </div>
            <div className="label-row">
              <label className="label">Label 2</label>
              <input className="input-small" type="text" alt='3'/>
            </div>
          </div>
        </div> */}
      </div>
      {/* <div className="container">
        <table>
            <tr>
                <td><label>Label 1</label></td>
            </tr>
            <tr>
                <td><input type="text" id="input1" maxlength="4"/></td>
                <td><input type="text" id="input2" maxlength="4"/></td>
                <td><input type="text" id="input3" maxlength="4"/></td>
                <td><input type="text" id="input4" maxlength="4"/></td>
            </tr>
            <tr>
                <td><label>Label 2</label></td>
                <td></td>
                <td><label>Label 2</label></td>
                <td></td>
            </tr>
            <tr>
                <td><input type="text" id="input5" maxlength="2"/></td>
                <td></td>
                <td><input type="text" id="input6" maxlength="3"/></td>
                <td></td>
            </tr>
        </table>
      </div> */}
    </>
  )
}

export default App;
