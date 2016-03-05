/***
  * @author Victor Aurélio
  * @since 12-02-2016

  - Exclusively for networks with an output neuron.
  - LogSig function in use
**/
module.exports.NeuralNetwork = function(data){
  for(property in data){
      this[property] = data[property];
  }
};
module.exports.NeuralNetwork.prototype = {      
    values: [],
    result: null,  
    weights: {
      hiddenLayer: [],
      outLayer:[]
    },
    bias: {
      hiddenNeurons: [],
      outNeuron: null
    },
    limitValues: {
      input: {
        min: [],
        max: []
      },
      output: {
        min: null,
        max: null
      },
    },
    feedFoward: function(values){
      this.values = typeof values !== 'undefined' ? values : this.values;        
      // ------------------------- 1 formula's part -------------------
      var result = [];  
      result = this.multiplyMatrix([this.values], this.weights.hiddenLayer);    
      result = this.addMatrix(result, this.bias.hiddenNeurons);    
      var afterLogSig = [];
      for (var i = 0; i < result.length; i++) {
        afterLogSig.push(this.logSig(result[i]));
      }        
      // ------------------------- 2 formula's part -------------------
      var sum = [];
      sum = this.multiplyMatrix([afterLogSig], [this.weights.outLayer]);        
      return this.result = parseFloat(sum) + parseFloat(this.bias.outNeuron);    
    },
    feedForwardMultiples: function(values){
      var results = [];
      for (var i = 0; i < values.length; i++){         
        results[i] = this.feedFoward(values[i]);
      }
      return this.result = results;
    },
    logSig: function(n){
      return 1 / (1 + Math.exp(-n));
    },
    multiplyMatrix: function(m1, m2){     
      var result = [];
      for (var i = 0; i < m1.length; i++) {      
          for (var l = 0; l < m2.length; l++) {          
            result.push([]);var sum = 0;
            for (var j = 0; j < m2[l].length; j++) {            
              sum += parseFloat(m1[i][j]) * parseFloat(m2[l][j]);
            }          
            result[l] = sum;
          }
      }
      return result;
    },
    addMatrix: function(m1, m2){    
      var result = [];
      for (var i = 0; i < m1.length; i++) {
        result.push([]);
        result[i] = parseFloat(m1[i]) + parseFloat(m2[i]);
      }    
      return result;
    }
};