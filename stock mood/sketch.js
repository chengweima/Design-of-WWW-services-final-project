var w = 1352;
var h = 1511;
let table_gme;
let table_amc;
let table_bbig;
let gmeButton;
let amcButton;
let bbigButton;
let gmeInfo;
let amcInfo;
let bbigInfo;
let nokInfo;
var counts = {};
var keys = [];
var stopwords = ['rt','m','stocks','co','https','i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now'];


function preload() {
  table_gme = loadTable('data/GME.csv', 'csv', 'header');
  table_amc = loadTable('data/AMC.csv', 'csv', 'header');
  table_bbig = loadTable('data/BBIG.csv', 'csv', 'header');
  profile_icon = loadImage('data/user.png');
  triangle_icon = loadImage('data/triangle.png');
}


function updatePerformance(){
  var gme_url = 'https://finnhub.io/api/v1/quote?symbol=GME&token=c6egtdiad3ie37m18omg';
  var amc_url = 'https://finnhub.io/api/v1/quote?symbol=AMC&token=c6egtdiad3ie37m18omg';
  var bbig_url = 'https://finnhub.io/api/v1/quote?symbol=BBIG&token=c6egtdiad3ie37m18omg';
  var nok_url = 'https://finnhub.io/api/v1/quote?symbol=NOK&token=c6egtdiad3ie37m18omg';
  gmeInfo = loadJSON(gme_url);
  amcInfo = loadJSON(amc_url);
  bbigInfo = loadJSON(bbig_url);
  nokInfo = loadJSON(nok_url);
}


function setup() {
  // put setup code here
  createCanvas(w,h);
  updatePerformance();
  setInterval(updatePerformance, 10000);
  background('#2B2B2B');
  rect(30, 396, 1291, 1075);

  gmeButton = createButton("GME");
  gmeButton.style('font-size', '20px');
  gmeButton.style('color', '#ADADAD');
  gmeButton.style('border', 'none');
  gmeButton.style('background-color', '#000000');
  gmeButton.position(60,405);
  gmeButton.mousePressed(gmeSelected);

  amcButton = createButton("AMC");
  amcButton.style('font-size', '20px');
  amcButton.style('color', '#ADADAD');
  amcButton.style('border', 'none');
  amcButton.style('background-color', '#000000');
  amcButton.position(160,405);
  amcButton.mousePressed(amcSelected);

  bbigButton = createButton("BBIG");
  bbigButton.style('font-size', '20px');
  bbigButton.style('color', '#ADADAD');
  bbigButton.style('border', 'none');
  bbigButton.style('background-color', '#000000');
  bbigButton.position(260,405);
  bbigButton.mousePressed(bbigSelected);

  gmeSelected();

}


function replace_stopwords(stopwords,word) {
  var new_word;
  if (stopwords.includes(word)){
    new_word = "1";
  } else {
    new_word = word;
  }
  return new_word;
}


function sentiment(table) {
  var sentences;
  // display wordcloud
  for (let i = 0; i < table.getRowCount(); i++) {
    sentence = table.getString(i, 2);
    sentences = sentences + sentence;
    }

  var tokens = sentences.split(/\W+/);
  for (let j = 0; j < tokens.length; j++) {
    var word = tokens[j].toLowerCase();
    var word2 = replace_stopwords(stopwords,word);
    if (!/\d+/.test(word2)) {
      if (counts[word2] === undefined) {
        counts[word2] = 1;
        keys.push(word2);
      } else {
        counts[word2] = counts[word2] + 1;
      }
    }
  }

  keys.sort(compare);
  // draw word frequency
  fill('#FFFFFF');
  textSize(25);
  text('Frequency', 60, 1010);
  for (let k = 0; k < 10; k++) {
    var key = keys[k];
    textSize(20);
    d = map(counts[key], 0, counts[keys[0]], 10, 500)
    fill('#FFFFFF');
    text(key, 60, 1050 + 40*k);
    text(counts[key], 150 + d, 1050 + 40*k);
    fill('#2699FB');
    rect(145, 1033 + 40*k, d, 20);
  }

  // draw word cloud
  fill('#FFFFFF');
  textSize(25);
  text('Word cloud', 60, 540);

  wordcloudSizeColor(counts[keys[0]], counts[keys[9]], counts[keys[0]]);
  text(keys[0], 300, 750);
  wordcloudSizeColor(counts[keys[1]], counts[keys[9]], counts[keys[0]]);
  text(keys[1], 580, 650);
  wordcloudSizeColor(counts[keys[2]], counts[keys[9]], counts[keys[0]]);
  text(keys[2], 100, 700);
  wordcloudSizeColor(counts[keys[3]], counts[keys[9]], counts[keys[0]]);
  text(keys[3], 110, 800);
  wordcloudSizeColor(counts[keys[4]], counts[keys[9]], counts[keys[0]]);
  text(keys[4], 130, 900);
  wordcloudSizeColor(counts[keys[5]], counts[keys[9]], counts[keys[0]]);
  text(keys[5], 300, 880);
  wordcloudSizeColor(counts[keys[6]], counts[keys[9]], counts[keys[0]]);
  text(keys[6], 250, 600);
  wordcloudSizeColor(counts[keys[7]], counts[keys[9]], counts[keys[0]]);
  text(keys[7], 600, 800);
  wordcloudSizeColor(counts[keys[8]], counts[keys[9]], counts[keys[0]]);
  text(keys[8], 500, 900);
  wordcloudSizeColor(counts[keys[9]], counts[keys[9]], counts[keys[0]]);
  text(keys[9], 450, 560);

}


