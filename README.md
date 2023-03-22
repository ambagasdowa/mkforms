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
    top: 2
    bottom: 0
  padding:
    top: 1
    bottom: 1
---

# MKFORMS

Html Forms Maker

# Collaborate to this repo

- clone repo git clone repo
- create a new branch git checkout -b newFeature
- send a pull request

# Todo

## Admin Section

- Admininstrator
  - ◐ Draw BookPage directly to canvas object against draw img as div background
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
    1. ▢ Add Text[Correct Answer]
    1. ▢ ~~Add color option~~[optional]
    1. ▢ Add Attributes [placeholder,data1.x, etc]
  * ▢ Import an Answer module [Optional]
  * ▢ ~~Add a colorpicker~~[optional]
  * ▢ ~~Add a datepicker~~[optional]
  * ▢ Group checkboxes and options in control ribbon[initial set of boxes : n options -> create || select checkboxes and set a group]
  * ✓ Build the control panel ribbon
- View
  - ◐ Evaluator module : set a visual and textual[report] check for rigth answer
  - Internal
    1. ▢ Build an option for get the images from local or server source
    1. ✓ DragBar that's containt the control panel
  - UIX:
    1. ✓ Save Method by user
- Canvas
  - ✓ Build Canvas Engine initial
  - ✓ Build events module and drawer[mouse events and draw in canvas the inputs and checkboxes items]
  - ✓ link to a database and build the mechanism to get() and post() data of items
  - ▢ Set perspective engine for display in multiple dimensions windows[dpr,perspectiveRatioConversion]
  - ◐ Convert to css dimensions
  - ✓ Convert from box positions to inputs elements
  - ▢ Build logic for convert poligon box to split by parameter [draw a box and split in a grid box]
  - ▢ Grouping poligons [arcs grouping, set as initial parameter or select n poligons]
- Validator

  - ▢ Create a validator engine[ Map inputs id's with a unique answer table]

- Api [Server](https://github.com/ambagasdowa/bms_connector.git) Development

  - ✓ Reorder Items method for release mysql work
  - ✓ Add singleton to [items module] logic for serve [one] OR [many-to-many] responses
  - ▢ Add server or local parameter to img-paths[bookpages:{}] responses

- App

  - ▢ Build as package for npm installation (webpack,...)
  - ▢ Build a configuration system with a config.ini file

- FixIt

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

![Progress](https://progress-bar.dev/74/?title=completed)

![Progress](https://geps.dev/progress/32?dangerColor=800000&warningColor=ff9900&successColor=006600)
