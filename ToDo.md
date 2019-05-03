# ToDo

---

*Personal ToDo, trying out a different workflow, no reason for you to read this (curiosity killed the cat). This would be inside a private repo, but since this is open source, everyone can see it.*

---

# v0.1

## New Major Features

### Source Files

* [x] Extract Game files to UserData (only text_en.arc).
  * [x] Parse files and prepare for editing.
  * [ ] Edit Parsed Data. (Using information from Library)
  * [ ] Save Edited Data (Only those that have been changed).
* [ ] Translation support.

  * [ ] Change necessary files and save a new zip.

  * [ ] Change Name for selection in in-game options.

### Library

* [ ] New System to manage "Custom Filters" and "Presets".
* [ ] Sidebar using Library data.
  
  * [ ] Reload Tag data (as this may change between filters)
  
* Presets:
  * [ ] fullRainbow
  * [ ] basicHighlighting
* [ ] add new Filter based on existing filter/preset.

### Add Items/Affixes

* [x] Data Storage overhaul.
* [ ] End-User can add custom tags (MI, Affixes). This is the new way of determining colors in groups.

  * [ ] Step 1: Enter Name (in language) into Filter field to narrow down the available selections
  * [ ] Step 2: [Type] drag it into the MI or Affix List
  * [ ] Step 2: [Classification] Filter still applies, move it into the correct Box
  * [ ] Step 4: [Group] Filter still applies, move it into the correct Box

### Additional Customization

* [ ] Custom Color-Groups.

  * [ ] Drag & Drop to manage Type, Classification and Group.

## UI

### Navigation

* [ ] Settings

  * General

    * [x] Path to Grim Dawn and check if exist.
    * [x] Language/Localization select.
    * [ ] Library Management.
    
  * Tag Manager
    * [ ] New Items.
    * [ ] Add Item to Type (Prediction based on Tag Name).
    * [ ] Add Item to Classification (Prediction based on Tag Name & Type).
    * [ ] Add Item to Group (Prediction based on Tag Name & Classification).

  * Filter Groups
    * [x] Group Selection
    * [x] Create / Update / Delete Group
    * [x] Edit Group Name/Default ColorCode [UI]
      * [ ] Save Changes
    * [x] Edit Group Data (Type, Classification, Group) [UI]
      * [ ] Save Changes
* [ ] Library
  * [ ] New UI based on new "Grouping-System". (Keep the "Color Selection Boxes").

### Data Display
* [ ] List all information in a nice overview.

### Optional

* Visual Improvements!
  * [ ] List/Select Box (improve visibility for Hover/Select)
  * [ ] CheckBox/RadioButton (part 1) 
  * [ ] CheckBox/RadioButton (part 2) 
  * [ ] All Buttons
## Documentation

### ReadMe

* [ ] Soon

### Wiki

* [ ] Soon

### Forum

* [ ] Soon

## DevTools (speed up Database updates & data integrity checks)
* [ ] Merge Tag Info from AppData & UserData.
  * [ ] Check for duped entries and add them to all Libraries as Customizations. (more of a global feature which applies to program updates)

---

# v0.2

*SOON*