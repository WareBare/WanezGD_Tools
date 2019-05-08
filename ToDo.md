# ToDo

---

*Personal ToDo, trying out a different workflow, no reason for you to read this (curiosity killed the cat). This would be inside a private repo, but since this is open source, everyone can see it.*

---

# v0.1

## New Major Features

### Source Files

* [x] Extract Game files to UserData (only text_en.arc).
  * [x] Parse files and prepare for editing.
  * [x] Edit Parsed Data. (Using information from Library)
  * [x] Save Edited Data (Only those that have been changed).
* [ ] Translation support.

  * [ ] Change necessary files and save a new zip.

  * [ ] Change Name for selection in in-game options.

### Library

* [x] New System to manage "Custom Filters" and "Presets".
* [x] Sidebar using Library data.
  
  * [x] Reload Tag data (as this may change between filters)
  
* Presets:
  * [x] fullRainbow
  * [ ] basicHighlighting
* [x] Allow adding new Library Entry based on existing filter/preset.

### Add Items/Affixes

* [x] Data Storage overhaul.
* [x] End-User can add custom tags (MI, Affixes). This is the new way of determining colors in groups.

  * [x] Step 1: Enter Name (in language) into Filter field to narrow down the available selections
  * [x] Step 2: [Type]
  * [x] Step 2: [Classification]
  * [x] Step 4: [Group]

### Additional Customization

* [x] Custom Color-Groups.

  * [x] Drag & Drop to manage Type, Classification and Group.
  
* [ ] Group Symbols.

## UI

### Navigation

* [ ] Settings

  * General

    * [x] Path to Grim Dawn and check if exist.
    * [x] Language/Localization select.
    
  * Tag Manager
    * [x] New Items.
    * [x] Add Type to Item.
    * [x] Add Classification to Item.
    * [x] Add Group to Item.
  
* Filter Groups
    * [x] Group Selection
    * [x] Create / Update / Delete Group
    * [x] Edit Group Name/Default ColorCode
    * [x] Edit Group Data (Type, Classification, Group)
* [ ] Library
  * [x] New UI based on new "Grouping-System". (Keep the "Color Selection Boxes").

### Optional

* Visual Improvements!
  * [x] List/Select Box (improve visibility for Hover/Select)
  * [x] CheckBox/RadioButton (part 1) 
---

# v0.2

## UI

### Data Display
- [ ] Show tags with missing colors in Libraries.
- [ ] List all information in a nice overview.
### Optional
* Visual Improvements!

  * [ ] CheckBox/RadioButton (part 2)
  * [ ] All Buttons
  * - [ ] 

## Documentation

### ReadMe
- [ ] Soon

### Wiki
- [ ] Soon

### Forum
- [ ] Soon

## DevTools (speed up Database updates & data integrity checks)

- [ ] Merge Tag Info from AppData & UserData.
  - [ ] Check for duped entries and add them to all Libraries as Customizations. (more of a global feature which applies to program updates)