function wordcloudSizeColor(value, min, max){
  c1 = map(value, min, max, 100, 255);
  s1 = map(value, min, max, 30, 90);
  textSize(s1);
  fill(c1, c1, c1);
}


function compare(a, b){
  var countA = counts[a];
  var countB = counts[b];
  return countB - countA;
}


function hotdiscussion(table) {
  clear();
  background('#2B2B2B');
  fill('#000000');
  rect(30, 396, 1291, 1075);

  // display tweet
  for (let i = 0; i < 5; i++) {
    textSize(30);
    fill('#FFFFFF');
    r = int(random(0, table.getRowCount()));
    name = table.getString(r, 1);
    text(name, 860, 550 + i*190); // user name
    image(profile_icon, 800, 525 + i*190, 50, 50); // profile

    textSize(20); // content
    fill('#ADADAD');
    tweet = table.getString(r, 2);
    text(tweet, 860, 575 + i*190, 400, 100);
    }

}


function gmeSelected(){
  hotdiscussion(table_gme);
  counts = {};
  keys = [];
  sentiment(table_gme);
  gmeButton.style('color', '#2699FB');
  amcButton.style('color', '#ADADAD');
  bbigButton.style('color', '#ADADAD');
  image(triangle_icon, 80, 430, 18, 18);
}


function amcSelected(){
  hotdiscussion(table_amc);
  counts = {};
  keys = [];
  sentiment(table_amc);
  amcButton.style('color', '#2699FB');
  gmeButton.style('color', '#ADADAD');
  bbigButton.style('color', '#ADADAD');
  image(triangle_icon, 178, 430, 18, 18);
}


function bbigSelected(){
  hotdiscussion(table_bbig);
  counts = {};
  keys = [];
  sentiment(table_bbig);
  bbigButton.style('color', '#2699FB');
  gmeButton.style('color', '#ADADAD');
  amcButton.style('color', '#ADADAD');
  image(triangle_icon, 280, 430, 18, 18);
}


function priceColor(chg){
  if (chg > 0){
    fill('#5D8C50');
  } else if (chg = 0) {
    fill('#FFFFFF');
  } else {
    fill('#EC3737');
  }
}


function draw() {
  //header
  fill('#000000');
  rect(0, 0, 1352, 129);
  fill('#FFFFFF');
  textFont('Cambria');
  textSize(60);
  text('Stock Mood',60,80);

  //what's hot
  fill('#000000');
  rect(30, 159, 1291, 207);
  fill('#FFFFFF');
  textFont('Arial');
  textSize(30);
  text("What's hot", 60, 200);
  textSize(20);
  fill('#ADADAD')
  text("Symbol", 82, 240); text("Stock Name", 187, 240); text("Latest Price", 400, 240); text("%Chg", 580, 240);
  text("Symbol", 742, 240); text("Stock Name", 847, 240); text("Latest Price", 1060, 240); text("%Chg", 1240, 240);
  fill('#FFFFFF');
  text("1. AMC", 60, 285); text("AMC Entertainment", 187, 285);
  text("2. GME", 60, 330); text("Game Stop", 187, 330);
  text("3. BBIG", 720, 285); text("Vinco Ventures Inc", 847, 285);
  text("4. NOK", 720, 330); text("Nokia", 847, 330);

  textAlign(RIGHT);
  priceColor(float(amcInfo.dp));
  text(float(amcInfo.c).toFixed(2), 505, 285); text(float(amcInfo.dp).toFixed(2) + "%", 635, 285);
  priceColor(float(gmeInfo.dp));
  text(float(gmeInfo.c).toFixed(2), 505, 330); text(float(gmeInfo.dp).toFixed(2) + "%", 635, 330);
  priceColor(float(bbigInfo.dp));
  text(float(bbigInfo.c).toFixed(2), 1162, 285); text(float(bbigInfo.dp).toFixed(2) + "%", 1295, 285);
  priceColor(float(nokInfo.dp));
  text(float(nokInfo.c).toFixed(2), 1162, 330); text(float(nokInfo.dp).toFixed(2) + "%", 1295, 330);

  //sentiment and hot discussion
  textAlign(LEFT);
  stroke('#6C6C6C')
  line(30, 435, 1321, 435);
  noStroke();
  fill('#FFFFFF');
  textFont('Arial');
  textSize(30);
  text("Sentiment Analysis", 60, 490); //title
  text("Hot discussion", 800, 490);
}
