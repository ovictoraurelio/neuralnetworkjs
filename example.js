module.exports = function(app){

/*
 |--------------------------------------------------------------------------
 | Initializing NeuralNetwork
 |--------------------------------------------------------------------------
 */

var exported = new require('../util/neuralnetwork');
var ann = new exported.NeuralNetwork({
    weights: {
        hiddenLayer: [
            [0,0,0],
            [0,0,0],
            [0,0,0],
          ],
        outLayer: [
            0,
            0,
            0
          ]},
        bias: {
            hiddenNeurons: [
                0,
                0,
                0
              ],
            outNeuron: 0
        }
  });
 /*
 |--------------------------------------------------------------------------
 | GET /api/feedfoward
 |--------------------------------------------------------------------------
 */
app.get('/ec-ann-api/feedfoward', function(req, res){  
  res.send({'result': ann.feedFoward(req.param('values'))});
});

 /*
 |--------------------------------------------------------------------------
 | GET /api/feedfowardmultiples
 |--------------------------------------------------------------------------
 */
app.post('/ec-ann-api/feedfowardmultiples', function(req, res) {        
    res.send({'result': ann.feedForwardMultiples(req.param('v'))});  
});

};