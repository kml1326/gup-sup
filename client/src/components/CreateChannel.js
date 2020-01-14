import React, { Component } from 'react'

class CreateChannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCreateChannel = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
    .then(res => {
      if(res.status == 200) {
        this.props.history.push('/')
      } else {
        console.log('some error')
      }
    })
    
  }

  render() {
    return (
      <div className="create-channel">
        <a href='/' className="back-btn">back</a>
        <form className="create-channel-form">
          <input className='input create-channel-input' type='text' name='name' placeholder='channel name' onChange={this.handleChange}></input>
          <button onClick={this.handleCreateChannel} className='btn create-channel-btn'>Create</button>
        </form>
      </div>
    )
  }
}

export default CreateChannel;
