const returnClarifaiRequestOptions = (imageUrl) => {
    const PAT = '2d320a77fcf747dfae5992a872561d55';
    const USER_ID = 'glykoudis';
    const APP_ID = 'test';
    const IMAGE_URL = imageUrl;
  
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
        ]
    });
  
    const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
    };
  
    return requestOptions;
}

const handleApiCall = (req, res) => {
    const MODEL_ID = 'face-detection';
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiRequestOptions(req.body.input))
      .then(response => response.json())
      .then(response => {
        return res.json(response);
    })
    .catch(err => res.status(400).json('unable to work with API'));
}

const handleImage = (db) => (req, res) => {
    const { id, image } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
    handleImage: handleImage,
    handleApiCall
}