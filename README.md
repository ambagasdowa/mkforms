---
title: "Project MkForms"
author: "baizabal.jesus@gmail.com"
extensions:
  - image_ueberzug
  - qrcode
  - render
styles:
  style: solarized-dark
  table:
    column_spacing: 18
  margin:
    top: 0
    bottom: 0
  padding:
    top: 0
    bottom: 0
---

# MKFORMS

Html Forms Maker

# Zip File Structure

zip files are structured as follow:
under directory **pages** put your images in
![14](./images/pages_001.png "Directory Structure")

Inside into zip file

![14](./images/pages_002.png "Inside Zip file")

# Collaborate to this repo

- clone repo git clone repo
- create a new branch git checkout -b newFeature
- send a pull request

# Todo

## Sections

- Admininstrator
  - ✓ Draw BookPage directly to canvas object against draw img as div background
  - ✓ Add grid builder Option->Canvas : draw poligon and split in multiple poligons inside take a int as parameter [crucigramas , sopa de letras ...]
  - Draw properties window over a poligon for add options to box
    1. ✓ Add positions of the item
    1. ✓ send dpr and coeficent of dimension display for each item box[poligon]
    1. ✓ Detect when the mouse is over a poligon
    1. ✓ Delete poligon
    1. ✓ Clone poligon
    1. ✓ Clean canvas
    1. ✓ Set a page turn compatible for the admin module
    1. ✓ Build a reload method of canvas and get() data if exists for change to a new page
    1. ✓ Add Text Insert[Correct Answer and Notes insert ]
    1. ▢ ~~Add color option~~[optional]
    1. ▢ ~~Add Attributes~~ [placeholder,data1.x, etc]
  * ✓ Import an Answer module [Optional]
  * ▢ ~~Add a colorpicker~~[optional]
  * ▢ ~~Add a datepicker~~[optional]
  * ✓ Group checkboxes and options in control ribbon[initial set of boxes : n options -> create || select checkboxes and set a group]
  * ✓ Build the control panel ribbon
- View

  - ✓ Evaluator module : set a visual and textual[report] check for rigth answer
  - ✓ Fix in visual representation of a correct ,incorrect or empty answer
  - Internal
    1. ▢ Build an option for get the images from local or server source
    1. ✓ DragBar that's containt the control panel
  - UIX:
    1. ✓ Save Method by user
    1. ✓ Fix input redimension
    1. ✓ Add a zoom Engine
    1. ✓ Fix WebFonts on Webkit based Browsers
    1. ✓ Add a realtime reload response when save form in fusion
    1. ▢ Add keyboard controls
    1. ▢ Add digraps menu
    1. ▢ Add a relation option [drag and drop divs for set a value in input]
    1. ✓ Add a contextMenu Engine

- Canvas

  - ✓ Build Canvas Engine initial
  - ✓ Build events module and drawer[mouse events and draw in canvas the inputs and checkboxes items]
  - ✓ link to a database and build the mechanism to get() and post() data of items
  - ✓ Set perspective engine for display in multiple dimensions windows[dpr,perspectiveRatioConversion]
  - ✓ Convert to css dimensions
  - ▢ Add zoom function or cover
  - ✓ Convert from box positions to inputs elements
  - ✓ Build logic for convert poligon box to split by parameter [draw a box and split in a grid box]
  - ▢ Grouping poligons by colors [radio buttons group] [arcs grouping, set as initial parameter or select n poligons]
  - ▢ Add guides and ruled background
  - ✓ Add grid builder input spliter function
  - ▢ Add Text option and set to manual validation
  - ▢ Add notes tooltips in keyboard controls
  - ✓ ReLink control inputs

- Validator

  - ✓ Create a validator engine[ Map inputs id's with a unique answer table]
  - ▢ Create a validator manual or automatic switch or on,off option

- Api [Server](https://github.com/ambagasdowa/bms_connector.git) Development

  - ✓ Reorder Items method for release mysql work
  - ✓ Add singleton to [items module] logic for serve [one] OR [many-to-many] responses
  - ▢ Add server or local parameter to img-paths[bookpages:{}] responses

- App

  - ▢ Build as package for npm installation (webpack,...)
  - ▢ Build a configuration system with a config.ini file

- ✓ ~~FixIt~~ [Fixed]

  - Editor:

    1. When Reload the page with boxes from json , send data via POST retrieves (needs async logic) :

    ```bash
      XHRPOST
      https://baizabal.xyz:8000/srcpositions/38/7
      [HTTP/1.1 404 Not Found 519ms]
    ```

detail "Something Happend Try again "

| symbol | Description |
| ------ | ----------- |
| ✓      | done        |
| ◐      | Working on  |
| ▢      | TODO        |

# Database source

> [database](https://gitlab.com/ambagasdowa/sql/-/raw/master/mariadb/panamericano/bms.sql)

> [dataSample](https://gitlab.com/ambagasdowa/sql/-/raw/master/mariadb/panamericano/bms_bulk_data.sql)

> JsonResponseSample : samples/source.json

## Overall Progress

```bash
███████████████████░ 96%
```

### Sources

[Canvas Spec](https://html.spec.whatwg.org/multipage/canvas.html#the-canvas-element)

```math
SE = \frac{\sigma}{\sqrt{n}}
```

$`\sqrt{2}`$
