import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

class Entries extends Component {
  
    state = {
        entries: [],
    };

   componentDidMount() {      
       axios
         .get(`http://localhost:4000/api/entries`)
         .then((res) => {
           this.setState({ entries: [res.data] });
         })
         .catch(function (error) {
           console.log(error);
         });
    }


  entryList() {
    return this.state.entries.map((entries, i) => {
        let fund = entries[i].fund_id
        let activity = entries[i].activity_id
      return (
        <tr key={i}>
          <td>{entries[i].datestamp.slice(0, 10)}</td>
          <td>{fund.fundName}</td>
          <td>{activity.activityName}</td>
          <td>{entries[i].duration} hrs</td>
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
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="container" style={{ marginTop: 20 }}>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Funding Source</th>
              <th>Activity</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.entryList()}</tbody>
        </table>
      </div>
    );
  }
}

export default Entries;