var names = require('./starname.json');
var _ = require('underscore');
var starnames = [];
var slotNum = 10;
var starTypes = ['Red','Orange','Yellow','Blue','White','Neutron','Black Hole'];
var starAges = ['Base','Young','Mature','Ancient'];
var ageStarBonus = {    'Base':     [30,40,50,40,30, 0, 0],
                        'Young':    [10,20, 0, 0, 0, 0, 0],
                        'Mature':   [ 0, 0,10, 0, 0,10,10],
                        'Ancient':  [ 0, 0, 0,10,10,20,20] };
                        
var PlanetSizes = ['None','Asteroid Field','Planetoid','Small','Medium','Large','Massive','Gas Giant'];
var planetDensity = { 'Low'     : [70,  0,  0,  0,  0,  0,  0,  0],
                'Average'       : [50,  0,  0,  0,  0,  0,  0,  0],
                'High'          : [30,  0,  0,  0,  0,  0,  0,  0]};

var planetSizeOdds = { 'Blue' : [  0,  0,  0,  0,  0,  0,  0,  0],
                'White' :       [  0,  0,  0,  0,  0,  0,  0,  0],
                'Yellow':       [  0,  0,  0,  0,  0,  0,  0,  0],
                'Orange' :      [  0,  0,  0,  0,  0,  0,  0,  0],
                'Red':          [  0,  0,  0,  0,  0,  0,  0,  0],
                'Neutron' :     [  5, 20,  5,  0,  0,  0,  0,  0],
                'Black Hole':   [ 30, 10,  0,  0, -5, -5, -5, -5],
                'Slot 1':       [ 10,  0, 15, 20, 10,  0,  0,-80],
                'Slot 2':       [  5,  0, 10, 15, 20,  5,  0,-70],
                'Slot 3':       [  0,  0,  5, 10, 30, 10,  5,-60],
                'Slot 4':       [  0, 10,  5, 10, 30, 10,  5,-30],
                'Slot 5':       [  0, 25,  5, 10, 20, 15, 10,  0],
                'Slot 6':       [  0, 10,  5,  5,  5, 20, 15, 30],
                'Slot 7':       [  0,  5,  5,  5,  5, 15, 10, 30],
                'Slot 8':       [  0,  5, 10, 10,  5, 10,  5, 30],
                'Slot 9':       [  5,  5, 15, 10,  5,  5,  5, 30],
                'Slot 10':      [ 10,  5, 20, 10,  0,  0,  0, 10]};


var environments = [         'Terran','Ocean','Swamp','Toxic','Inferno','Radiated','Barren','Tundra','Desert','Gaian'];
var envs = {  'Planetoid' :	[  0,       0,      0,      0,      0,        10,         20,     0,        0,      -20],
                  'Asteroid Field' :	[  -100,  -100,  -100,  -100,  -100, -40, 0,  -50,  -100,-100],
                  'Small' :	[  0,  0,  0,  0,  0, 10, 10,  0,  0,-10],
                  'Medium':	[ 10, 10,  5,  0,  0,  0,  0,  5,	 5,  0],
                  'Large' :	[  0,  0,  0, 10, 10,  0,  0,  0,  0,-10],
                'Massive' :	[  0,  0,  0,	10, 10,  0,  0,  0,  0,-20],
                 'Slot 1' :	[ -5,	-5,	 0,  5,	20,	30,	15,-20,	15,-50],
                 'Slot 2' :	[ 10,	10,	20,	15,	20,	10,	10,-10,	20,-40],
                 'Slot 3' :	[ 30,	25,	10,	 0,  5,	 0,	 0,  0, 15,-40],
                 'Slot 4' :	[ 25,	25,	 0,  0,	 0,  0,	 0,	 5,	10,-40],
                 'Slot 5' :	[ 10,	10,	 5,	 5,	 0,  0,  0,	 5,	 0, 40],
                 'Slot 6' :	[  5,	10,	 5,	10,	 0,  0,  5,	10,	 0,-40],
                 'Slot 7' :	[  0,  0,	 0,  0,	 0,  0, 10,	10,	 0,-40],
                 'Slot 8' :	[ -5,	-5,	-5,	 0, -5,	 0, 15,	10,	-5,-50],
                 'Slot 9' :	[-10,-10,-10,	-5,-10,-10,	20,	10,-10,-60],
                'Slot 10' :	[-20,-20,-20,-10,-20,-20,	25,	 5,-20,-70],
                   'Blue' :	[  0,	 0,  0,	10,	15,	20,	15,	 0,  5, -5],
                  'White' :	[  0,	 0,  5,	 5,	10,	 5,	10,	 0, 15,	 0],
                 'Yellow' :	[ 30,	25,	20,	 0,  0,	 0,  0,	 5,	20,	 0],
                 'Orange' :	[  0,	 5,	 5,	 5,	 0,	 0, 10,	10,	 0,  0],
                    'Red' :	[  0,	 0,  0,	10,  0,	 0, 20,	10,	 0, -5],
                'Neutron' :	[-30,-30,-10,	 5,	 5,	30,	20,	 0,  5,-10],
              'Black Hole':	[-30,-30,-10,-10,-10,	15,	30,	 0,-30,-15]};







