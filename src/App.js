import React, {useState, useEffect} from 'react';
import { getAll, post, put, deleteById } from './memdb.js'
import './App.css';
import CustomerList from './components/CustomerList.js'
import CustomerAddUpdateForm from './components/CustomerAddUpdateForm.js'

var initialState = {
  customers: [
    getAll()
  ]
}
 

function App(props) {
  
  let blankCustomer = { "id": -1, "name": "", "email": "", "password": "" };
  const [customers, setCustomers] = useState(initialState);
  const [formObject, setFormObject] = useState(blankCustomer);
  let mode = (formObject.id >= 0) ? 'Update' : 'Add';
  useEffect(() => { getCustomers() }, []);
  const getCustomers =  function(){
    setCustomers(initialState);
  }
  const handleListClick = function(item){
    if (formObject.hasOwnProperty('name') && item.name !== formObject.name) {
      setFormObject(item);
    }else{
      setFormObject(blankCustomer);
    }
  }  

  const handleInputChange = function (event) {
    const name = event.target.name;
    const value = event.target.value;
    let newFormObject = {...formObject}
    newFormObject[name] = value;
    setFormObject(newFormObject);
  }

  let onCancelClick = function () {
    setFormObject(blankCustomer);
  }

  let onDeleteClick = function () {
    if(formObject.id >= 0){
      deleteById(formObject.id);
    }
    setFormObject(blankCustomer);
  }

  let onSaveClick = function () {
    if (mode === 'Add') {
      post(formObject);
    }
    if (mode === 'Update') {
      put(formObject.id, formObject);
    }
    setFormObject(blankCustomer);
  }


  return (
    <div>
      <CustomerList {... customers}
        formObject={formObject}
        handleListClick={handleListClick}/>
      <div className="boxed">
      <CustomerAddUpdateForm formObject={formObject}
        mode={mode}
        handleInputChange={handleInputChange}
        onDeleteClick={onDeleteClick}
        onSaveClick={onSaveClick}
        onCancelClick={onCancelClick}/>
      </div>
    </div>
  );
}



export default App;
