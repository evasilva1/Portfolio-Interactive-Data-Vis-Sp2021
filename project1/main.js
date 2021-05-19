//-73.97,40.7  . -73.92,40.74 for BK
mapboxgl.accessToken = 'pk.eyJ1IjoiZXNpbHZhLTEiLCJhIjoiY2tvOWJweWFkMGo0YTJ4cWh2end2NjFlNyJ9.cFv_HCk8vjYHiZI3zNQrBg';
    var bounds = [
    [-74.16,40.61],
    [-73.74,40.86]
    ];
        
    var map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/esilva-1/ckopx6ywl2a0517ps530ulntv', // style URL
        center: [-73.968, 40.715], // starting position [lng, lat]
        zoom: 13.4, // starting zoom
        maxBounds: bounds // bounds set as max
                //place this in js and add src at the bottom
    });

    map.on('load', function(){
        map.getCanvas().style.cursor = 'default';
    
        let layers = [
            'incident'
        ];
    
        var colors = [
            '#f7d04a'
        ];
    
        // Create Legend
        for (i = 0; i < layers.length; i++) {
            let layer = layers[i];
            let color = colors[i];
            let item = document.createElement('div');
            let key = document.createElement('span');
            key.className = 'legend-key';
            key.style.backgroundColor = color;
        
            var value = document.createElement('span');
            value.innerHTML = layer;
            item.appendChild(key);
            item.appendChild(value);
            legend.appendChild(item);
          }
        
        // Change Info on Hover
        map.on('mousemove', function(e){
            var states = map.queryRenderedFeatures(e.point, {
                layers: ['incident-final-detailed']
              });
          
              if (states.length > 0) {
                document.getElementById('pd').innerHTML =
                  '<h3><strong>BIN# ' +
                  states[0].properties.bin +
                  '</strong></h3>&nbsp;&nbsp;Address: ' +
                  states[0].properties["jAddress Number"] + 
                  ' ' +
                  states[0].properties.jStreet +
                  '</br>&nbsp;&nbsp;BIS Complaint#: '+
                  states[0].properties.jBISComplaintNumber +
                  '</br>&nbsp;&nbsp;Incident Date: '+
                  states[0].properties["jIncident date (MM/DD/YYYY)"] +
                  '</br><p>Incident Description: '+
                  states[0].properties["jEOC Final Description"]+
                  '</p>'
                  ;
              } else {
                document.getElementById('pd').innerHTML =
                  '<p>Hover over a incident!</p>'
        }
        });
    });