/*


matrix of temp vs water
high water high temp = swamp
low water high temp = inferno
mid water high temp = desert
high water mid temp = ocean
mid water mid temp = terran
low water mid temp = arid
high water low temp = glacial
mid water low temp = tundra
low water low temp = icy rock
no water high temp = inferno
no water mid temp = barren
no water low temp = frozen rock



User Option	Low Density	70
Average Density	50
High Density	30
Star Color	Blackhole	30	 	 	-5	-5	-5	10	-5
Neutrino	5	5	 	 	 	 	20
Slot	Slot 1	10	15	20	10	 	 	 	-80
Slot 2	5	10	15	20	5	 	 	-70
Slot 3	 	5	10	30	10	5	 	-60
Slot 4	 	5	10	30	10	5	10	-30
Slot 5	 	5	10	20	15	10	25
Slot 6	 	5	5	5	20	15	10	30
Slot 7	 	5	5	5	15	10	5	30
Slot 8	 	10	10	5	10	5	5	30
Slot 9	5	15	10	5	5	5	5	30
Slot 10	10	20	10	 	 	 	5	10
Blue The hottest stars.
White Hotter than average, a very pale green, almost white.
Yellow The most common star in a mature galaxy. Average.
Orange Cooler than average, a vibrant orange.
Red Large cool stars.
Neutron The remains of a star from a supernova explosion. Often the location of rips in time-space.
Blackhole The event horizon surrounding a singularity formed from the collapse of a super-massive star. Often the location of wormholes leading to other areas of the map.


Star Types	 Blue  White Yellow	 Orange	 Red Neutron Blackhole
Base	     30    40	 50	     40	     30
Young	     10	   20
Mature	 	 	         10	 	 	         10	     10
Ancient	 	 	 	             10	     10	 20	     20


*/



bigBang = function(stars, age) {
    var starSystems = [];
//    starDist = getStarDistribution(1000);
    typeRange = getTypeRange(age);
    var total = arraySum(typeRange);
    for ( i = 0;i < stars;i++) {
        thisStar = getEasyStar(total, typeRange);
        thisStar['planets'] = getEasyPlanets(thisStar['type'], 'Average');
        starSystems[starSystems.length] = thisStar;
    }
    return starSystems;
}

getTypeRange = function(age) {
    baseRange = ageStarBonus['Base'];
    thisBonus = ageStarBonus[starAges[age]];
    return arrayMerge(baseRange, thisBonus);
}
 
arrayMerge = function(a1, a2) {
    newA = [];
	console.log(a1);
	console.log(a2);
    for (x = 0;x <a1.length;x++) {
        newA[x] = a1[x] + a2[x];
    }
    return newA;
}

arraySum = function(ary) {
  return ary.reduce(function(previousValue, currentValue, index, array){
  return previousValue + currentValue;
}, 0);
}

getEasyStar = function(total,typeRange) {
    thisNum = roll(total - 1) ;
    thisType = "";
    rt = 0;
    for (y = 0;y < typeRange.length; y++) {
        if (thisType.length === 0) {
           rt += typeRange[y];
            if (thisNum <= rt) thisType =  starTypes[y];
        }
    
    }
    return {'name': getName(), 'type': thisType};
}

pickOne = function(probabilities) {
    currIndx = 0;
    currVal = 0;
    for (y = 0;y < probabilities.length; y++) {
      thisNum = roll(100) + probabilities[y] ;
      if ( y === 0 || thisNum > currVal) {
        currIndx = y;
        currVal = thisNum
      }
    }
    return currIndx;
}



