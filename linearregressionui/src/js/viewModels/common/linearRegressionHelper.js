define(['ojs/ojcore', 'knockout'], function (oj, ko) {

    function LinearRegressionHelperViewModule() {
        var self = this;

        var urlEmployees = "http://localhost:5000/redsam/api/v0.1/points";

        self.fetchTensorFlowData = function(dataPayload, fetchTensorFlowDataCallback) {
          $.ajax({
              url: urlEmployees,
              data: dataPayload,
              type: 'POST',
              contentType: 'application/json',
              dataType: 'json',
              success: fetchTensorFlowDataCallback,
              error: function (jqXHR, textStatus, errorThrown) {
                console.log('Error during fetch');
              }
          });
        }
    }

    return new LinearRegressionHelperViewModule();
});
