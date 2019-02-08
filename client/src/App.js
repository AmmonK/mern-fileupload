import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      fruits: [],
      fruit: {}
    };
  }

  url = "http://localhost:5000/fruit";

  componentWillMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(this.url)
      .then(response => response.json())
      .then(data => this.setState({ fruits: data }))
      .then(data => console.log(this.state.fruits));
  }

  addData() {
    console.log(this.state.fruit);
    let formData = new FormData();
    formData.append("name", this.state.fruit.name);
    formData.append("image", this.state.fruit.image);
    let formOpts = { method: "POST", body: formData };
    fetch(this.url, formOpts).then(response => {
      this.fetchData();
    });
  }

  inputChange(e) {
    let fruit = { ...this.state.fruit, name: e.target.value };
    this.setState({ fruit: fruit });
  }

  fileChange(e) {
    let fruit = { ...this.state.fruit, image: e.target.files[0] };
    this.setState({ fruit: fruit });
  }

  render() {
    return (
      <div>
        <input
          placeholder="name"
          name="name"
          onChange={e => this.inputChange(e)}
        />
        <input
          id="image"
          type="file"
          accept="image/*"
          name="image"
          onChange={e => this.fileChange(e)}
        />
        <button onClick={e => this.addData(e)} type="submit">
          Submit
        </button>

        <ul>
          {this.state.fruits.map(f => (
            <li key={f._id}>
              {f.name}
              <img src={f.image} height="200" />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
