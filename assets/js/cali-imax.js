(function () {
  'use strict';

  /* ===== DATA ===== */
  var BOUNDS = { minLat: 32.54, maxLat: 42.01, minLng: -124.41, maxLng: -114.14 };
  var SVG_W = 800, SVG_H = 1000, PAD = 40;

  var CA_OUTLINE = "M122.5,40.5 L182.4,40.0 L276.4,41.6 L349.0,41.6 L349.3,209.6 L349.0,332.5 L439.1,419.7 L524.3,505.3 L591.5,575.0 L639.9,626.6 L725.1,720.7 L725.1,732.9 L736.6,748.9 L746.2,774.4 L760.0,788.2 L751.6,801.0 L740.4,807.4 L732.0,824.4 L734.7,847.3 L732.8,861.6 L718.6,875.4 L723.2,911.6 L732.8,912.1 L736.6,930.2 L732.8,938.7 L718.9,942.5 L626.1,951.5 L550.4,960.0 L542.0,947.2 L541.6,927.0 L536.2,903.1 L526.3,886.1 L504.4,862.7 L476.4,840.9 L471.0,846.7 L460.3,843.0 L461.8,833.4 L449.5,813.8 L433.0,818.0 L403.8,803.7 L399.6,792.0 L380.0,777.6 L357.8,778.1 L339.4,771.7 L315.9,774.4 L303.7,761.6 L306.4,734.5 L302.1,730.3 L304.8,711.1 L286.4,696.8 L285.6,677.1 L278.7,676.0 L267.2,659.0 L259.1,655.3 L255.7,644.6 L228.8,604.8 L216.2,593.1 L213.5,561.7 L218.8,564.3 L223.8,545.7 L213.9,528.7 L201.6,530.8 L185.5,515.4 L179.7,503.2 L180.9,491.5 L172.8,476.1 L172.8,450.5 L185.8,450.5 L180.5,414.9 L174.7,418.6 L173.6,436.2 L159.7,439.9 L143.2,426.6 L140.6,403.7 L129.8,385.7 L115.6,374.5 L107.9,361.7 L87.2,336.7 L90.7,329.3 L81.1,296.9 L85.3,278.8 L79.1,251.7 L61.1,225.1 L43.5,210.2 L40.0,192.6 L57.7,150.1 L61.1,135.7 L57.7,124.6 L64.2,95.3 L58.4,68.7 L50.7,62.3 L53.8,41.1 L122.5,40.5 Z";

  var VENUES = [
    { id: 1, name: "AMC Metreon 16", city: "San Francisco", lat: 37.785, lng: -122.403, ar: "1.43:1", digital: "IMAX GT Laser", film: "IMAX GT3D 15/70mm", screen: "29.80m x 23.00m", note: "Tied for largest IMAX screen in the US" },
    { id: 2, name: "California Science Center IMAX", city: "Los Angeles", lat: 34.017, lng: -118.287, ar: "1.43:1", digital: "IMAX GT Laser", film: "", screen: "27.40m x 20.30m", note: "Museum venue, non-commercial" },
    { id: 3, name: "Universal CityWalk AMC IMAX", city: "Universal City", lat: 34.138, lng: -118.353, ar: "1.43:1", digital: "IMAX GT Laser", film: "IMAX GT3D 15/70mm", screen: "24.10m x 17.70m", note: "Dual: GT Laser + 15/70mm film" },
    { id: 4, name: "TCL Chinese Theatres IMAX", city: "Hollywood", lat: 34.102, lng: -118.341, ar: "1.90:1", digital: "IMAX GT Laser", film: "IMAX SR 15/70mm", screen: "28.70m x 14.00m", note: "Iconic Hollywood, film-capable" },
    { id: 5, name: "Regal Irvine Spectrum IMAX", city: "Irvine", lat: 33.649, lng: -117.740, ar: "1.43:1", digital: "IMAX CoLa", film: "IMAX 15/70mm", screen: "26.80m x 20.60m", note: "Massive 1.43:1 with film" },
    { id: 6, name: "Regal Ontario Palace IMAX", city: "Ontario", lat: 34.063, lng: -117.603, ar: "1.43:1", digital: "IMAX CoLa", film: "IMAX GT3D 15/70mm", screen: "27.10m x 20.40m", note: "Full 1.43:1, dual film projection" },
    { id: 7, name: "Regal Hacienda Crossings IMAX", city: "Dublin", lat: 37.706, lng: -121.926, ar: "1.43:1", digital: "IMAX CoLa", film: "IMAX GT3D 15/70mm", screen: "23.28m x 17.00m", note: "East Bay premium 1.43:1" },
    { id: 8, name: "Esquire IMAX Theatre", city: "Sacramento", lat: 38.556, lng: -121.425, ar: "1.43:1", digital: "IMAX Digital", film: "IMAX GT3D 15/70mm", screen: "23.10m x 18.00m", note: "Sacramento 1.43:1 with film" },
    { id: 9, name: "Fleet Science Center IMAX Dome", city: "San Diego", lat: 32.732, lng: -117.145, ar: "Dome", digital: "IMAX Laser for Dome", film: "", screen: "23.20m dome", note: "Balboa Park dome theatre" },
    { id: 10, name: "The Tech Interactive IMAX Dome", city: "San Jose", lat: 37.332, lng: -121.890, ar: "Dome", digital: "IMAX Laser for Dome", film: "", screen: "25.00m dome", note: "Silicon Valley dome" },
    { id: 11, name: "AMC Burbank 16 IMAX", city: "Burbank", lat: 34.183, lng: -118.326, ar: "1.90:1", digital: "IMAX CoLa", film: "", screen: "19.20m x 11.30m", note: "" },
    { id: 12, name: "AMC Century City 15 IMAX", city: "Los Angeles (West)", lat: 34.057, lng: -118.418, ar: "1.90:1", digital: "IMAX CoLa", film: "", screen: "16.80m x 9.50m", note: "Westside LA" },
    { id: 13, name: "AMC Santa Anita 16 IMAX", city: "Arcadia", lat: 34.136, lng: -118.046, ar: "1.90:1", digital: "IMAX with Laser", film: "", screen: "15.90m x 10.10m", note: "" },
    { id: 14, name: "AMC Topanga 12 IMAX", city: "Canoga Park", lat: 34.200, lng: -118.605, ar: "1.90:1", digital: "IMAX with Laser", film: "", screen: "", note: "San Fernando Valley" },
    { id: 15, name: "AMC Puente 20 IMAX", city: "City of Industry", lat: 34.003, lng: -117.937, ar: "1.90:1", digital: "IMAX CoLa", film: "", screen: "17.40m x 9.10m", note: "" },
    { id: 16, name: "Cinemark Daly City IMAX", city: "Daly City", lat: 37.688, lng: -122.463, ar: "1.90:1", digital: "IMAX CoLa", film: "", screen: "", note: "" },
    { id: 17, name: "AMC Bay Street 16 IMAX", city: "Emeryville", lat: 37.835, lng: -122.293, ar: "1.90:1", digital: "IMAX CoLa", film: "", screen: "15.10m x 8.80m", note: "" },
    { id: 18, name: "Regal Fresno IMAX", city: "Fresno", lat: 36.827, lng: -119.702, ar: "1.90:1", digital: "IMAX CoLa", film: "", screen: "", note: "Central Valley" },
    { id: 19, name: "Regal Aliso Viejo IMAX", city: "Aliso Viejo", lat: 33.575, lng: -117.726, ar: "1.90:1", digital: "IMAX with Laser", film: "", screen: "16.50m x 10.40m", note: "" },
    { id: 20, name: "Regal Long Beach IMAX", city: "Long Beach", lat: 33.791, lng: -118.155, ar: "1.90:1", digital: "IMAX with Laser", film: "", screen: "16.50m x 10.30m", note: "" },
    { id: 21, name: "AMC Montclair 12 IMAX", city: "Montclair", lat: 34.077, lng: -117.693, ar: "1.90:1", digital: "IMAX CoLa", film: "", screen: "", note: "" },
    { id: 22, name: "AMC Plaza Bonita 14 IMAX", city: "National City", lat: 32.654, lng: -117.098, ar: "1.90:1", digital: "IMAX with Laser", film: "", screen: "15.50m x 10.00m", note: "San Diego area" },
    { id: 23, name: "AMC Newpark 12 IMAX", city: "Newark", lat: 37.539, lng: -122.037, ar: "1.90:1", digital: "IMAX with Laser", film: "", screen: "18.50m x 10.20m", note: "" },
    { id: 24, name: "AMC 30 at the Block IMAX", city: "Orange", lat: 33.787, lng: -117.875, ar: "1.90:1", digital: "IMAX CoLa", film: "", screen: "17.40m x 8.80m", note: "" },
    { id: 25, name: "AMC Mercado 20 IMAX", city: "Santa Clara", lat: 37.372, lng: -121.967, ar: "1.90:1", digital: "IMAX CoLa", film: "", screen: "17.40m x 9.50m", note: "" },
    { id: 26, name: "Regal South Gate IMAX", city: "South Gate", lat: 33.944, lng: -118.195, ar: "1.90:1", digital: "IMAX with Laser", film: "", screen: "17.70m x 11.30m", note: "" },
    { id: 27, name: "Regal Stockton IMAX", city: "Stockton", lat: 37.954, lng: -121.290, ar: "1.90:1", digital: "IMAX with Laser", film: "", screen: "16.10m x 9.60m", note: "" },
    { id: 28, name: "AMC Sunnyvale 12 IMAX", city: "Sunnyvale", lat: 37.371, lng: -122.038, ar: "1.90:1", digital: "IMAX CoLa", film: "", screen: "", note: "" },
    { id: 29, name: "Regal Temecula IMAX", city: "Temecula", lat: 33.505, lng: -117.148, ar: "1.90:1", digital: "IMAX with Laser", film: "", screen: "15.50m x 10.20m", note: "Inland Empire south" },
    { id: 30, name: "AMC Del Amo 18 IMAX", city: "Torrance", lat: 33.832, lng: -118.352, ar: "1.90:1", digital: "IMAX CoLa", film: "", screen: "15.90m x 9.80m", note: "South Bay LA" },
    { id: 31, name: "Regal Yorba Linda IMAX", city: "Yorba Linda", lat: 33.889, lng: -117.776, ar: "1.90:1", digital: "IMAX CoLa", film: "", screen: "", note: "North Orange County" }
  ];

  var COLORS = {
    "GT Laser": "#a78bfa", "CoLa": "#f59e0b", "Single Laser": "#34d399",
    "Dome Laser": "#22d3ee", "Digital": "#94a3b8", "Film Only": "#fb7185", "Other": "#94a3b8"
  };
  var CHAIN_COLORS = {
    "AMC": "#ef4444", "Regal": "#3b82f6", "Cinemark": "#f97316",
    "TCL": "#eab308", "Museum": "#14b8a6", "Independent": "#8b5cf6", "Other": "#6c757d"
  };

  var ZOOM_REGIONS = [
    { key: "full", label: "Full State", minLat: 31.5, maxLat: 42.5, minLng: -125.0, maxLng: -113.5 },
    { key: "bay", label: "Bay Area", minLat: 37.25, maxLat: 37.92, minLng: -122.55, maxLng: -121.15 },
    { key: "la", label: "Greater LA", minLat: 33.45, maxLat: 34.25, minLng: -118.70, maxLng: -117.05 },
    { key: "sd", label: "San Diego", minLat: 32.55, maxLat: 32.85, minLng: -117.30, maxLng: -116.90 },
    { key: "socal", label: "All SoCal", minLat: 32.50, maxLat: 34.30, minLng: -118.80, maxLng: -117.00 }
  ];

  var FILTER_LIST = ["All", "GT Laser", "CoLa", "Single Laser", "Dome Laser", "1.43:1", "Film"];
  var CHAIN_LIST = ["All", "AMC", "Regal", "Cinemark", "TCL", "Museum", "Independent"];
  var REGION_LABELS = [
    { name: "Bay Area", lat: 37.6, lng: -122.85 },
    { name: "Sacramento", lat: 38.85, lng: -121.8 },
    { name: "Central Valley", lat: 36.4, lng: -120.3 },
    { name: "Greater LA", lat: 34.4, lng: -119.6 },
    { name: "San Diego", lat: 32.65, lng: -116.0 },
    { name: "Inland Empire", lat: 34.15, lng: -116.5 }
  ];

  /* ===== PURE FUNCTIONS ===== */
  function toXY(lat, lng) {
    var x = PAD + ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * (SVG_W - 2 * PAD);
    var y = PAD + ((BOUNDS.maxLat - lat) / (BOUNDS.maxLat - BOUNDS.minLat)) * (SVG_H - 2 * PAD);
    return [x, y];
  }

  function screenWidth(s) {
    if (!s) return 0;
    var m = s.match(/([\d.]+)\s*m/);
    return m ? parseFloat(m[1]) : 0;
  }

  function projectorType(v) {
    var d = (v.digital || "").toLowerCase();
    if (d.indexOf("gt laser") >= 0) return "GT Laser";
    if (d.indexOf("cola") >= 0) return "CoLa";
    if (d.indexOf("laser for dome") >= 0) return "Dome Laser";
    if (d.indexOf("with laser") >= 0) return "Single Laser";
    if (d.indexOf("digital") >= 0) return "Digital";
    if (v.film) return "Film Only";
    return "Other";
  }

  function getChain(v) {
    var n = v.name;
    if (n.indexOf("AMC") >= 0) return "AMC";
    if (n.indexOf("Regal") >= 0) return "Regal";
    if (n.indexOf("Cinemark") >= 0) return "Cinemark";
    if (n.indexOf("TCL Chinese") >= 0) return "TCL";
    if (n.indexOf("Esquire") >= 0) return "Independent";
    if (n.indexOf("Fleet Science") >= 0 || n.indexOf("Tech Interactive") >= 0 || n.indexOf("California Science") >= 0) return "Museum";
    return "Other";
  }

  function chipColor(f) {
    if (f === "All") return "#adb5bd";
    if (f === "1.43:1") return "#a78bfa";
    if (f === "Film") return "#fb7185";
    return COLORS[f] || "#6c757d";
  }

  function computeViewBox(region) {
    if (region.key === "full") return "0 0 " + SVG_W + " " + SVG_H;
    var tl = toXY(region.maxLat, region.minLng);
    var br = toXY(region.minLat, region.maxLng);
    var p = 30;
    return (tl[0] - p).toFixed(0) + " " + (tl[1] - p).toFixed(0) + " " + (br[0] - tl[0] + 2 * p).toFixed(0) + " " + (br[1] - tl[1] + 2 * p).toFixed(0);
  }

  function computeZoomScale(region) {
    if (region.key === "full") return 1;
    var tl = toXY(region.maxLat, region.minLng);
    var br = toXY(region.minLat, region.maxLng);
    return SVG_W / (br[0] - tl[0] + 60);
  }

  function venueInRegion(v, region) {
    if (region.key === "full") return true;
    return v.lat >= region.minLat && v.lat <= region.maxLat && v.lng >= region.minLng && v.lng <= region.maxLng;
  }

  function findVenue(id) {
    for (var i = 0; i < VENUES.length; i++) {
      if (VENUES[i].id === id) return VENUES[i];
    }
    return null;
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ===== STATE ===== */
  var state = { sel: null, hov: null, filt: "All", zoom: ZOOM_REGIONS[0], chain: "All" };

  /* ===== COMPUTED ===== */
  function getShown() {
    return VENUES.filter(function (v) {
      if (state.chain !== "All" && getChain(v) !== state.chain) return false;
      if (state.filt === "All") return true;
      if (state.filt === "1.43:1") return v.ar.indexOf("1.43") >= 0 && v.ar.indexOf("Dome") < 0;
      if (state.filt === "Film") return !!v.film;
      return projectorType(v) === state.filt;
    });
  }

  function getSorted(shown) {
    return shown.filter(function (v) { return venueInRegion(v, state.zoom); })
      .sort(function (a, b) { return screenWidth(b.screen) - screenWidth(a.screen); });
  }

  /* ===== HTML BUILDERS ===== */
  function pill(color, text) {
    return '<span style="font-size:11px;font-weight:600;padding:2px 6px;border-radius:3px;' +
      'background:' + color + '22;color:' + color + ';border:1px solid ' + color + '44;white-space:nowrap;">' + esc(text) + '</span>';
  }

  function buildHeader(count) {
    return '<div style="margin-bottom:8px;">' +
      '<h1 class="fw-bold" style="font-size:22px;color:#fff;margin:0 0 4px;">California IMAX</h1>' +
      '<p style="font-size:13px;color:rgba(255,255,255,.5);margin:0;">' +
      count + ' of ' + VENUES.length + ' venues shown. Click a pin or list item to inspect. Hover for preview.</p>' +
      '</div>';
  }

  function buildChipRow(items, activeKey, dataAttr, colorFn, countFn) {
    var h = '';
    items.forEach(function (item) {
      var on = activeKey === item;
      var c = colorFn(item);
      h += '<button data-' + dataAttr + '="' + esc(item) + '" style="padding:4px 12px;border-radius:99px;font-size:12px;font-weight:600;' +
        'background:' + (on ? c + '33' : 'rgba(0,0,0,.4)') + ';color:' + (on ? c : 'rgba(255,255,255,.5)') + ';' +
        'border:1px solid ' + (on ? c + '66' : 'rgba(255,255,255,.12)') + ';cursor:pointer;">' +
        item + (countFn ? ' (' + countFn(item) + ')' : '') + '</button>';
    });
    return h;
  }

  function buildFilters() {
    // projector type
    var h = '<div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:10px;">';
    h += buildChipRow(FILTER_LIST, state.filt, 'filter', chipColor);
    h += '</div>';

    // chain
    h += '<div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:10px;align-items:center;">';
    h += '<span style="font-size:11px;color:rgba(255,255,255,.4);letter-spacing:.08em;margin-right:2px;">CHAIN</span>';
    h += buildChipRow(CHAIN_LIST, state.chain, 'chain',
      function (c) { return c === "All" ? "#adb5bd" : CHAIN_COLORS[c] || "#6c757d"; },
      function (c) { return VENUES.filter(function (v) { return c === "All" || getChain(v) === c; }).length; });
    h += '</div>';

    // zoom — uses site accent #26c6da
    var shown = getShown();
    h += '<div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:20px;align-items:center;">';
    h += '<span style="font-size:11px;color:rgba(255,255,255,.4);letter-spacing:.08em;margin-right:4px;">ZOOM</span>';
    ZOOM_REGIONS.forEach(function (z) {
      var on = state.zoom.key === z.key;
      var count = shown.filter(function (v) { return venueInRegion(v, z); }).length;
      h += '<button data-zoom="' + z.key + '" style="padding:3px 10px;border-radius:6px;font-size:12px;font-weight:' + (on ? 700 : 500) + ';' +
        'background:' + (on ? 'rgba(38,198,218,.4)' : 'rgba(0,0,0,.4)') + ';color:' + (on ? '#26c6da' : 'rgba(255,255,255,.5)') + ';' +
        'border:1px solid ' + (on ? 'rgba(38,198,218,.4)' : 'rgba(255,255,255,.1)') + ';cursor:pointer;">' + z.label + ' (' + count + ')</button>';
    });
    h += '</div>';
    return h;
  }

  function buildPin(v, s) {
    var xy = toXY(v.lat, v.lng), px = xy[0], py = xy[1];
    var type = projectorType(v), col = COLORS[type];
    var is143 = v.ar.indexOf("1.43") >= 0 && v.ar.indexOf("Dome") < 0;
    var isDome = v.ar.indexOf("Dome") >= 0;
    var baseR = is143 ? 8 : isDome ? 7 : 5.5;
    var r = baseR / s, sw = 2 / s, fs = 12 / s, lo = 14 / s;

    var h = '<g class="venue-pin" data-vid="' + v.id + '" style="cursor:pointer;">';
    h += '<g class="pin-active-state">';
    h += '<circle class="pin-pulse-ring" cx="' + px + '" cy="' + py + '" r="' + (r + 12 / s) + '" fill="none" stroke="' + col + '" stroke-width="' + (1 / s) + '"/>';
    h += '<circle cx="' + px + '" cy="' + py + '" r="' + (r + 5 / s) + '" fill="' + col + '" opacity=".12"/>';
    h += '</g>';
    if (is143) h += '<circle class="pin-143-halo" cx="' + px + '" cy="' + py + '" r="' + (r + 3 / s) + '" fill="' + col + '" opacity=".07"/>';
    h += '<circle class="pin-dot" cx="' + px + '" cy="' + py + '" r="' + r + '" fill="' + col + '" stroke="rgba(0,0,0,.6)" stroke-width="' + sw + '" opacity="0.8"/>';
    if (is143) h += '<circle cx="' + px + '" cy="' + py + '" r="' + (2.5 / s) + '" fill="rgba(0,0,0,.5)" opacity=".6"/>';
    if (isDome) h += '<path d="M' + (px - 3 / s) + ',' + (py + 1 / s) + ' Q' + px + ',' + (py - 3 / s) + ' ' + (px + 3 / s) + ',' + (py + 1 / s) + '" fill="none" stroke="rgba(0,0,0,.4)" stroke-width="' + (1.5 / s) + '" opacity=".5"/>';
    var lx = px + (px > 500 ? -lo : lo), anchor = px > 500 ? "end" : "start";
    h += '<text class="pin-label" x="' + lx + '" y="' + (py - lo) + '" fill="#fff" font-size="' + fs + '" font-weight="600" text-anchor="' + anchor + '">' + esc(v.city) + '</text>';
    h += '</g>';
    return h;
  }

  function buildMap(shown, viewBox, zScale) {
    var h = '<div class="imax-map-container">';
    h += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + viewBox + '" style="display:block;width:100%;height:auto;">';
    h += '<defs><radialGradient id="mg" cx="50%" cy="60%" r="55%"><stop offset="0%" stop-color="#26c6da" stop-opacity=".06"/><stop offset="100%" stop-color="transparent" stop-opacity="0"/></radialGradient></defs>';
    h += '<rect x="-100" y="-100" width="' + (SVG_W + 200) + '" height="' + (SVG_H + 200) + '" fill="url(#mg)"/>';
    h += '<path d="' + CA_OUTLINE + '" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.12)" stroke-width="' + (1.5 / zScale) + '" stroke-linejoin="round"/>';
    h += '<path d="' + CA_OUTLINE + '" fill="none" stroke="rgba(38,198,218,.1)" stroke-width="' + (3 / zScale) + '" stroke-linejoin="round"/>';
    REGION_LABELS.forEach(function (r) {
      var xy = toXY(r.lat, r.lng);
      h += '<text x="' + xy[0] + '" y="' + xy[1] + '" text-anchor="start" fill="rgba(255,255,255,.15)" font-size="' + (13 / zScale) + '" font-weight="500">' + r.name + '</text>';
    });
    h += '<line id="imax-crosshair" x1="0" y1="0" x2="0" y2="0" stroke="#26c6da" stroke-width="' + (0.5 / zScale) + '" opacity="0" stroke-dasharray="' + (3 / zScale) + ' ' + (4 / zScale) + '"/>';
    shown.forEach(function (v) { h += buildPin(v, zScale); });
    h += '</svg>';
    h += '<div id="imax-hover-card" class="imax-hover-card" style="display:none;"></div>';
    h += '</div>';
    return h;
  }

  function buildVenueRow(v) {
    var type = projectorType(v), col = COLORS[type], w = screenWidth(v.screen);
    var is143 = v.ar.indexOf("1.43") >= 0 && v.ar.indexOf("Dome") < 0;
    var isSel = state.sel && state.sel.id === v.id;

    var h = '<div class="venue-row' + (isSel ? ' selected active' : '') + '" data-vid="' + v.id + '" style="border-left-color:' + (isSel ? col : 'transparent') + ';">';
    h += '<div style="display:flex;align-items:center;gap:8px;">';
    h += '<div style="width:7px;height:7px;border-radius:50%;background:' + col + ';flex-shrink:0;"></div>';
    h += '<div style="flex:1;min-width:0;">';
    h += '<div class="venue-row-name">' + esc(v.name) + '</div>';
    h += '<div style="font-size:11px;color:rgba(255,255,255,.35);">' + esc(v.city) + (w > 0 ? ' \u00b7 ' + w.toFixed(0) + 'm' : '') + '</div>';
    h += '</div>';
    h += '<div style="display:flex;gap:3px;flex-shrink:0;">';
    if (is143) h += pill('#a78bfa', '1.43');
    if (v.film) h += pill('#fb7185', 'F');
    h += pill(CHAIN_COLORS[getChain(v)] || '#6c757d', getChain(v));
    h += '</div></div></div>';
    return h;
  }

  function buildLegend() {
    var h = '<div style="background:rgba(0,0,0,.4);border-radius:8px;padding:12px 14px;border:1px solid rgba(255,255,255,.1);margin-bottom:12px;">';
    h += '<div style="font-size:11px;color:rgba(255,255,255,.4);letter-spacing:.1em;margin-bottom:8px;">LEGEND</div>';
    h += '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px;">';
    ["GT Laser", "CoLa", "Single Laser", "Dome Laser"].forEach(function (k) {
      h += '<div style="display:flex;align-items:center;gap:5px;">';
      h += '<div style="width:8px;height:8px;border-radius:50%;background:' + COLORS[k] + ';"></div>';
      h += '<span style="font-size:12px;color:rgba(255,255,255,.6);">' + k + '</span></div>';
    });
    h += '</div>';
    h += '<div style="display:flex;gap:12px;padding-top:8px;border-top:1px solid rgba(255,255,255,.08);">';
    h += '<div style="display:flex;align-items:center;gap:4px;">';
    h += '<svg width="14" height="14"><circle cx="7" cy="7" r="5.5" fill="#a78bfa" stroke="rgba(0,0,0,.5)" stroke-width="1.5"/><circle cx="7" cy="7" r="2" fill="rgba(0,0,0,.5)" opacity=".6"/></svg>';
    h += '<span style="font-size:12px;color:rgba(255,255,255,.4);">= 1.43:1</span></div>';
    h += '<div style="display:flex;align-items:center;gap:4px;">';
    h += '<svg width="12" height="12"><circle cx="6" cy="6" r="4" fill="#94a3b8" stroke="rgba(0,0,0,.5)" stroke-width="1.5"/></svg>';
    h += '<span style="font-size:12px;color:rgba(255,255,255,.4);">= 1.90:1</span></div>';
    h += '</div></div>';
    return h;
  }

  function buildDetailPanel(v) {
    var type = projectorType(v), col = COLORS[type], w = screenWidth(v.screen);
    var h = '<div style="background:rgba(0,0,0,.4);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:16px;margin-bottom:12px;">';
    // header
    h += '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;"><div>';
    h += '<div style="font-size:11px;color:' + col + ';letter-spacing:.1em;font-weight:600;margin-bottom:4px;">' + type.toUpperCase() + '</div>';
    h += '<h3 style="font-size:15px;font-weight:700;color:#fff;margin:0 0 4px;line-height:1.3;">' + esc(v.name) + '</h3>';
    h += '<div style="font-size:13px;color:rgba(255,255,255,.4);">' + esc(v.city) + ', California</div>';
    h += '</div>';
    h += '<button data-close-detail style="width:26px;height:26px;border-radius:6px;background:rgba(200, 20, 40, 0.15);border:1px solid rgba(255,20,40,.3);color:rgba(255,20,40,.5);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0;">x</button>';
    h += '</div>';
    // note
    if (v.note) {
      h += '<p style="font-size:12px;color:rgba(255,255,255,.6);font-style:italic;line-height:1.4;margin:0 0 12px;padding:8px 10px;background:rgba(0,0,0,.3);border-radius:6px;border-left:2px solid ' + col + ';">' + esc(v.note) + '</p>';
    }
    // screen bar
    if (v.screen) {
      h += '<div style="margin-bottom:12px;">';
      h += '<div style="font-size:11px;color:rgba(255,255,255,.35);letter-spacing:.1em;margin-bottom:5px;">SCREEN</div>';
      h += '<div style="height:5px;border-radius:3px;background:rgba(255,255,255,.08);overflow:hidden;margin-bottom:5px;">';
      h += '<div style="height:100%;width:' + Math.min(w / 30 * 100, 100) + '%;border-radius:3px;background:linear-gradient(90deg,' + col + '88,' + col + ');"></div></div>';
      h += '<span style="font-size:14px;font-weight:700;color:#fff;">' + esc(v.screen) + '</span></div>';
    }
    // grid
    h += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:12px;">';
    [["ASPECT", v.ar, "#fff"], ["PROJECTOR", type, "#fff"], ["CHAIN", getChain(v), CHAIN_COLORS[getChain(v)] || "#fff"]].forEach(function (item) {
      h += '<div style="background:rgba(255,255,255,.04);border-radius:6px;padding:8px 10px;border:1px solid rgba(255,255,255,.08);">';
      h += '<div style="font-size:10px;color:rgba(255,255,255,.3);letter-spacing:.1em;margin-bottom:3px;">' + item[0] + '</div>';
      h += '<div style="font-size:13px;font-weight:600;color:' + item[2] + ';">' + esc(item[1]) + '</div></div>';
    });
    h += '</div>';
    // digital/film
    if (v.digital) {
      h += '<div style="padding:10px 12px;border-radius:7px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);margin-bottom:7px;">';
      h += '<div style="font-size:10px;color:#26c6da;letter-spacing:.08em;margin-bottom:3px;">DIGITAL</div>';
      h += '<div style="font-size:13px;font-weight:600;color:#fff;">' + esc(v.digital) + '</div></div>';
    }
    if (v.film) {
      h += '<div style="padding:10px 12px;border-radius:7px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);">';
      h += '<div style="font-size:10px;color:#fb7185;letter-spacing:.08em;margin-bottom:3px;">FILM</div>';
      h += '<div style="font-size:13px;font-weight:600;color:#fff;">' + esc(v.film) + '</div></div>';
    }
    h += '</div>';
    return h;
  }

  function buildSidebar(sorted) {
    var h = '<div class="imax-sidebar">';
    h += state.sel ? buildDetailPanel(state.sel) : buildLegend();
    // list header
    h += '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px 6px;border-bottom:1px solid rgba(255,255,255,.08);">';
    h += '<span style="font-size:11px;color:rgba(255,255,255,.4);letter-spacing:.08em;">' +
      (state.zoom.key === "full" ? "ALL VENUES" : state.zoom.label.toUpperCase()) + '</span>';
    h += '<span style="font-size:11px;color:rgba(255,255,255,.3);">' + sorted.length + ' venue' + (sorted.length !== 1 ? 's' : '') + '</span></div>';
    // list
    h += '<div class="imax-venue-list">';
    sorted.forEach(function (v) { h += buildVenueRow(v); });
    h += '</div></div>';
    return h;
  }

  /* ===== RENDER ===== */
  function render() {
    var shown = getShown();
    var sorted = getSorted(shown);
    var inRegion = shown.filter(function (v) { return venueInRegion(v, state.zoom); });
    var viewBox = computeViewBox(state.zoom);
    var zScale = computeZoomScale(state.zoom);

    var app = document.getElementById('cali-imax-app');
    var h = buildHeader(inRegion.length);
    h += buildFilters();
    h += '<div class="imax-layout">';
    h += buildMap(shown, viewBox, zScale);
    h += buildSidebar(sorted);
    h += '</div>';
    app.innerHTML = h;

    if (state.sel) {
      applyActiveClass(state.sel.id);
      updateCrosshair(state.sel);
    }
  }

  /* ===== HOVER / ACTIVE HANDLING ===== */
  function applyActiveClass(vid) {
    document.querySelectorAll('[data-vid="' + vid + '"]').forEach(function (el) {
      el.classList.add('active');
    });
  }

  function clearHoverClasses() {
    document.querySelectorAll('.venue-pin.active:not(.selected), .venue-row.active:not(.selected)').forEach(function (el) {
      el.classList.remove('active');
    });
  }

  function updateCrosshair(venue) {
    var line = document.getElementById('imax-crosshair');
    if (!line) return;
    if (!venue) { line.setAttribute('opacity', '0'); return; }
    var xy = toXY(venue.lat, venue.lng);
    line.setAttribute('x1', xy[0]);
    line.setAttribute('y1', xy[1]);
    line.setAttribute('x2', xy[0]);
    line.setAttribute('y2', 0);
    line.setAttribute('stroke', COLORS[projectorType(venue)]);
    line.setAttribute('opacity', '.15');
  }

  function showHoverCard(venue) {
    var card = document.getElementById('imax-hover-card');
    if (!card || !venue) return;
    var viewBox = computeViewBox(state.zoom);
    var parts = viewBox.split(' ');
    var vbX = parseFloat(parts[0]), vbY = parseFloat(parts[1]), vbW = parseFloat(parts[2]), vbH = parseFloat(parts[3]);
    var xy = toXY(venue.lat, venue.lng);
    var pctX = ((xy[0] - vbX) / vbW) * 100;
    var pctY = ((xy[1] - vbY) / vbH) * 100;
    var flipX = pctX > 55;
    var type = projectorType(venue);

    card.style.display = 'block';
    card.style.left = flipX ? 'auto' : (pctX + 2) + '%';
    card.style.right = flipX ? (100 - pctX + 2) + '%' : 'auto';
    card.style.top = (pctY - 1) + '%';

    card.innerHTML =
      '<div style="font-size:14px;font-weight:700;color:#fff;margin-bottom:3px;line-height:1.3;">' + esc(venue.name) + '</div>' +
      '<div style="font-size:12px;color:rgba(255,255,255,.4);margin-bottom:8px;">' + esc(venue.city) + '</div>' +
      '<div style="display:flex;gap:5px;flex-wrap:wrap;">' +
      pill(COLORS[type], type) +
      pill(venue.ar.indexOf('1.43') >= 0 ? '#a78bfa' : '#6c757d', venue.ar) +
      pill(CHAIN_COLORS[getChain(venue)] || '#6c757d', getChain(venue)) +
      (venue.film ? pill('#fb7185', 'Film') : '') +
      '</div>' +
      (venue.screen ? '<div style="margin-top:6px;font-size:12px;color:rgba(255,255,255,.5);">' + esc(venue.screen) + '</div>' : '');
  }

  function hideHoverCard() {
    var card = document.getElementById('imax-hover-card');
    if (card) card.style.display = 'none';
  }

  /* ===== EVENTS ===== */
  function setupEvents() {
    var app = document.getElementById('cali-imax-app');
    var currentHoverId = null;

    app.addEventListener('click', function (e) {
      var el;
      if ((el = e.target.closest('[data-filter]'))) {
        state.filt = el.dataset.filter;
        state.sel = null;
        render();
        return;
      }
      if ((el = e.target.closest('[data-chain]'))) {
        state.chain = el.dataset.chain;
        state.sel = null;
        render();
        return;
      }
      if ((el = e.target.closest('[data-zoom]'))) {
        var zk = el.dataset.zoom;
        for (var i = 0; i < ZOOM_REGIONS.length; i++) {
          if (ZOOM_REGIONS[i].key === zk) { state.zoom = ZOOM_REGIONS[i]; break; }
        }
        state.sel = null;
        currentHoverId = null;
        render();
        return;
      }
      if ((el = e.target.closest('[data-close-detail]'))) {
        state.sel = null;
        render();
        return;
      }
      if ((el = e.target.closest('[data-vid]'))) {
        var vid = parseInt(el.dataset.vid);
        if (state.sel && state.sel.id === vid) {
          state.sel = null;
        } else {
          state.sel = findVenue(vid);
        }
        currentHoverId = null;
        render();
        return;
      }
    });

    app.addEventListener('mouseover', function (e) {
      var el = e.target.closest('[data-vid]');
      if (!el) return;
      var vid = el.dataset.vid;
      if (vid === currentHoverId) return;
      clearHoverClasses();
      hideHoverCard();
      currentHoverId = vid;
      var venue = findVenue(parseInt(vid));
      if (!venue) return;
      state.hov = venue;
      applyActiveClass(venue.id);
      if (!state.sel) {
        updateCrosshair(venue);
        showHoverCard(venue);
      }
    });

    app.addEventListener('mouseout', function (e) {
      var el = e.target.closest('[data-vid]');
      if (!el) return;
      var related = e.relatedTarget;
      var relatedVenue = related && related.closest ? related.closest('[data-vid]') : null;
      if (relatedVenue && relatedVenue.dataset.vid === el.dataset.vid) return;
      clearHoverClasses();
      hideHoverCard();
      currentHoverId = null;
      state.hov = null;
      if (!state.sel) updateCrosshair(null);
    });
  }

  /* ===== INIT ===== */
  document.addEventListener('DOMContentLoaded', function () {
    render();
    setupEvents();
  });
})();
