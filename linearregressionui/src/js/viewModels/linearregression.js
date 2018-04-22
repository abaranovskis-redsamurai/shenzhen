/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'viewModels/common/linearRegressionHelper', 'ojs/ojlabel',
        'jquery', 'ojs/ojmodel', 'ojs/ojbutton', 'ojs/ojchart', 'ojs/ojinputtext', 'ojs/ojformlayout'],
 function(oj, ko, linearRegressionHelper, $) {
    function LinearRegressionViewModule() {
      var self = this;

      self.trainingepochs = ko.observable(10);
      self.learningrate = ko.observable(0.001);
      self.cost = ko.observable(0);
      self.wRes = ko.observable(0);
      var refLine = {referenceObjects:[{text:'Best Fit (y = W*x)', type: 'line', items: [], color: '#f2160e', lineWidth: 3, location: 'front', displayInLegend: 'on', lineStyle: 'dashed'}]};

      self.yAxisData = ko.observable(refLine);
      self.xySeriesValue = ko.observableArray();
      self.xyGroupsValue = ko.observableArray();

      self.callTrainModel = function(event) {
        var dataPayload = JSON.stringify({
            "learningrate": parseFloat(self.learningrate()),
            "trainingepochs": parseInt(self.trainingepochs())
        });

        linearRegressionHelper.fetchTensorFlowData(dataPayload, fetchTensorFlowDataCallback);
      }

      function fetchTensorFlowDataCallback(collection) {
        var w = parseFloat(collection.results[0][0].w);
        self.wRes(w);
        self.cost(collection.results[0][0].cost);

        var xySeries = [{name: "Training data", items: collection.results[1], markerShape: "circle", markerDisplayed: "on", markerSize: 7}];
        var xyGroups = [];

        for (var i = 0; i < collection.results[1].length; i++) {
          xyGroups.push(i + 1);
        }

        refLine.referenceObjects[0].items = [];
        for (var i = 0; i < collection.results[1].length; i++) {
          var xVal = collection.results[1][i].x;
          var yEstimated = w * xVal;
          refLine.referenceObjects[0].items.push({x:xVal, value:yEstimated});
        }
        self.yAxisData(refLine);

        self.xySeriesValue(xySeries);
        self.xyGroupsValue(xyGroups);
      }

      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additionaly available methods.

      /**
       * Optional ViewModel method invoked when this ViewModel is about to be
       * used for the View transition.  The application can put data fetch logic
       * here that can return a Promise which will delay the handleAttached function
       * call below until the Promise is resolved.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
       * the promise is resolved
       */
      self.handleActivated = function(info) {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View.
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new LinearRegressionViewModule();
  }
);
