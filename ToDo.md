# ToDo

---

*Personal ToDo, trying out a different workflow, no reason for you to read this (curiosity killed the cat). This would be inside a private repo, but since this is open source, everyone can see it.*

---

# v0.4.0 - Improved Visuals

- ***New Feature:*** Special Highlighting
  * Improve visibility of Items & Affixes with the new feature by using a new color or symbol.
  * Post for more information can be found on the [official Grim Dawn Forums](https://forums.crateentertainment.com/t/tool-rainbow-filter-item-highlighting/42765/354).
- ***New Feature:*** Mastery Marker ([as result of a request](https://forums.crateentertainment.com/t/tool-rainbow-filter-item-highlighting/42765/299))
  * Adds Mastery Name after their respective Skill Names on items.
  * Also allows coloring and support of Special Highlighting for Skill Names.
- ***New Preset:*** Added a new `Clean Preset` for those that only want to highlight their "Special Items & Affixes".
- ***BugFix:*** Items from 1.1.5.0 will show up according to information on GrimTools.



# v0.3.4 - Grim Dawn v1.1.5.0

- ***New:*** Added native support for Grim Dawn v1.1.5.0 Items.

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





# Forum Reply

## Files and Tool updated for Grim Dawn v1.1.5.2

Tool updates itself, keep in mind colors need to be changed manually after it has finished updating.

You can find all downloads in the [First Post](https://forums.crateentertainment.com/t/tool-rainbow-filter-item-highlighting/42765) or on [GitHub](https://github.com/WareBare/WanezGD_Tools/releases/tag/v0.3.4).

# New Feature "Special Highlighting" (Post)

## New Tool Feature

I've had an itch to finish up on a few ideas, so the next Rainbow Tool update (v0.4.0) will come with new features. The exact number will come down to when the next Grim Dawn update hits us. For this first feature, the goal was to give users a quick & easy way to highlight certain tags, you could already achieve similar things in various ways, but it was complicated and I'm not sure anybody even used it, so let's dive into it:

Those of you using the tool will be able to use a new feature to highlight important items or affixes even further. <kbd>Special Highlighting</kbd> is a new section accessible through the left hand side navigation and will take you to this new feature's settings page. Create a new `Group` and give it a `Symbol` and `Color` (either are optional). Use the Search to find an Item or Affix by name and set its `Group` to one of your created groups. Next time you <kbd>Save Colors</kbd>, those changes will be applied and ready for play (remember to close Grim Dawn before doing this).

The full range of this powerful new feature is available on the initially loaded overview page, however, you may select one of the subcategories on the right hand side to narrow it down and keep your workspace nice and clean. The Filter functionality will search for item and affix names in any of the subcategories, make sure to clear the field if you want to see all your selected Items & Affixes again.

In the future you will see all information you can hope for with complete language support. The plan was initially to start with an Item Database, but I decided searching for items on GT is perfectly fine to get started or browse through items on GT and search for the name in the Rainbow Tool. Having all the information within the tool is a nice QoL, but not really a requirement.

**Note:** Removing a Group by clearing its name field will remove all items assigned to that group. You could create a Group for the most recent Update or your current build and assign to it all Items & Affixes you're interested in, once you don't care about them anymore you can just delete the group.

**Note:** You may create as many groups with as many Items & Affixes assigned as you like.

## Some Screenshots

[details=Inside the Rainbow Tool]
![Tools_040_RainbowPreview-SpecialHighlighting|690x377](upload://ew0y88LqIwEZ2jBQYEBr2kEe9km.png)
[/details]

---
[details=Fellblade (Build X)]
![Tools_040_RainbowScreenshot-SpecialHighlighting_01|270x187](upload://biwiRwmaY41rm5WxqudDouTgGQL.jpeg) 
[/details]

---
[details=Magi Visage (Important MI)]
![Tools_040_RainbowScreenshot-SpecialHighlighting_02|485x360](upload://dLqYvkYeTMNbup7O3WCQoXTeyjI.jpeg)

**Note:** The color of the asterisk (*) is using the red color placed infront of it in the Symbol Input field. This is entirely optional, but demonstrates what would be possible with Symbols.
[/details]

---
[details=Hallanx's Head (Newly Added)]
 ![Tools_040_RainbowScreenshot-SpecialHighlighting_03|382x500](upload://qmDU9b3P0LNB121EkR4jleJfWbI.jpeg)
[/details]

---



# New Feature "Mastery Marker" & "Versioning" (Post)

## Mastery Marker

As mentioned in a previous post I'm working on new Rainbow Tool features and as such adding a Mastery text after the skill name as [requested some time ago](https://forums.crateentertainment.com/t/tool-rainbow-filter-item-highlighting/42765/299). The uploaded preset files won't have these texts added, because I don't intend to force it on anyone who doesn't want it.

You can find the new section <kbd>Mastery Marker</kbd> on the left hand side navigation and make all the wanted changes from there. The possible options currently are the Mastery Name after the Skill Name and the usual colors. It is possible to use both, one of the two or neither. This is a global setting, which means the program will save your selections alongside any selected Filter. Global availability also means `Special Highlighting` will affect Skill Texts and they take priority over colors set inside the `Mastery Marker`.

**Note:** Coloring only affects your active Masteries, the game overrides inactive Masteries in grey.

[ScreenShots]

## Versioning

A Version number for `Rainbow Tool` and the targeted `Grim Dawn release` will be shown on the ToolTip for the button opening the in-game Filter Window. This should make it easier to keep track of the currently active version and allow everyone to check if their update worked as planned.

[ScreenShots]







# Forum Post

[details="Tool has been updated to v0.3.0"]

[/details]

---

# v0.x.0

* ***ItemDB:*** Core Implementation.
* ***Filter:*** Important Item/Affix Highlighting.
* ***Filter:*** Display Mastery for skills.

---

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
