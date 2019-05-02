# WanezGD_Tools (v0.1)

*Unofficial Filter Tool for Grim Dawn using Color Coding to quickly see useful stats for your current build*.

---

Discord Server: https://discord.gg/ru6eU2p

---

# What Is This?

A small program to add colors to item Nameplates on the ground and Tooltips. The program will extract and parse required game files to add colors at a later time.

# How To Use

* Go To "Settings" und "Filter" via the main Navigation on the left.
* Set the Path to your Grim Dawn Directory.
  * **If you are using a Translation**: Check "Use Localization" to make the Select Box appear and select your language. 
    * *Note:* The program will create a new .zip when you save the color changes, however, it will be larger in size, if this is a problem - you may uncheck "Zip Changes" and the resulting files will be created inside /Grim Dawn/localization/ where you can move them into a .zip of your choosing.
* You may now go to "Library" via the main Navigation on the left.
* Select the ColorCoding Preset from the list on the right (Full Rainbow or Basic Highlighting).
  * **ReadOnly** entries can be copied into a new Library entry, where you can change the colors. This is just to assure future changes to "Core" entries won't be affected by personal adjustments for Colors & Categorizations, this way you will always have an entry to go back to if an update made one of yours unusable (just in case).
* Click "Save".
* Start Grim Dawn (Restart if it was already running).
  * **Note About Translations**: You will have to change it manually to the new one, the same way you select any other translation.

# Updates
* The Program will let you know when there is a new Update for it available.

* If there is no Program update, but new MI or Affixes have been added to the game:

  1. Tell me, so I can know about it.
  1. Go into "Filter - Settings" and click on the "Manage Tags for Coloring" Button on the right.
  1. Enter the name (in your language) into the "Filter" field, only items with that name will show up.
  1. You can change its Type, Classification and Group by changing the value of the ComboBox/Drop Down.
  1. The new Tag will be part of a defined group and will get its color from it.

# Mod Support

* If requested, I can add full mod support.
* A similar process to the one for different Languages can be used for this, with a few adjustments:
  * Zip all tags and place them in /Grim Dawn/localization/
  * Inside the Program uncheck "Zip Changes".
  * After saving the colored version, copy create *.txt from /Grim Dawn/localization/ to /Grim Dawn/settings/text_en/
  * Keep in mind only added items will be changed, unless you have access to data from somebody else, you will have to add those items yourself.

# Customizations

## Coloring Groups

* You will have full access to groups, this may seem daunting at first, but it is as flexible as it gets.
* It is possible to make a group to assign certain Tags to you are looking for. You could remove colors for all other Tags and only keep them for your selected Tags.
* You may access this feature in "Settings" by selecting "Manage Coloring Groups" on the right.
* Quick Summary of what's going on:
  * **Select a group to Edit**: you may change this group's Key, create a copy based on the selected group or delete it.
  * ReadOnly groups are just that - ReadOnly - you may only create a copy of it.
  * The key **must be unique** as it is used to connect tag Settings with the group to get the color.
  * Once you enter "Edit Mode" by selecting a non-ReadOnly group, you will see a few new fields show up
    * Display Name: The name you will see in your Library when you change a group's color.
    * Default ColorCode: The default ColorCode, can be changed on a per Library Entry basis.
    * Pairs of List-Boxes with unassigned & assigned categorization.
      * You are able to move them from one box to the other.
      * Assigned will change the color of matching Tags' settings


# License and Credits

* the Program is using Electron (Node.js + Chromium)
  * modules used are under the MIT License
* the following files have not been written by me, information can be found inside the files
  * app/lib/moment.js
  * app/lib/tga.js
