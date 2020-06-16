import mongoose from "mongoose";
import Client from "../models/Client";


class ClientController {
  index(req, res) {
    Client.find().sort({ 'name': 'ascending' }).exec().then(docs => {
      return res.status(200).json(docs);
    })
      .catch(err => {
        return res.status(500).json({ error: err });
      })
  }

  store(req, res) {
    const client = new Client({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      cpf: req.body.cpf,
      birth: req.body.birth
    });
    const isName = Client.findOne({ name: client.name });
    if (!isName) {
      return res.status(400).json({ error: 'These name is already being used' })
    }
    client.save().then(result => {
      console.log(result)
      return res.status(201).json(client);
    })
      .catch(err => {
        console.log(err);
        return res.status(500).json({ error: err });
      });
  }
  get(req, res) {
    const id = req.params.clientId;
    if (id.length != 24) {
      return res.status(404).json({ error: 'Invalid Id' });
    }
    Client.findById(id)
      .exec()
      .then(doc => {
        if (doc == null) {
          return res.status(404).json({ error: 'Invalid Id' });
        }
        return res.status(200).json(doc);
      })
      .catch(err => {
        return res.status(500).json({ error: err });
      })
  }
  delete(req, res) {
    const id = req.params.clientId;
    if (id.length != 24) {
      return res.status(404).json({ error: 'Invalid Id' });
    }
    Client.findById(id).exec().then(doc => {
      if (doc == null) {
        return res.status(404).json({ error: 'Invalid Id' });
      } else {
        Client.deleteOne({ _id: id }).exec(doc => {
          if (doc == null) {
            return res.status(200).json({ message: `Client with Id: '${id}' was removed` });
          }
        })
      }
    })
      .catch(err => {
        return res.status(500).json({ error: err })
      })
  }
}

export default new ClientController();