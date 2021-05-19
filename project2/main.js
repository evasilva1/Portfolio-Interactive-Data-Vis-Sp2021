//-73.94565, 40.72164 . -73.9499, 40.626
mapboxgl.accessToken = 'pk.eyJ1IjoiZXNpbHZhLTEiLCJhIjoiY2tvOWJweWFkMGo0YTJ4cWh2end2NjFlNyJ9.cFv_HCk8vjYHiZI3zNQrBg';
    let bounds = [
    [-73.97,40.7],
    [-73.92,40.74]
    ];
        
    var map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/esilva-1/ckoot878s0zgy17n18bbfinkm', // style URL
        center: [-73.94565, 40.72164], // starting position [lng, lat]
        zoom: 16.0, // starting zoom
        maxBounds: bounds // bounds set as max
                //place this in js and add src at the bottom
    });

    map.on('load', function(){
    map.getCanvas().style.cursor = 'default';

    let layers = [
        'old law tenement',
        'constr.',
        'complaints',
        'adjacent to const.'
    ];

    var colors = [
        '#fb2222',
        '#fdb440',
        '#acb6ce',
        '#377eb9'
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
            layers: ['final-poly-wgs-2']
          });
      
          if (states.length > 0) {
            document.getElementById('pd').innerHTML =
              '<h3><strong>BIN# ' +
              states[0].properties.bin +
              '</strong></h3>&nbsp;&nbsp;Old Law Tenement: ' +
              states[0].properties.olt_yn +
              '</br>&nbsp;&nbsp;Construction Site: '+
              states[0].properties.cnst_yn +
              '</br>&nbsp;&nbsp;Adjacent to Construction: '+
              states[0].properties.adj_yn +
              '</br>&nbsp;&nbsp;Complaint: '+
              states[0].properties.comp_yn
              ;
          } else {
            document.getElementById('pd').innerHTML =
              '<p>Hover over a building!</p>'
    }
    });
});