import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

class Entries extends Component {

    state = {
        entries: [],
        users: [],
    }

    componentDidMount() {
        axios
        .get(`http://localhost:4000/api/entries`)
        .then((res) => {
        this.setState({ entries: res.data });
        })
        .catch(function (error) {
        console.log(error);
        });
    }

  entryList() {
    return this.state.entries.map((entries, i) => {
      return (
        <tr key={i}>
          <td>
            <Button
              variant="outline-warning mr-1"
            //   as={Link}
            //   to={"/viewEntry/" + log._id}
            >
              View
            </Button>
          </td>
          <td>{entries.datestamp.slice(0, 10)}</td>
          <td>{entries.fund}</td>
          <td>{entries.activity}</td>
          <td>{entries.duration} hrs</td>
          <td>
            <Button
              variant="outline-warning mr-1"
            //   as={Link}
            //   to={"/editEntry/" + log._id}
            >
              Edit
            </Button>
            <Button
              variant="outline-danger"
            //   value={log._id}
            //   onClick={this.deleteEntry}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="container" style={{ marginTop: 20 }}>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th></th>
              <th>Date</th>
              <th>Funding Source</th>
              <th>Activity</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          {/* <tbody>{this.readingsList()}</tbody> */}
          <tbody>{this.entryList()}</tbody>
        </table>
      </div>
    );
  }
}

export default Entries;