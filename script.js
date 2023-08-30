function compareJson() {
    var file1 = document.getElementById("jsonFile1").files[0];
    var file2 = document.getElementById("jsonFile2").files[0];
  
    if (file1 && file2) {
      var reader1 = new FileReader();
      var reader2 = new FileReader();
  
      reader1.onload = function(e1) {
        var json1 = JSON.parse(e1.target.result.trim());
  
        reader2.onload = function(e2) {
          var json2 = JSON.parse(e2.target.result.trim());
  
          var differences = findDifferences(json1, json2);
  
          var differencesElement = document.getElementById("differences");
          differencesElement.innerHTML = "";
  
          if (differences.length === 0) {
            differencesElement.innerHTML = "<p>No differences found.</p>";
          } else {
            for (var i = 0; i < differences.length; i++) {
              differencesElement.innerHTML += "<p><strong>Key:</strong> " + differences[i].key + "<br/><strong>JSON 1:</strong> " + differences[i].value1 + "<br/><strong>JSON 2:</strong> " + differences[i].value2 + "</p>";
            }
          }
        };
  
        reader2.readAsText(file2);
      };
  
      reader1.readAsText(file1);
    } else {
      alert("Please select two JSON files for comparison.");
    }
  }
  
  function findDifferences(obj1, obj2, currentKey = "", differences = []) {
    for (var key in obj1) {
      var obj1key = obj1[key];
      var obj2key = obj2[key];
  
      if (!(obj2.hasOwnProperty(key))) {
        differences.push({ key: currentKey + key, value1: obj1key, value2: null });
      } else if (typeof obj1key === "object" && typeof obj2key === "object") {
        findDifferences(obj1key, obj2key, currentKey + key + ".", differences);
      } else if (obj1key !== obj2key) {
        differences.push({ key: currentKey + key, value1: obj1key, value2: obj2key });
      }
    }
    
    for (var key2 in obj2) {
      var obj1key2 = obj1[key2];
      var obj2key2 = obj2[key2];
      
      if (!(obj1.hasOwnProperty(key2))) {
        differences.push({ key: currentKey + key2, value1: null, value2: obj2key2 });
      }
    }
    
    return differences;
  }
  