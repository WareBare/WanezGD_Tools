# ToDo

---

*Personal ToDo, trying out a different workflow, no reason for you to read this (curiosity killed the cat). This would be inside a private repo, but since this is open source, everyone can see it.*

---

# v0.2.3 - UI Improvements & Grim Dawn v1.1.3.0

*In the spirit of transparency:*
*I have added a Modules Pack I've been working on for my (private) modding tools, it mostly changes back-end. It helps clean up spaghetti code over the next versions and adds better integration of VSCode intellisense. I don't do this in one go, because I think it will avoid unexpected issues when I do it step by step.*

- [ ] ***added*** - native support for Grim Dawn v1.1.3.0 Items.
- ***added*** - information to close Grim Dawn if path could not be found. (this does not change how the tool works)
- ***removed*** - Settings-Button (gear icon in the top right), as it added no functionality and was a remainder from the old tools. The only settings of importance are accessible from the left-hand side menu.
- ***mixed*** - Various UI improvements.
  * includes <kbd>Tag-Adder</kbd> in <kbd>Settings</kbd>, no functionality changes - only UI and in-tool information.


# v0.2

## Features

- Group Symbols:
  * [ ] Add new Symbols.
  
  * [ ] Edit existing Symbols.
  
* Additional Tag Updater
  
  * [x] Being able to copy&paste a list of new items (instead of adding them one by one)
  
* [x] ChangeLog.
  * [x] Link security.
* [x] Zip creation for Text_EN.
* [x] Auto-Updater.
* [x] Open Directory in Explorer.

## UI

### Menus

* [x] Main Menu updated to work with "Enablers".

### Data Display
- [ ] List tags with missing colors in Libraries.
- [ ] List all information in a nice overview.
### Visual Improvements
* [x] CheckBox/RadioButton (part 2)
* All Buttons
  * [ ] Sidebar Buttons (performs action for content)
  * [ ] Sidebar List-Buttons (changes contentType)

## DevTools (speed up Database updates & data integrity checks)

- [ ] Merge Tag Info from AppData & UserData.
  - [ ] Check for duped entries and add them to all Libraries as Customizations. (more of a global feature which applies to program updates)

---

# v0.3
