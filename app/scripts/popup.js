import React, { Component } from "react";
import ReactDOM from "react-dom";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import chromeUtil from "./chromeUtil.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hostList: []
    };
    this.autoBind();
  }

  autoBind() {
    Object.getOwnPropertyNames(this.constructor.prototype)
      .filter(prop => typeof this[prop] === "function")
      .forEach(method => {
        this[method] = this[method].bind(this);
      });
  }

  async componentDidMount() {
    const storedHostList = (await chromeUtil.getHostsFromStrage()).hosts;
    this.setState({ hostList: storedHostList });
  }

  registerHostToStrage(hostList) {
    chrome.storage.local.set({ hosts: hostList }, function() {});
  }

  hostListChanged(value, index) {
    this.setState(state => {
      const hostList = state.hostList;
      hostList[index] = value;

      this.registerHostToStrage(hostList);
      return { hostList: hostList };
    });
  }

  createNewRow() {
    this.setState(state => {
      const hostList = state.hostList;
      hostList.push("");
      return { hostList: hostList };
    });
  }

  deleteRow(index) {
    this.setState(state => {
      const hostList = state.hostList;
      hostList.splice(index, 1);

      this.registerHostToStrage(hostList);
      return { hostList: hostList };
    });
  }

  textBoxes() {
    let res = [];

    for (let i = 0, l = this.state.hostList.length; i < l; i++) {
      res.push(
        <ListItem>
          <TextField
            id="outlined-basic"
            margin="normal"
            variant="outlined"
            value={this.state.hostList[i]}
            margin="none"
            onChange={e => this.hostListChanged(e.target.value, i)}
          />
          <IconButton
            aria-label="delete"
            onClick={this.deleteRow.bind(this, i)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItem>
      );
    }
    res.push(
      <Button variant="outlined" color="primary" onClick={this.createNewRow}>
        <AddIcon />
      </Button>
    );
    return <List>{res}</List>;
  }

  render() {
    return <div>{this.textBoxes()}</div>;
  }
}

const mainContainer = document.querySelector("#App");
ReactDOM.render(<App />, mainContainer);
