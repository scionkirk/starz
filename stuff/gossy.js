function Gossy() {

    function rnd_snd() {
        return (Math.random()*2-1)+(Math.random()*2-1)+(Math.random()*2-1);
    }

    rnd = function(mean, stdev) {
        return Math.round(rnd_snd()*stdev+mean);
    }
    
}

/*

<cfscript>
	
	buckNum = 25;
	origMatter = 2000;
	randPrecision = 10;
	matter = origMatter;
	mean = buckNum/2;
	stdev = buckNum/5;
	buckets = [];
	for (i = 1; i <= buckNum; i++) {
		buckets[i] = 0;
	}
	
	for (x = 1; x <= matter; x++) {
		thisNum = 0;
		r = 0;
		while (thisNum lt 1 or thisNum gt buckNum) {
			for (t = 1; t<= randPrecision; t++) {
				r = r + (randRange(-1000,1000)/1000);
			}
			thisNum = r*stdev+mean;
		}
		buckets[round(thisNum)] = buckets[round(thisNum)] + 1;
	
	}

	
</cfscript>
<cfoutput>
<table>
	<cfloop from="1" to="#buckNum#" index="i">
	<tr>
		
		<td>#i#</td>
		<td>
        	#buckets[i]#
		</td>
		<td>
        	#repeatString('|',buckets[i])#
		</td>
	
	</tr>
</cfloop>
</table>
</cfoutput>

*/