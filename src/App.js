import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      title: 'CRUD App Vizualizer',
      act: 0,
      index: '',
      datas: []
    }
  } 

  componentDidMount(){
    this.refs.marca.focus();
  }

  fSubmit = (e) =>{
    e.preventDefault();
    console.log('Funciona');

    let datas = this.state.datas;
    let marca = this.refs.marca.value;
    let modelo = this.refs.modelo.value;
    let versao = this.refs.versao.value;
    let ano = this.refs.ano.value;

    if(this.state.act === 0){   //new
      let data = {
        marca, modelo, versao, ano
      }
      datas.push(data);
    }else{                      //update
      let index = this.state.index;
      datas[index].marca = marca;
      datas[index].modelo = modelo;
      datas[index].versao = versao;
      datas[index].ano = ano
    }    

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.marca.focus();
  }

  fRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.marca.focus();
  }

  fEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.marca.value = data.marca;
    this.refs.modelo.value = data.modelo;
    this.refs.versao.value = data.versao;
    this.refs.ano.value = data.ano

    this.setState({
      act: 1,
      index: i
    });

    this.refs.marca.focus();
  }  

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="marca" placeholder="marca" className="formField" />
          <input type="text" ref="modelo" placeholder="modelo" className="formField" />
          <input type="text" ref="versao" placeholder="versao" className="formField" />
          <input type="text" ref="ano"  placeholder="ano" className="formField" />
          <button onClick={(e)=>this.fSubmit(e)} className="myButton">submit </button>
        </form>
        <pre>
          {datas.map((data, i) =>
            <li key={i} className="myList">
              {i+1}. {data.marca}, {data.modelo}, {data.versao}, {data.ano}
              <button onClick={()=>this.fRemove(i)} className="myListButton">remove </button>
              <button onClick={()=>this.fEdit(i)} className="myListButton2">edit </button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;