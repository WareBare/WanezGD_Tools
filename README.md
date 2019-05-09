# WanezGD_Tools (v0.1)

*Unofficial Filter Tool for Grim Dawn using Color Coding to quickly see useful stats for your current build*.

---

Discord Server: https://discord.gg/ru6eU2p

---

# What Is This?

A small program to add colors to item Nameplates on the ground and Tooltips. The program will extract and parse required game files to add colors at a later time. This is a non-destructive way of changing the way items are shown in the game and can be removed at any time.

# How To Use

* Download the Setup.exe on the Releases page, it may trigger some anti-virus software due to the fact it is an unsigned app and anti-virus software is suspicious of those.
* Go To "Settings" under "Filter" via the main Navigation on the left.
* Set the Path to your Grim Dawn Directory.
  * **If you are using a Translation**: Check "Use Localization" to make the Select Box appear and select your language. 
    * *Note:* The program will create a new .zip when you save the color changes, however, it will be larger in size, if this is a problem - you may uncheck "Zip Changes" and the resulting files will be created inside /Grim Dawn/localization/ where you can move them into a .zip of your choosing.
* You may now go to "Library" via the main Navigation on the left.
* Select the ColorCoding Preset from the list on the right (Full Rainbow or Basic Highlighting).
  * **ReadOnly** entries can be copied into a new Library entry, where you can change the colors. This is just to assure future changes to "Core" entries won't be affected by personal adjustments for Colors & Categorizations, this way you will always have an entry to go back to if an update made one of yours unusable (just in case).
* Click "Save Colors".
* Start Grim Dawn (Restart if it was already running).
  * **Note About Translations**: You will have to change it manually to the new one, the same way you select any other translation.

# Updates
* The Program will let you know when there is a new Update for it available.

* If there is no Program update, but new MI or Affixes have been added to the game:

  1. Tell me, so I can know about it.
  1. Go into "Filter - Settings" and click on the "Manage Tags for Coloring" Button on the right.
  1. Enter the name (in your language) into the "Filter" field, so only items with that name will show up.
  1. You can change its Keywords (Type, Classification and Group) by changing the value of the ComboBox/Drop Down.
  1. The new Tag will be part of a defined group and will get its color from it.

# Mod Support

* If requested, I can add full mod support.
* A similar process to the one for different Languages can be used for this, with a few adjustments:
  * Zip all tags and place them in /Grim Dawn/localization/
  * Inside the Program uncheck "Zip Changes".
  * After saving the colored version, copy created *.txt from /Grim Dawn/localization/ to /Grim Dawn/settings/text_en/
  * Keep in mind only added items will be changed, unless you have access to data from somebody else, you will have to add those items yourself.

# Customizations

Short info on how the program creates the colors:

* A Tag is the key to access the text output you see ingame.
* Tags have up to 3 different Keywords (Type, Classification, Group).
  * **Type** is the most important one, without it a Tag won't be able to have a color and will be ignored by the program. It is usually used to determine what kind of tag it is (MI, regular item or affix).
  * **Classification** usually describes the Rarity of an item/affix.
  * **Group** is mostly used to specify set items.
* Coloring-Groups check if a tag has matching Keywords to be part of the group and if it has, the tag will get a ColorCode assigned.
* Inside the Library you can change the ColorCode for Coloring-Groups.
  * **Note:** Coloring-Groups higher in the hierarchy will be checked first, so if a tag would match a Coloring-Group at slot 2 and 5 it will use the ColorCode from slot 2. You can change the order of Groups and most of the time they will have a unique match anyway.

## Coloring Groups (optional feature)

*Everything is based on them, libraries are using groups to determine the colors for each Tag. Instead of adding each Tag to a particular group they have Keywords which determine to which group they belong.*

* You will have full access to groups, this may seem daunting at first, but it is as flexible as it gets.
  * Groups could be used to make a certain tags use a color.
    * You are looking for a certain Affix, simply make a group for it and change which group that affix should go to.
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
