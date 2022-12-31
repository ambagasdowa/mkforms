//As for grouping, if your checkbox "groups" were all siblings:
//```
//<div>
//    <input type="checkbox" />
//    <input type="checkbox" />
//    <input type="checkbox" />
//</div>
//<div>
//    <input type="checkbox" />
//    <input type="checkbox" />
//    <input type="checkbox" />
//</div>
//<div>
//    <input type="checkbox" />
//    <input type="checkbox" />
//    <input type="checkbox" />
//</div>
//```

//You could do this for jquery:

//$('input[type="checkbox"]').on("change", function () {
//  $('input[type="checkbox"]').not(this).prop("checked", false);
//});

// NOTE pure js
// based on using name tags (as with radio buttons) and a few lines of javascript.
// <input type="checkbox" name="check" onclick="onlyOne(this)">
// <input type="checkbox" name="check" onclick="onlyOne(this,tagname)">

function onlyOne(checkbox, tag) {
  let checkboxes = document.getElementsByName(tag);
  checkboxes.forEach((item) => {
    if (item !== checkbox) item.checked = false;
  });
}
