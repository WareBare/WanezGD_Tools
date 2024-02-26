# ToDo

---

*Personal ToDo, no reason for you to read this (curiosity killed the cat). This would be inside a private repo, but since this is open source, everyone can see it.*

---



# v0.5.6 - Update for Grim Dawn v1.2.0.0

* ***New:*** Added native support for Grim Dawn v1.2.0.0 items.
* ***BugFix:*** French Localization was causing issues when using and coloring Mastery Names. (Oathkeeper is still a ? due to the file not using UTF-8)
* ***BugFix:*** Czech Localization Prefix Capitalization and '|9' issues. (~90% fixed)

# v0.5.8 - Update for Grim Dawn v1.2.0.3 (Hotfix 3)

* ***Updated:*** Internal texts updated to the latest Hotfix.
* ***BugFix:***  Polish and Czech prefix Capitalization.

# v0.5.7 - Fixes

* [ ] ***BugFix:*** Special Highlighting was not allowing deletion of groups when using apostrophes (') in names.
* [ ] ***BugFix:*** Library was not loading in some cases. (ToDo: loading non-existing Library entry - set fullRainbow to default to prevent the error)
* [ ] ***BugFix:*** A missing group was causing a Library Entry to become impossible to load. (ToDo e.g. Skill missing/deleted custom group)

# v0.5.0 - GD Launch Options & Predictive Set-Up

- ***New:*** Functionality added for more Grim Dawn launching options. ([Thanks for the information powbam](https://forums.crateentertainment.com/t/tool-rainbow-filter-item-highlighting/42765/424))
  * You will no longer get a pop-up when using the 64-bit launch option.
  * It is now possible to set which Grim Dawn Expansion to load. (you will only see the ones installed)
  * It is now possible to force DirectX9.
- ***New:*** A new button was added that will allow Rainbow Tool to predict and set certain options.
  * Steam & Grim Dawn paths.
  * Whether you are using 32-bit or 64-bit (based on the location of your installations)
  * Whether you are using a different language (this will enable Localization when you have one downloaded)
  * Sets selector to latest installed Grim Dawn Expansion.
- ***New:*** Various improvements to Localization support.
  * Simplified first time set-up due to the new prediction button. (this will set the first found zip as your selected localization)
  * If an error has occurred because of a missing Localization, the tool will now fetch a new one or disable Localization if no language could be found.
  * Various new texts to help understand what is going on.
- ***Updated:*** An empty path for `Grim Dawn Directory` would say it is wrong, it now tells you to enter a path or to use the new prediction button.
- ***Updated:*** App Icon - still the product of less than 5min in Krita, but an upgrade to the abomination from before.
- ***BugFix:*** Rainbow Tool was not being minimized to tray when Grim Dawn was launched.



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

## Files and Program updated for Grim Dawn v1.2.0.3

Program updates itself, keep in mind colors need to be saved manually after it has finished updating.

You can find all downloads in the [First Post](https://forums.crateentertainment.com/t/tool-rainbow-filter-item-highlighting/42765) or on [GitHub](https://github.com/WareBare/WanezGD_Tools/releases/tag/v0.5.8).

<details>
<summary><kbd>v0.5.8 - Update for Grim Dawn v1.2.0.3 (Hotfix 3)</kbd></summary>

<hr>

* ***Updated:*** Internal texts updated to the latest Hotfix.
* ***BugFix:***  Polish and Czech prefix Capitalization.
<hr>
</details>

***Note:*** Change Log can also be found on GitHub and inside the program.



## Program updated for Grim Dawn v1.2.0.0 Localizations

Program updates itself, keep in mind colors need to be saved manually after it has finished updating.

You can find all downloads in the [First Post](https://forums.crateentertainment.com/t/tool-rainbow-filter-item-highlighting/42765) or on [GitHub](https://github.com/WareBare/WanezGD_Tools/releases/tag/v0.5.7).

If you wish not to use the program or it is not working for you, you may get all the required files for the Full Rainbow variant and extract the files yourself. This Zip contains all languages (including English) be sure you end up with all text_XX folders inside your ```Grim Dawn/settings/``` directory. [Download Full Rainbow for Grim Dawn v1.2.0.0 - All Languages](https://github.com/WareBare/WanezGD_Tools/releases/download/v0.5.7/fullRainbow-1.2.0.0_allLanguages.zip)

***Note:*** Change Log can be found on GitHub and inside the program.
***Note:*** As I am a little on a time crunch here, certain texts in the OP and Program may be misleading, I'll get to it eventually.





## Files and Tool updated with Grim Dawn v1.1.7.2

Tool updates itself, keep in mind colors need to be saved manually after it has finished updating.

You can find all downloads in the [First Post](https://forums.crateentertainment.com/t/tool-rainbow-filter-item-highlighting/42765) or on [GitHub](https://github.com/WareBare/WanezGD_Tools/releases/tag/v0.5.3).

<details>
    <summary><btn>Show Change Log</btn> Hotfix</summary>
</details>

***Note:*** Change log can also be found on GitHub and inside the tool.








## Rainbow Tool updated to v0.5.0

*Tool updates itself, if you don't have the tool yet, you can find the link in the [First Post](https://forums.crateentertainment.com/t/tool-rainbow-filter-item-highlighting/42765) or on [GitHub](https://github.com/WareBare/WanezGD_Tools/releases).*

<details>
    <summary><btn>Show Change Log</btn> v0.5.0 - GD Launch Options & Predictive Set-Up</summary>
</details>

***Note:*** Change log can also be found on GitHub and inside the tool.

*No text changes with Grim Dawn 1.1.6.1 that require an update to the files.*



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

*Second and last preview for v0.4.0. I plan on uploading the new version over the weekend.*

## Mastery Marker

As mentioned in a previous post, I'm currently working on new Rainbow Tool features and as such adding a Mastery text after the skill name as [requested some time ago](https://forums.crateentertainment.com/t/tool-rainbow-filter-item-highlighting/42765/299). The uploaded preset files won't have these texts added, because I don't intend to force it on anyone who doesn't want it.

You can find the new section <kbd>Mastery Marker</kbd> on the left hand side navigation and make all the wanted changes from there. The possible options currently are the Mastery Name after the Skill Name and the usual colors. It is possible to use both, one of the two or neither. This is a global setting, which means the program will save your selections alongside any selected Filter. Global availability also means `Special Highlighting` will affect Skill Texts and they'll take priority over colors set inside the `Mastery Marker`.

**Note:** Coloring only affects your active Masteries, the game overrides inactive Masteries in grey.

[details="Screenshot"]
![Tools_040_RainbowScreenshot-MasteryMarker_01|438x500](upload://kXf4HePpHwEAWTWAe9euTOYlaVm.jpeg) 
[/details]

---
## Versioning

A Version number for `Rainbow Tool` and the targeted `Grim Dawn release` will be shown on the ToolTip for the button opening the in-game Filter Window. This should make it easier to keep track of the currently active version and allow everyone to check if their update worked as planned.

[details="Screenshot"]
![Tools_040_RainbowScreenshot-Versioning_01|459x263](upload://kbNfjUktSUQqVbltVpLgBRCuiD8.jpeg) 
[/details]

---
## Program Overhaul

`Wanez Tools` got a new look, the default window frame is part of the past and it will now be minimized to System Tray as  many other programs do when using the close button inside the app. However, there is a difference to most apps out there. The different ways to close a program in windows are still viable, which means you can quickly close Rainbow Tool with Alt+F4 if you don't want to click on `Quit` inside the Tray Menu.

If you're wondering why you would want the program to continue running after creating your filter... . Well, things might change with some new features in the future or have already changed with the addition of `Special Highlighting`. You will also be able to start the game with v0.4.0. Starting the game is also possible through the Tray Menu.

***Note:*** Starting the game will try doing so with Grim Internals first, if no Grim Internals was possible to run, it then starts the regular game. *(Let me know of any issues)*





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
