# ToDo

---

*Personal ToDo, trying out a different workflow, no reason for you to read this (curiosity killed the cat). This would be inside a private repo, but since this is open source, everyone can see it.*

---

# v0.3.0 - Deletion, UI & Grim Dawn v1.1.3.0

- ***New:***  Added native support for Grim Dawn v1.1.3.0 Items.
  * New sets are being recognized as such.
- ***New:*** Deletion of ColorCoding files.
  * This is useful if you do not want to use ColorCoding or when you save a different color preset. (not every preset will use the same files, so overwriting them won't be enough to remove certain color changes)
  * A new button was added to <kbd>Settings</kbd> that will delete ColorCoding files for non-localization.
  * A new checkbox was added (<kbd>Auto-Delete Old Files</kbd>) to <kbd>Settings</kbd>, this will delete old ColorCoding files automatically when you use <kbd>Save Colors</kbd>. (disabled by default)
- ***New:*** Added information to close Grim Dawn if path could not be found. (this does not change how the tool works)
- ***New:*** <kbd>Library</kbd> now remembers your last used Color Preset.
- ***Removed:*** Removed Settings-Button (gear icon in the top right), as it added no functionality and was a remainder from the old tools. The only settings of importance are accessible from the left-hand side menu.
- ***Improvement:*** Various UI & information text improvements.
  * <kbd>Tag-Adder</kbd> in <kbd>Settings</kbd>, no functionality changes - only UI and in-tool information.
  * <kbd>Library</kbd> updated in the same way.
- ***Bug Fix:*** Fixed an issue with optional User Data Path, where the path required `/Settings` at the end. If it worked for you, nothing you need to change, the tool will check if `/Settings` is at the end of the path and add it if not.



# Diablo Preset

*Note: Sets don't have the prefixed (S) Symbol, they have a different color.*

* <span style="background-color:#0F0F0F"><font color="#FFFFFF">Common</font></span>
* <span style="background-color:#0F0F0F"><font color="#39ABCF">Magic</font></span>
* <span style="background-color:#0F0F0F"><font color="#FFF62C">Rare</font></span> | <span style="background-color:#0F0F0F"><font color="#92CC00">MI - Rare</font></span>
* <span style="background-color:#0F0F0F"><font color="#5A039A">Epic</font></span> | <span style="background-color:#0F0F0F"><font color="#FF69B5">MI - Epic</font></span>
* <span style="background-color:#0F0F0F"><font color="#F3A44D">Legendary</font></span> | <span style="background-color:#0F0F0F"><font color="#FF4200">MI - Legendary</font></span>
* <span style="background-color:#0F0F0F"><font color="#10EB5D">Set (Epic/Legendary)</font></span> | <span style="background-color:#0F0F0F"><font color="#38592E">MI - Set (Epic/Legendary)</font></span>

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
