import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Doughnut} from 'react-chartjs-2';

const API = "https://api.github.com/users";

const chartData = {labels: ["January", "February", "March", "April", "May"],
  datasets: [{
    label: "My First dataset",
    backgroundColor:['#0288d1','#26a69a','#8e24aa','#f44336','#e91e63',],
    borderColor: '#fff',
    data: [10, 8, 12, 20, 30],
  }]
}

const options = {
  maintainAspectRatio: false,
  responsive: false,
  legend: {
    position: 'bottom',
    labels: {
      boxWidth: 10
    }
  }
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  // fetchImages() {
  //   return (
  //     <img src="https://avatars0.githubusercontent.com/u/1?v=4" />
  //   );
      
  // }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ users: data }));
  }
  
  render() {

    const { users } = this.state;
    
    // const data = [{
    //   avatar: this.fetchImages(),
    //   name: 'Roy Agasthyan',
    //   age: 26,
    //   url: 'https://api.github.com/users/mojombo'
    // }]

    const columns = [{
      Header: 'Avatar',
      Cell: () => {
        return <div><img src={users.map(s => s.avatar_url)}/></div>
      },
      sortable: false,
      width: 150
    },{
      Header: 'Name',
      accessor: 'login',
      filterable: true,
      width: 250
    },{
      Header: 'Github',
      accessor: 'url',
      sortable: false
    }]

    return (
      <div className="wrapper">
        <div className="chartArea">
          <Doughnut 
            data= {chartData}
            height={320}
            width={370}
            options = {options}
          />
        </div>
        <div className="App">
          <ReactTable
            noDataText="Loading..."
            data={this.state.users}
            columns={columns}
            defaultPageSize = {6}
            pageSizeOptions = {[3, 6]}
          />
          {console.log(users.map(sel => sel.login))}
        </div>
      </div>
    )

  }
}

export default App;