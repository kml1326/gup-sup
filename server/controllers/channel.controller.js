const Channel = require('../models/Channel');

module.exports = {
  create: (req, res) => {
    const { name } = req.body;
    const newChannel = new Channel({
      name,
      members: [],
      messages: [],
      date: new Date(),
    });
    newChannel.save((err, data) => {
      if(err) throw err;
      else { 
        return res.status(200).json({
          "message" : "create channel successfull"
        })
      }
    })
  },

  allChannel: (req, res) => {
    Channel.find({}, (err, channels) => {
      if (err) throw err;
      else res.json({ listOfChannel: channels })
    })
  },

  channelInfo: (req, res) => {
    Channel.findById(req.params.id, (err, data) => {
      if(!err) res.json(data);
    })
  },

  channelMessage: (req, res) => {
    const { id } = req.body;

    Channel.find({ _id: id }, (err, data) => {
      console.log(data)
      if (!err) return res.json(data);
    });
    
  },

};
