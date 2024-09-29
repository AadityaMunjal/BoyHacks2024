async function handleRequest(){
    if (event) event.preventDefault();
    console.log("Button clicked!");
    
    
    let userSong = document.getElementById('userSong').value; //change hardcoded value in HTML later
    let userArtist = document.getElementById('userArtist').value; //change hardcoded value in HTML later

    if (!userSong || !userArtist) {
      alert("Please enter both a song title and an artist!");
      return;
    }
    
    let lyrics = await fetch(`https://private-anon-943d09b474-lyricsovh.apiary-proxy.com/v1/${encodeURIComponent(userArtist)}/${encodeURIComponent(userSong)}`)
    .then((response) => response.json())
    .then((json) => json.lyrics) //returns the thingy
    //.then((json) => console.log(json));

    //const str = "this is a test string test";
    const cleanLyrics = lyrics.replace(/[\r\n]+|\\n/g, ' ')
    .replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()'"]/g, '')
    .toLowerCase();

    const lyricsArray = new Array(cleanLyrics.split(" "));
    console.log(lyricsArray);  // output: set { 'this', 'is', 'a', 'test', 'string' }

    //badWordsArray = lookBadWords();
    const words = ["ass", "bitch", "bitcher", "bitches", "bitchez", "bitchin", "bitching", "bitchslap", "bitchy", "biteme", "black", "blackman", "blackout", "blacks", "blind", "blow", "blowjob", "boang", "bogan", "bohunk", "bollick", "bollock", "bomb", "bombers", "bombing", "bombs", "bomd", "bondage", "boner", "bong", "boob", "boobies", "boobs", "booby", "boody", "boom", "boong", "boonga", "boonie", "booty", "bootycall", "bountybar", "bra", "brea5t", "breast", "breastjob", "breastlover", "breastman", "brothel", "bugger", "buggered", "buggery", "bullcrap", "bulldike", "bulldyke", "bullshit", "bumblefuck", "bumfuck", "butchdike", "butchdyke", "butt", "buttbang", "butt-bang", "buttface", "buttfuck", "butt-fuck", "buttfucker", "butt-fucker", "buttfuckers", "butt-fuckers", "butthead", "buttman", "buttmunch", "buttmuncher", "buttpirate", "buttplug", "buttstain", "byatch", "cacker", "cameljockey", "cameltoe", "canadian","cock", "cockblock", "cockblocker", "cockcowboy", "cockfight", "cockhead", "cockknob", "cocklicker", "cocklover", "cocknob", "cockqueen", "cockrider", "cocksman", "cocksmith", "cocksmoker", "cocksucer", "cocksuck ", "cocksucked ", "cocksucker", "cocksucking", "cocktail", "cocktease", "cocky", "cohee", "coitus", "color", "colored", "coloured", "commie", "communist", "condom", "conservative", "conspiracy", "coolie", "cooly", "coon", "coondog", "copulate", "cornhole", "corruption", "cra5h", "crabs", "crack", "crackpipe", "crackwhore", "crack-whore", "crap", "crapola", "crapper", "crappy", "crash", "creamy", "crime", "crimes", "criminal", "criminals", "crotch", "crotchjockey", "crotchmonkey", "crotchrot", "cum", "cumbubble", "cumfest", "cumjockey", "cumm", "cummer", "cumming", "cumquat", "cumqueen", "cumshot", "cunilingus", "cunillingus", "cunn", "cunnilingus", "cunntt", "cunt", "cunteyed", "cuntfuck", "cuntfucker", "cuntlick ", "cuntlicker ", "cuntlicking ", "cuntsucker", "cybersex","devilworshipper", "dick", "dickbrain", "dickforbrains", "dickhead", "dickless", "dicklick", "dicklicker", "dickman", "dickwad", "dickweed", "diddle", "die", "died", "dies", "dike", "dildo", "dingleberry", "dink", "dipshit", "dipstick", "dirty", "disease", "diseases", "disturbed", "dive", "dix", "dixiedike", "dixiedyke", "doggiestyle", "doggystyle", "dong", "doodoo", "doo-doo", "doom", "dope", "dragqueen", "dragqween", "dripdick", "drug", "drunk", "drunken", "dumb", "dumbass", "dumbbitch", "dumbfuck", "dyefly", "dyke", "easyslut", "eatballs", "eatme", "eatpussy", "ecstacy", "ejaculate", "ejaculated", "ejaculating ", "ejaculation", "enema", "enemy", "erect", "erection", "ero", "escort", "ethiopian", "ethnic", "european", "evl", "excrement", "execute", "executed", "execution", "executioner", "explosion", "facefucker", "faeces", "fag", "fagging", "faggot", "fagot", "failed", "failure", "fairies", "fairy", "faith", "fannyfucker", "fart", "farted ", "farting ", "farty ", "fastfuck", "fraud", "freakfuck", "freakyfucker", "freefuck", "fu", "fubar", "fuc", "fucck", "fuck", "fucka", "fuckable", "fuckbag", "fuckbuddy", "fucked", "fuckedup", "fucker", "fuckers", "fuckface", "fuckfest", "fuckfreak", "fuckfriend", "fuckhead", "fuckher", "fuckin", "fuckina", "fucking", "fuckingbitch", "fuckinnuts", "fuckinright", "fuckit", "fuckknob", "fuckme ", "fuckmehard", "fuckmonkey", "fuckoff", "fuckpig", "fucks", "fucktard", "fuckwhore", "fuckyou", "fudgepacker", "fugly", "fuk", "fuks", "funeral", "funfuck", "fungus", "fuuck", "gangbang", "gangbanged ", "gangbanger", "gangsta", "gatorbait", "gay", "gaymuthafuckinwhore", "gaysex ", "geez", "geezer", "geni", "genital", "german", "getiton", "gin", "ginzo", "gipp", "girls", "givehead", "glazeddonut", "gob", "god", "godammit", "goddamit", "goddammit", "goddamn", "goddamned", "goddamnes", "goddamnit", "goddamnmuthafucker", "goldenshower", "gonorrehea", "gonzagas", "gook", "gotohell", "goy", "goyim", "greaseball", "gringo", "groe", "gross", "grostulation", "gubba", "gummer", "gun", "gyp", "gypo", "gypp", "gyppie", "gyppo", "gyppy", "hamas", "handjob", "hapa", "harder", "hardon", "harem", "headfuck", "rimjob", "rimming", "roach", "robber", "roundeye", "rump", "russki", "russkie", "sadis", "sadom", "samckdaddy", "sandm", "sandnigger", "satan", "scag", "scallywag", "scat", "schlong", "screw", "screwyou", "scrotum", "scum", "semen", "seppo", "servant", "sex", "sexed", "sexfarm", "sexhound", "sexhouse", "sexing", "sexkitten", "sexpot", "sexslave", "sextogo", "sextoy", "sextoys", "sexual", "sexually", "sexwhore", "sexy", "sexymoma", "sexy-slim", "shag", "shaggin", "shagging", "shat", "shav", "shawtypimp", "sheeney", "shhit", "shinola", "shit", "shitcan", "shitdick", "shite", "shiteater", "shited", "shitface", "shitfaced", "shitfit", "shitforbrains", "shitfuck", "shitfucker", "shitfull", "shithapens", "shithappens", "shithead", "shithouse", "shiting", "shitlist", "shitola", "shitoutofluck", "shits", "shitstain", "shitted", "shitter", "shitting", "shitty ", "shoot", "shooting", "shortfuck", "showtime", "sick", "sissy", "sixsixsix", "sixtynine", "sixtyniner", "skank", "skankbitch", "skankfuck", "skankwhore", "skanky", "skankybitch", "skankywhore", "skinflute", "skum", "skumbag", "slant", "slanteye", "slapper", "slaughter", "slav", "slave", "slavedriver", "sleezebag", "sleezeball", "slideitin", "slime", "slimeball", "slimebucket", "slopehead", "slopey", "slopy", "slut", "sluts", "slutt", "slutting", "slutty", "slutwear", "slutwhore", "smack", "smackthemonkey", "smut", "snatch", "snatchpatch", "snigger", "sniggered", "sniggering", "sniggers", "snigger's", "sniper", "snot", "turd", "turnon", "twat", "twink", "twinkie", "twobitwhore", "uck", "uk", "unfuckable", "upskirt", "uptheass", "upthebutt", "urinary", "urinate", "urine", "usama", "uterus", "vagina", "vaginal", "vatican", "vibr", "vibrater", "vibrator", "vietcong", "violence", "virgin", "virginbreaker", "vomit", "vulva", "wab", "wank", "wanker", "wanking", "waysted", "weapon", "weenie", "weewee", "welcher", "welfare", "wetb", "wetback", "wetspot", "whacker", "whash", "whigger", "whiskey", "whiskeydick", "whiskydick", "whit", "whitenigger", "whites", "whitetrash", "whitey", "whiz", "whop", "whore", "whorefucker", "whorehouse", "wigger", "willie", "williewanker", "willy", "wn", "wog", "women's", "wop", "wtf", "wuss", "wuzzie", "xtc", "xxx", "yankee", "yellowman", "zigabo", "zipperhead"];
    badWordsArray = words;
    badWordsCounter = countWordOccurrences(lyricsArray, badWordsArray);
    console.log("hello" + badWordsCounter);
    badWordPercent =((badWordsCounter / lyricsArray.length) * 100);
    console.log(badWordPercent);

    //location.reload();

    

}

async function lookBadWords() {

    // create a frequency map for words in array1
    try {
        const response = await fetch(`https://www.cs.cmu.edu/~biglou/resources/bad-words.txt`)
        const text = await response.text();
        const badWordsArray = text.split(/\s+/);  // split the text into words by whitespace
        console.log(badWordsArray);  // output the array of words
        return badWordsArray; // return
    } catch(error) {
        console.error('Error fetching the file:', error);
        return[];
    }

}

async function countWordOccurrences(array1, array2) {
  // Helper function to perform binary search
  const binarySearch = (arr, target) => {
      let left = 0;
      let right = arr.length - 1;

      while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          if (arr[mid] === target) {
              return true; // Found the word
          } else if (arr[mid] < target) {
              left = mid + 1; // Search in the right half
          } else {
              right = mid - 1; // Search in the left half
          }
      }
      return false; // Not found
  };

  // Count occurrences of each word in array1 found in array2
  let totalCount = 0;

  array1.forEach(word => {
      if (binarySearch(array2, word)) { // Search in the sorted array2
          totalCount += 1; // Increment count for each bad word found
      }
  });

  return totalCount;
}


    
















