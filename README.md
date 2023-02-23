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
    column_spacing: 15
  margin:
    top: 3
    bottom: 0
  padding:
    top: 3
    bottom: 3
---

# mkforms

Html Forms Maker

# Collaborate to this repo

- clone repo git clone repo
- create a new branch git checkout -b newFeature
- send a pull request

# Todo

## Admin Section

- Admininstrator
  - [-] Draw BookPage directly to canvas object against draw img as div background
  - [x] Add grid builder Option->Canvas : draw poligon and split in multiple poligons inside take a int as parameter [crucigramas , sopa de letras ...]
  - Draw properties window over a poligon for add options to box
    - [x] Add positions of the item
    - [x] send dpr and coeficent of dimension display for each item box[poligon]
    - [x] Detect when the mouse is over a poligon
    - [x] Delete poligon
    - [x] Clone poligon
    - [x] Clean canvas
    - [x] Set a page turn compatible for the admin module
    - [x] Build a reload method of canvas and get() data if exists for change to a new page
    - [ ] Add Text[Correct Answer]
    - [ ] ~~Add color option~~[optional]
    - [ ] Add Attributes [placeholder,data-x, etc]
  - [ ] Import an Answer module [Optional]
  - [ ] ~~Add a colorpicker~~[optional]
  - [ ] ~~Add a datepicker~~[optional]
  - [ ] Group checkboxes and options in control ribbon[initial set of boxes : n options -> create || select checkboxes and set a group]
  - [x] Build the control panel ribbon
- View
  - [ ] Evaluator module : set a visual and textual[report] check for rigth answer
  - Internal
    - [ ] Build an option for get the images from local or server source
    - [x] DragBar that's containt the control panel
- Canvas
  - [x] Build Canvas Engine initial
  - [x] Build events module and drawer[mouse events and draw in canvas the inputs and checkboxes items]
  - [x] link to a database and build the mechanism to get() and post() data of items
  - [-] Set perspective engine for display in multiple dimensions windows[dpr,perspectiveRatioConversion]
  - [ ] Convert to css dimensions
  - [ ] Build logic for convert poligon box to split by parameter [draw a box and split in a grid box]
  - [ ] Grouping poligons [arcs grouping, set as initial parameter or select n poligons]
- Validator

  - [ ] Create a validator engine[ Map inputs id's with a unique answer table]

- Api [Server](https://github.com/ambagasdowa/bms_connector.git) Development

  - [-] Reorder Items method for release mysql work
  - [-] Add singleton to [items module] logic for serve [one] OR [many-to-many] responses
  - [ ] Add server or local parameter to img-paths[bookpages:{}] responses

> - [x] : done
> - [~] : Working on
> - [ ] : TODO

# Database source

> [database](https://gitlab.com/ambagasdowa/sql/-/raw/master/mariadb/panamericano/bms.sql)