getEasyPlanets = function(starType, density) {
    console.log(starType + " : " + density);
	baseStats = planetDensity[density];
    starStats = planetSizeOdds[starType];
    planets = {};
    stats = arrayMerge(starStats,baseStats);
    for (e = 0; e < slotNum; e++) {
        n = e + 1
        key = "Slot " + n;
        console.log(key);
        value = planetSizeOdds[key];
        thisType = "";
        thisProb = arrayMerge(stats,value);
        thisOne = pickOne(thisProb);
        rt = 0;
        if (thisOne > 0){
            thisSize =  PlanetSizes[thisOne];
            
			/* eliminate Asteroid Fields and Gas Giants from getting environments */
			if (thisOne > 1 && thisOne < 7) {
                sizeProb = envs[thisSize];
                slotProb = envs[key];
                console.log(starType);
                starProb = envs[starType];
    console.log(thisSize + " : " + key + " : " + starType);
                envProb = arrayMerge(sizeProb,slotProb);
                envProb = arrayMerge(envProb,starProb);
                thisType = thisSize + " " + environments[pickOne(envProb)];
            } else {
                thisType = thisSize;
            }
            planets[key] = thisType;
        }
    }

  return planets;
  
}


roll = function(max) {
    return getRandomInt(0, max);
}

getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


getName = function() {
    hasName = true;
    thisName = "";
    letterLen = names.letters.length;
    constLen = names.constellations.length;
    insanity = letterLen * constLen;
    sanity = 0;
    while (hasName && insanity > sanity) {
        cnum = roll(constLen - 1) ;
        lnum = roll(letterLen - 1);
        c = names.constellations[cnum];
        l = names.letters[lnum];
        thisName = l + " " + c;
        sanity += 1;
        hasName = _.contains(starnames,thisName);
    }
    starnames[starnames.length] = thisName;
    return thisName;
}

createStar = function() {
    star = {
    stellar_class: "",
    mass: "",
    magnitude: "",
    emmission: "",
    age: "",
    ecosphere: "",
    greenhouse: ""};
    stellarClassCode = getStellarClassCode();

}
    
getStellarClassCode = function() {
    number = roll(99);
    //need to supply stellar class based on probability, not random
    

}

getStarDistribution = function(starNum) {
    stellarClasses = [];
	letrs = ['O','B','A','F','G','K','M'];
	for (i = 0; i < letrs.length; i ++) {
		for (x = 9; x >= 0;x--) {
			stellarClasses[stellarClasses.length] = letrs[i] + '' + x;
		}
	}
	buckNum = stellarClasses.length;
	matter = starNum;
	buckets = [];
	thisRnd = [];
	for (i = 0; i < buckNum; i++) {
		buckets[i] = 0;
	}
	while (Math.floor(matter) > 0)
	{
		for (i = 0; i < buckNum; i++) {
			if (matter > 0) {
				pct = getRandomInt(2,50);
				thisMatter = Math.round(matter/pct);
                buckets[i] += thisMatter;
				matter -= thisMatter;
			}
		}
	}
    buckets = _.sortBy(buckets,function(a){return a;});
    starDist = {};
    
    for (x = 0; x < buckNum; x++) {
        starDist[stellarClasses[x]] = buckets[x];
    }
        
    return starDist;

}

getStarStats = function(temp, radius) {
    var Tsun = 5780;
	var Msun = 4.75;
	var C1 = -3.684;
	var C2 = 14.551;
	var C3 = 0.344;
	var C4 = -3.402;
	var C5 = 8.037;
	var C6 = -8.499;
	var C7 = 13.421;
	var C8 = -8.131;
	var C9 = -3.901;
	var C10 = -0.438;
    var GREENHOUSE_EFFECT_CONST = .93;
	T = parseFloat(temp);
	R = parseFloat(radius);
	with (Math) {
		lLum = 2*log(R)/LN10 + 4*log(T/Tsun)/LN10;
		Lum = pow(10,lLum);
		lT = log(T)/LN10;
		lT4 = lT-4;
		BC = C6*pow(lT4,4)+C7*pow(lT4,3)+C8*pow(lT4,2)+C9*lT4+C10;
		if (lT <= 3.961) {
			CI = C1*lT+C2;
			}
		else    {
			CI = C3*lT*lT+C4*lT+C5;
			};
		Mbol = Msun - 2.5*(lLum);
		Mstar = Mbol - BC;
	    innerHZ = sqrt(Lum);
        outerHZ = innerHZ * GREENHOUSE_EFFECT_CONST;
    }
	returnVal = {Luminosity: Lum,
	'BolMag': Mbol,
	'Correction': BC,
	'ColorIndex': CI,
	'VMag': Mstar,
    'innerHZ': innerHZ,
    'outerHZ': outerHZ};
    return returnVal;
}

getOrbitalPeriod = function (orbitalRadius, body1, body2) {
    p = Math.sqrt((orbitalRadius*orbitalRadius*orbitalRadius)/(body1 + body2));
    return p;
}

module.exports.bigBang = bigBang;