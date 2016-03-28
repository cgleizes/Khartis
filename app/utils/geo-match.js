  let NAME_KEYS = ["iso_a2",
                    "iso_a3",
                    "name_EN",
                    "name_short_EN",
                    "name_sort_EN",
                    "abbrev",
                    "name_formal_EN",
                    "name_ISO_EN",
                    "name_ISO_FR",
                    "name_WB",
                    "name_UN_EN",
                    "name_UN_FR",
                    "name_UN_ES",
                    "name_UN_RU",
                    "name_UN_CN",
                    "name_UN_AR"
                   ];

let _cache = {},
    _find = function(str) {
      
      let strEq = (s1, s2) => {
  
        return s1 && s2 && s1.toLowerCase().trim() === s2.toLowerCase().trim();
        
      };
      
      let dic = geoMatch.dic,
          key = str,
          o = _cache[key] >= 0 ? dic[_cache[key]] : undefined;
      
      if (o === undefined) {
      
        for (let i = 0; i < dic.length; i++) {
          if (NAME_KEYS.some( (k) => strEq(dic[i][k], str) )) {
            _cache[key] = i;
            o = dic[i];
            break;
          }
        }
        
      } else {
        console.log("cached");
      }
      
      return o;
      
    };

function geoMatch(code) {
  
  if (code && code.length > 0) {
    
    let o = _find(code);
    if (o !== undefined) {
      
      let type;
          
      if (o.iso_a2.toLowerCase() === code.toLowerCase()) {
        type = "iso2";
      } else if (o.iso_a3.toLowerCase() === code.toLowerCase()) {
        type = "iso3";
      } else {
        type = "isoname";
      }
      
      return {
        type: type,
        value: o
      };
    }
  }
  
  return false;
}

geoMatch.dic = [];

export {NAME_KEYS, geoMatch};
