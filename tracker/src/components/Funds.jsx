import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import axios from "axios";

class Funds extends Component {

    state  = {
        funds : [],
    }

    componentDidMount () {
        axios
          .get(`http://localhost:4000/api/funds`)
          .then((res) => {
            this.setState({ funds: res.data });
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    fundsList() {
       return this.state.funds.map((fund, i ) => {
           return (
             <tr key={i}>
               <td>{fund.fundName}</td>
               <td>{fund.isActive ? "✅" : "❌"}</td>
               <td>{fund.source}</td>
               <td>${fund.amount.toLocaleString(navigator.language, { minimumFractionDigits: 2 })}</td>
               <td>
                 <Button
                   variant="warning"
                   //   as={Link}
                   //   to={"/editEntry/" + log._id}
                 >
                   {" "}
                   View / Edit{" "}
                 </Button>
               </td>
             </tr>
           );

        })
    }

    render() {
        console.log(this.state)
        return (
          <div className="container" style={{ marginTop: 20 }}>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Active?</th>
                  <th>Source</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{this.fundsList()}</tbody>
            </table>
          </div>
        );
    }
}

export default Funds;